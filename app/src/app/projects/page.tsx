'use client';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '../../data/projects';

export default function ProjectsPage() {
  const completedCount = projects.filter(p => p.status === 'completed').length;
  const inProgressCount = projects.filter(p => p.status === 'in-progress').length;
  const totalCount = projects.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-black text-white dark:bg-white dark:text-black';
      case 'in-progress':
        return 'bg-gray-600 text-white dark:bg-gray-400 dark:text-black';
      case 'planned':
        return 'bg-gray-400 text-black dark:bg-gray-600 dark:text-white';
      default:
        return 'bg-gray-300 text-black dark:bg-gray-700 dark:text-white';
    }
  };

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

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 heading-gradient">
            Projects
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Explore my collection of creative projects and digital experiences.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card hover-lift animate-scale-in animate-delay-100">
            <div className="text-3xl font-bold text-white mb-2">
              {completedCount}
            </div>
            <div className="text-gray-200">Completed Projects</div>
          </div>
          <div className="card hover-lift animate-scale-in animate-delay-200">
            <div className="text-3xl font-bold text-white mb-2">
              {inProgressCount}
            </div>
            <div className="text-gray-200">In Progress</div>
          </div>
          <div className="card hover-lift animate-scale-in animate-delay-300">
            <div className="text-3xl font-bold text-white mb-2">
              {totalCount}
            </div>
            <div className="text-gray-200">Total Projects</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="card hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 bg-black">
                <Image
                  src={project.thumbnailImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-gray-900 text-white text-xs font-medium">
                    {getStatusText(project.status)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-sm text-gray-300 font-medium">
                    {project.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-200 mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 border border-gray-700 text-gray-200 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 border border-gray-700 text-gray-200 text-xs rounded">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    {new Date(project.dateCreated).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short'
                    })}
                  </div>
                  
                  <div className="flex space-x-2">
                    {project.links.github && (
                      <div className="w-5 h-5 text-gray-400 hover:text-white transition-colors">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </div>
                    )}
                    {project.links.live && (
                      <div className="w-5 h-5 text-gray-400 hover:text-white transition-colors">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center animate-fade-in animate-delay-500">
          <h2 className="text-2xl font-bold mb-4 heading-gradient">
            Have a project in mind?
          </h2>
          <p className="text-gray-200 mb-6">
            I&apos;m always interested in new challenges and collaborative opportunities.
          </p>
          <a
            href="mailto:contact@kaine.dev"
            className="btn-primary inline-flex items-center px-6 py-3 font-semibold group"
          >
            Get In Touch
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}