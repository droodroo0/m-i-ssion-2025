export default function handler(req, res) {
  const robots = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Disallow: /api/
Disallow: /_next/
Disallow: /admin

Sitemap: https://m-i-ssion.com/sitemap.xml`

  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400')
  res.status(200).send(robots)
}