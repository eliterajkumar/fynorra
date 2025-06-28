import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/_next/',
        '/sign-in',
        '/sign-up',
      ],
    },
    sitemap: 'https://www.fynorra.com/sitemap.xml',
  }
} 