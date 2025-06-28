import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CookieBanner } from '../components/CookieBanner'
import { CookieManager } from '../lib/cookieManager'

// Mock CookieManager
jest.mock('../lib/cookieManager')
const mockCookieManager = CookieManager as jest.Mocked<typeof CookieManager>

// Mock analytics
jest.mock('../lib/analytics', () => ({
  updateConsentMode: jest.fn()
}))

describe('CookieBanner', () => {
  const mockInstance = {
    shouldRequestConsent: jest.fn(),
    acceptAll: jest.fn(),
    rejectAll: jest.fn(),
    addConsentListener: jest.fn(),
    removeConsentListener: jest.fn()
  }

  beforeEach(() => {
    mockCookieManager.getInstance.mockReturnValue(mockInstance as any)
    mockInstance.shouldRequestConsent.mockReturnValue(true)
    jest.clearAllMocks()
  })

  it('should render when consent is needed', () => {
    render(<CookieBanner />)
    
    expect(screen.getByText(/nous utilisons des cookies/i)).toBeInTheDocument()
    expect(screen.getByText('Accepter tout')).toBeInTheDocument()
    expect(screen.getByText('Refuser tout')).toBeInTheDocument()
    expect(screen.getByText('Personnaliser')).toBeInTheDocument()
  })

  it('should not render when consent is not needed', () => {
    mockInstance.shouldRequestConsent.mockReturnValue(false)
    
    render(<CookieBanner />)
    
    expect(screen.queryByText(/nous utilisons des cookies/i)).not.toBeInTheDocument()
  })

  it('should call acceptAll when Accept button is clicked', async () => {
    render(<CookieBanner />)
    
    const acceptButton = screen.getByText('Accepter tout')
    fireEvent.click(acceptButton)
    
    await waitFor(() => {
      expect(mockInstance.acceptAll).toHaveBeenCalledTimes(1)
    })
  })

  it('should call rejectAll when Reject button is clicked', async () => {
    render(<CookieBanner />)
    
    const rejectButton = screen.getByText('Refuser tout')
    fireEvent.click(rejectButton)
    
    await waitFor(() => {
      expect(mockInstance.rejectAll).toHaveBeenCalledTimes(1)
    })
  })

  it('should show preferences when Customize button is clicked', () => {
    render(<CookieBanner />)
    
    const customizeButton = screen.getByText('Personnaliser')
    fireEvent.click(customizeButton)
    
    expect(screen.getByText('Préférences des cookies')).toBeInTheDocument()
  })

  it('should hide banner after accepting', async () => {
    render(<CookieBanner />)
    
    const acceptButton = screen.getByText('Accepter tout')
    fireEvent.click(acceptButton)
    
    await waitFor(() => {
      expect(screen.queryByText(/nous utilisons des cookies/i)).not.toBeInTheDocument()
    })
  })

  it('should hide banner after rejecting', async () => {
    render(<CookieBanner />)
    
    const rejectButton = screen.getByText('Refuser tout')
    fireEvent.click(rejectButton)
    
    await waitFor(() => {
      expect(screen.queryByText(/nous utilisons des cookies/i)).not.toBeInTheDocument()
    })
  })

  it('should listen for openCookiePreferences event', () => {
    render(<CookieBanner />)
    
    // Simulate the custom event
    const event = new CustomEvent('openCookiePreferences')
    window.dispatchEvent(event)
    
    expect(screen.getByText('Préférences des cookies')).toBeInTheDocument()
  })

  it('should have proper accessibility attributes', () => {
    render(<CookieBanner />)
    
    const banner = screen.getByRole('banner')
    expect(banner).toHaveAttribute('aria-label', 'Bannière de consentement aux cookies')
    
    const acceptButton = screen.getByText('Accepter tout')
    expect(acceptButton).toHaveAttribute('type', 'button')
    
    const rejectButton = screen.getByText('Refuser tout')
    expect(rejectButton).toHaveAttribute('type', 'button')
  })

  it('should handle keyboard navigation', () => {
    render(<CookieBanner />)
    
    const acceptButton = screen.getByText('Accepter tout')
    const rejectButton = screen.getByText('Refuser tout')
    const customizeButton = screen.getByText('Personnaliser')
    
    // Test tab order
    acceptButton.focus()
    expect(document.activeElement).toBe(acceptButton)
    
    fireEvent.keyDown(acceptButton, { key: 'Tab' })
    // Note: Actual tab navigation would require more complex setup
    
    // Test Enter key activation
    fireEvent.keyDown(acceptButton, { key: 'Enter' })
    expect(mockInstance.acceptAll).toHaveBeenCalled()
  })

  it('should cleanup event listeners on unmount', () => {
    const { unmount } = render(<CookieBanner />)
    
    expect(mockInstance.addConsentListener).toHaveBeenCalled()
    
    unmount()
    
    expect(mockInstance.removeConsentListener).toHaveBeenCalled()
  })
})