'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectById } from '../../../data/projects';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  // Handle the async params
  useState(() => {
    params.then(setResolvedParams);
  });

  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  const project = getProjectById(resolvedParams.id);

  if (!project) {
    notFound();
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      default:
        return status;
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.fullDescription,
            "creator": {
              "@type": "Person",
              "name": "Kaine",
              "url": "https://kaine.dev"
            },
            "dateCreated": project.dateCreated,
            "dateModified": project.dateUpdated,
            "genre": project.category,
            "keywords": project.technologies.join(", "),
            "url": `https://kaine.dev/projects/${project.id}`,
            "image": project.images.map(img => `https://kaine.dev${img}`),
            "thumbnailUrl": `https://kaine.dev${project.thumbnailImage}`,
            "workExample": project.links.live ? {
              "@type": "WebSite",
              "url": project.links.live
            } : undefined,
            "codeRepository": project.links.github,
            "programmingLanguage": project.technologies.filter(tech => 
              ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust'].includes(tech)
            ),
            "runtimePlatform": project.technologies.filter(tech => 
              ['Node.js', 'React', 'Next.js', 'Vue.js', 'Angular', 'Express', 'Django', 'Flask'].includes(tech)
            )
          })
        }}
      />
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6 animate-fade-in">
            <Link
              href="/projects"
              className="inline-flex items-center text-gray-200 hover:text-white transition-all duration-300 hover:translate-x-1"
            >
              <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Projects
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="animate-slide-left">
              <div className="flex items-center gap-4 mb-4">
                <span className={`px-3 py-1 text-sm font-medium rounded ${
                  project.status === 'completed' ? 'bg-green-500 text-black' : 
                  project.status === 'in-progress' ? 'bg-yellow-500 text-black' : 
                  project.status === 'planned' ? 'bg-blue-900 text-white' : 
                  'bg-gray-300 text-black'
                }`}>
                  {getStatusText(project.status)}
                </span>
                <span className="text-gray-200 font-medium">
                  {project.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-gradient">
                {project.title}
              </h1>

              <p className="text-xl text-gray-200 mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-6">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-black border border-gray-700 text-white hover:bg-gray-900 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-lg group rounded"
                  >
                    <svg className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg group rounded"
                  >
                    <svg className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group rounded"
                  >
                    <svg className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M12 5v.01M12 19v.01M12 3a9 9 0 110 18 9 9 0 010-18z" />
                    </svg>
                    Try Demo
                  </a>
                )}
                {project.links.discord && (
                  <a
                    href={project.links.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group rounded"
                  >
                    <svg className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.191.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    Discord
                  </a>
                )}
              </div>
            </div>

            {/* Image Carousel */}
            <div className="space-y-4 animate-slide-right">
              <div className="relative bg-black rounded-lg overflow-hidden aspect-video hover:scale-105 transition-transform duration-500 border border-gray-800">
                <Image
                  src={project.images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1} - ${project.description}`}
                  fill
                  className="object-cover cursor-pointer"
                  onClick={() => setIsImageExpanded(true)}
                  priority={currentImageIndex === 0}
                  loading={currentImageIndex === 0 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                />
                
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition-all duration-300 border border-gray-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-90 transition-all duration-300 border border-gray-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip */}
              {project.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === index
                          ? 'border-white shadow-lg'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} thumbnail ${index + 1}`}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300 animate-fade-in animate-delay-100">
              <h2 className="text-2xl font-bold text-white mb-4">
                About This Project
              </h2>
              <p className="text-gray-200 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {/* Features */}
            <div className="bg-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300 animate-fade-in animate-delay-200">
              <h2 className="text-2xl font-bold text-white mb-4">
                Key Features
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-gray-200 hover:text-white transition-colors duration-200">
                    <svg className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Challenges */}
            <div className="bg-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300 animate-fade-in animate-delay-300">
              <h2 className="text-2xl font-bold text-white mb-4">
                Challenges & Solutions
              </h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start text-gray-200 hover:text-white transition-colors duration-200">
                    <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Technologies */}
            <div className="bg-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300 animate-slide-right animate-delay-100">
              <h3 className="text-lg font-semibold text-white mb-4">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 border border-gray-700 text-gray-200 text-sm hover:border-gray-600 hover:text-white transition-all duration-200 hover:scale-105 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Info */}
            <div className="bg-black border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-all duration-300 animate-slide-right stagger-animate">
              <h3 className="text-lg font-semibold text-white mb-4">
                Project Information
              </h3>
              <div className="space-y-3">
                <div className="hover:bg-gray-900 p-2 rounded transition-colors duration-200">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white">{project.category}</div>
                </div>
                <div className="hover:bg-gray-900 p-2 rounded transition-colors duration-200">
                  <div className="text-sm text-gray-400">Status</div>
                  <div className="text-white">{getStatusText(project.status)}</div>
                </div>
                <div className="hover:bg-gray-900 p-2 rounded transition-colors duration-200">
                  <div className="text-sm text-gray-400">Created</div>
                  <div className="text-white">
                    {new Date(project.dateCreated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="hover:bg-gray-900 p-2 rounded transition-colors duration-200">
                  <div className="text-sm text-gray-400">Last Updated</div>
                  <div className="text-white">
                    {new Date(project.dateUpdated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isImageExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageExpanded(false)}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={project.images[currentImageIndex]}
              alt={`${project.title} - Expanded view of image ${currentImageIndex + 1}`}
              width={1920}
              height={1080}
              className="object-contain max-w-full max-h-full w-auto h-auto rounded-lg shadow-2xl"
              priority
              loading="eager"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
          
          {/* Controls positioned on the outer modal container */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsImageExpanded(false);
            }}
            className="fixed top-6 right-6 bg-black bg-opacity-80 text-white p-3 rounded-full hover:bg-opacity-95 transition-all duration-300 z-10 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Navigation arrows for expanded view */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-80 text-white p-3 rounded-full hover:bg-opacity-95 transition-all duration-300 z-10 shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="fixed right-6 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-80 text-white p-3 rounded-full hover:bg-opacity-95 transition-all duration-300 z-10 shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Image counter */}
          {project.images.length > 1 && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-4 py-2 rounded-full text-sm z-10">
              {currentImageIndex + 1} of {project.images.length}
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
}