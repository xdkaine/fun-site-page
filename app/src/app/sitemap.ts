import { MetadataRoute } from 'next'
import { projects } from '../data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://showcase.republicofgaming.xyz/' // Replace with your actual domain
  
  // Static pages
  const staticPages = [
        {
        url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  ]
  
  // Dynamic project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(project.dateUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))
  
  return [...staticPages, ...projectPages]
}