'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { projects } from "../data/projects";

const greetings = [
  "Hello", // English
  "Hola", // Spanish
  "Bonjour", // French
  "Hallo", // German
  "Ciao", // Italian
  "Olá", // Portuguese
  "こんにちは", // Japanese
  "안녕하세요", // Korean
  "你好", // Chinese
  "Привет", // Russian
  "مرحبا", // Arabic
  "नमस्ते", // Hindi
];

const names = ["Kaine", "Rorky", "TT"];

export default function Home() {
  const [currentGreeting, setCurrentGreeting] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentName, setCurrentName] = useState(0);
  const [nameDisplayText, setNameDisplayText] = useState("");
  const [isNameTyping, setIsNameTyping] = useState(true);

  useEffect(() => {
    const currentWord = greetings[currentGreeting];

    if (isTyping) {
      if (displayText.length < currentWord.length) {
        const typingTimer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(typingTimer);
      } else {
        // Finished typing, wait then start erasing
        const waitTimer = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
        return () => clearTimeout(waitTimer);
      }
    } else {
      if (displayText.length > 0) {
        const erasingTimer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
        return () => clearTimeout(erasingTimer);
      } else {
        // Finished erasing, move to next greeting
        setCurrentGreeting((prev) => (prev + 1) % greetings.length);
        setIsTyping(true);
      }
    }
  }, [currentGreeting, displayText, isTyping]);

  useEffect(() => {
    const currentNameWord = names[currentName];

    if (isNameTyping) {
      if (nameDisplayText.length < currentNameWord.length) {
        const nameTypingTimer = setTimeout(() => {
          setNameDisplayText(currentNameWord.slice(0, nameDisplayText.length + 1));
        }, 150);
        return () => clearTimeout(nameTypingTimer);
      } else {
        // Finished typing, wait then start erasing
        const nameWaitTimer = setTimeout(() => {
          setIsNameTyping(false);
        }, 2000);
        return () => clearTimeout(nameWaitTimer);
      }
    } else {
      if (nameDisplayText.length > 0) {
        const nameErasingTimer = setTimeout(() => {
          setNameDisplayText(nameDisplayText.slice(0, -1));
        }, 75);
        return () => clearTimeout(nameErasingTimer);
      } else {
        // Finished erasing, move to next name
        setCurrentName((prev) => (prev + 1) % names.length);
        setIsNameTyping(true);
      }
    }
  }, [currentName, nameDisplayText, isNameTyping]);

  // Get featured projects (first 3)
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Kaine's Project Showcase",
            "url": "https://kaine.dev",
            "description": "Developer portfolio showcasing creative projects and digital experiences by Kaine",
            "author": {
              "@type": "Person",
              "name": "Kaine",
              "jobTitle": "Full Stack Developer",
              "url": "https://kaine.dev",
              "sameAs": [
                "https://github.com/xdkaine",
                "https://twitter.com/kaine",
                "https://linkedin.com/in/kaine"
              ]
            },
            "mainEntity": {
              "@type": "ItemList",
              "name": "Featured Projects",
              "numberOfItems": featuredProjects.length,
              "itemListElement": featuredProjects.map((project, index) => ({
                "@type": "CreativeWork",
                "position": index + 1,
                "name": project.title,
                "description": project.description,
                "url": `https://kaine.dev/projects/${project.id}`,
                "creator": {
                  "@type": "Person",
                  "name": "Kaine"
                },
                "genre": project.category,
                "keywords": project.technologies.join(", ")
              }))
            }
          })
        }}
      />
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-12">
        <main className="text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <span className="text-6xl md:text-8xl font-bold heading-gradient">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </div>
          <p className="text-lg md:text-xl mb-12 text-gray-200 max-w-2xl mx-auto animate-slide-left animate-delay-300">
            I&apos;m <span className="text-white font-semibold">{nameDisplayText}<span className="animate-pulse">|</span></span>, a developer who likes to build for fun! :3
          </p>
          <div className="flex justify-center items-center animate-slide-right animate-delay-500">
            <Link
              href="/projects"
              className="btn-primary px-8 py-3 font-semibold"
            >
              View All Projects
            </Link>
          </div>
        </main>
      </div>

      {/* Projects Preview Section */}
      <div id="projects-preview" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 heading-gradient">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              A glimpse into my recent work and creative endeavors
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className={`card hover-lift animate-scale-in`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative h-48 bg-black">
                  <Image
                    src={project.thumbnailImage}
                    alt={`${project.title} - ${project.category} project featured on homepage`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-medium ${
                      project.status === 'completed' ? 'bg-green-500 text-black' : 
                      project.status === 'in-progress' ? 'bg-yellow-500 text-black' : 
                      project.status === 'planned' ? 'bg-blue-900 text-white' : 
                      'bg-gray-300 text-black'
                    }`}>
                      {project.status === 'completed' ? 'Live' : project.status === 'in-progress' ? 'WIP' : 'Soon'}
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
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 2).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 2 && (
                      <span className="px-2 py-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-xs">
                        +{project.technologies.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View All Projects Button */}
          <div className="text-center animate-fade-in animate-delay-500">
            <Link
              href="/projects"
              className="btn-primary inline-flex items-center px-8 py-4 font-semibold"
            >
              View All Projects
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
