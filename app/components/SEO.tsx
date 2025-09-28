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

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  projects?: Project[];
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
  image: "https://showcase.republicofgaming.xyz/og-image.png",
  author: "Kaine",
  keywords: ["full stack developer", "web development", "portfolio", "react", "next.js", "typescript", "game development"]
};

export default function SEO({
  title,
  description = defaultSEO.description,
  url = defaultSEO.url,
  image = defaultSEO.image,
  type = 'website',
  projects,
  project,
  keywords = defaultSEO.keywords, // Used in structured data
  author = defaultSEO.author,
  publishedTime,
  modifiedTime
}: SEOProps) {
  const siteTitle = title ? `${title} | Kaine's Showcase` : defaultSEO.title;
  const fullUrl = url.startsWith('http') ? url : `${defaultSEO.url}${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `${defaultSEO.url}${image}`;

  // Generate structured data based on page type
  const generateStructuredData = () => {
    const baseStructuredData = {
      "@context": "https://schema.org",
      "@type": type === 'website' ? "WebSite" : type === 'article' ? "CreativeWork" : "ProfilePage",
      "name": siteTitle,
      "url": fullUrl,
      "description": description,
      "author": {
        "@type": "Person",
        "name": author,
        "jobTitle": "Full Stack Developer",
        "url": defaultSEO.url,
        "sameAs": [
          "https://github.com/xdkaine",
        ]
      }
    };

    // Add website-specific structured data
    if (type === 'website' && projects) {
      return {
        ...baseStructuredData,
        "@type": "WebSite",
        "mainEntity": {
          "@type": "ItemList",
          "name": "Featured Projects",
          "numberOfItems": projects.length,
          "itemListElement": projects.map((proj, index) => ({
            "@type": "CreativeWork",
            "position": index + 1,
            "name": proj.title,
            "description": proj.description,
            "url": `${defaultSEO.url}/projects/${proj.id}`,
            "creator": {
              "@type": "Person",
              "name": author
            },
            "genre": proj.category,
            "keywords": proj.technologies.join(", "),
            "creativeWorkStatus": proj.status,
            "image": proj.thumbnailImage.startsWith('http') ? proj.thumbnailImage : `${defaultSEO.url}${proj.thumbnailImage}`
          }))
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${defaultSEO.url}/projects?search={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      };
    }

    // Add project-specific structured data
    if (type === 'article' && project) {
      return {
        ...baseStructuredData,
        "@type": "CreativeWork",
        "headline": project.title,
        "genre": project.category,
        "keywords": project.technologies.join(", "),
        "creativeWorkStatus": project.status,
        "image": project.thumbnailImage.startsWith('http') ? project.thumbnailImage : `${defaultSEO.url}${project.thumbnailImage}`,
        "datePublished": publishedTime,
        "dateModified": modifiedTime,
        "mainEntity": {
          "@type": "SoftwareApplication",
          "name": project.title,
          "description": project.fullDescription || project.description,
          "applicationCategory": project.category,
          "operatingSystem": "Web Browser",
          "author": {
            "@type": "Person",
            "name": author
          }
        }
      };
    }

    return baseStructuredData;
  };

  const generatePersonSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": author,
    "jobTitle": "Full Stack Developer",
    "description": "Passionate full stack developer creating innovative web applications and digital experiences",
    "url": defaultSEO.url,
    "image": fullImageUrl,
    "sameAs": [
      "https://github.com/xdkaine"
    ],
    "knowsAbout": [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Web Development",
      "Full Stack Development",
      "Game Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Self-taught Developer"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Full Stack Developer",
      "occupationLocation": {
        "@type": "Place",
        "name": "Remote"
      }
    }
  });

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData())
        }}
      />

      {/* Additional Schema for Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generatePersonSchema())
        }}
      />
    </>
  );
}