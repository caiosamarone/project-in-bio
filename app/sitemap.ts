import { MetadataRoute } from 'next'
import { socialMedias } from './server/get-texts-by-slug'

export default function siteMap(): MetadataRoute.Sitemap {
  const socialMediaEntries: MetadataRoute.Sitemap = socialMedias.map(
    (socialMediaUrl) => ({
      url: `https://https://project-in-bio-5ue6.vercel.app/recursos/link-na-bio-para-${socialMediaUrl}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.5,
    })
  )

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: 'https://project-in-bio-5ue6.vercel.app',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]

  return [...staticEntries, ...socialMediaEntries]
}
