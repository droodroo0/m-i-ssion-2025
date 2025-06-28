import Head from 'next/head'

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'product'
  canonicalUrl: string
  noIndex?: boolean
  structuredData?: object
  additionalMeta?: Array<{
    name?: string
    property?: string
    content: string
  }>
}

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage = 'https://m-i-ssion.com/og-default.jpg',
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
  structuredData,
  additionalMeta = []
}: SEOHeadProps) {
  const fullTitle = title.includes('M-I-SSION') ? title : `${title} - M-I-SSION`
  const robotsContent = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'

  return (
    <Head>
      {/* Titre et description de base */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Métadonnées de base */}
      <meta name="robots" content={robotsContent} />
      <meta name="author" content="M-I-SSION" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="fr" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="M-I-SSION" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Liens canoniques et favicons */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Préconnexions pour les performances */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      
      {/* Métadonnées additionnelles */}
      {additionalMeta.map((meta, index) => (
        <meta
          key={index}
          {...(meta.name ? { name: meta.name } : { property: meta.property })}
          content={meta.content}
        />
      ))}
      
      {/* Données structurées */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Données structurées par défaut - Organisation */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "M-I-SSION",
            "url": "https://m-i-ssion.com",
            "logo": "https://m-i-ssion.com/logo.png",
            "description": "Spécialiste de la transformation digitale avec IA et automatisation",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR"
            },
            "sameAs": [
              "https://linkedin.com/company/m-i-ssion"
            ]
          })
        }}
      />
    </Head>
  )
}

// Composant spécialisé pour les articles/blog
export function ArticleSEOHead({
  title,
  description,
  canonicalUrl,
  publishedTime,
  modifiedTime,
  author = 'M-I-SSION',
  tags = [],
  ogImage
}: {
  title: string
  description: string
  canonicalUrl: string
  publishedTime: string
  modifiedTime?: string
  author?: string
  tags?: string[]
  ogImage?: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": canonicalUrl,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "M-I-SSION",
      "logo": {
        "@type": "ImageObject",
        "url": "https://m-i-ssion.com/logo.png"
      }
    },
    "keywords": tags.join(', ')
  }

  const additionalMeta = [
    { property: 'article:published_time', content: publishedTime },
    { property: 'article:author', content: author },
    ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),
    ...tags.map(tag => ({ property: 'article:tag', content: tag }))
  ]

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={tags.join(', ')}
      ogType="article"
      canonicalUrl={canonicalUrl}
      ogImage={ogImage}
      structuredData={structuredData}
      additionalMeta={additionalMeta}
    />
  )
}