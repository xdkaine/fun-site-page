import { Metadata } from 'next';

interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  category: string;
  technologies: string[];
  status: string;
  thumbnailImage: string;
  dateCreated?: string;
  dateUpdated?: string;
}

interface SEOMetadataProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  project?: Project;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const defaultSEO = {
  title: "Kaine's Project Showcase - Full Stack Developer Portfolio",
  description: "Developer portfolio showcasing creative projects and digital experiences by Kaine. Explore web development, game modifications, and innovative digital solutions.",
  url: "https://showcase.republicofgaming.xyz",
  image: "https://showcase.republicofgaming.xyz/img/projects/rog/site.png",
  author: "Kaine",
  keywords: ["full stack developer", "web development", "portfolio", "react", "next.js", "typescript", "game development"]
};

export function generateMetadata({
  title,
  description = defaultSEO.description,
  url = defaultSEO.url,
  image = defaultSEO.image,
  keywords = defaultSEO.keywords,
  author = defaultSEO.author,
}: SEOMetadataProps): Metadata {
  const siteTitle = title ? `${title} | Kaine's Showcase` : defaultSEO.title;
  const fullUrl = url.startsWith('http') ? url : `${defaultSEO.url}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${defaultSEO.url}${image}`;

  return {
    title: siteTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: author }],
    creator: author,
    publisher: author,
    robots: "index, follow",
    metadataBase: new URL(defaultSEO.url),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: 'website',
      title: siteTitle,
      description,
      url: fullUrl,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteTitle} - ${description}`,
        },
      ],
      siteName: "Kaine's Project Showcase",
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: siteTitle,
      description,
      images: [fullImageUrl],
      creator: '@xdkaine',
      site: '@xdkaine',
    },
    other: {
      'theme-color': '#000000',
      'msapplication-TileColor': '#000000',
      'format-detection': 'telephone=no'
    },
  };
}

export function generateProjectMetadata(project: Project): Metadata {
  return generateMetadata({
    title: project.title,
    description: project.fullDescription || project.description,
    url: `/projects/${project.id}`,
    image: project.thumbnailImage,
    keywords: project.technologies,
    publishedTime: project.dateCreated,
    modifiedTime: project.dateUpdated,
  });
}