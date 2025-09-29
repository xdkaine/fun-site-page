import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://showcase.republicofgaming.xyz'), // Replace with your actual domain
  title: {
    default: "Kaine's Project Showcase",
    template: "%s | Kaine's Portfolio"
  },
  description: "Explore my creative projects and digital experiences. Full-stack developer specializing in modern web technologies, game development, and innovative solutions.",
  keywords: ['Kaine', 'Developer', 'Portfolio', 'Projects', 'Web Development', 'Full Stack', 'Creative', 'Digital'],
  authors: [{ name: 'Kaine' }],
  creator: 'Kaine',
  publisher: 'Kaine',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://showcase.republicofgaming.xyz',
    siteName: "Kaine's Project Showcase",
    title: "Kaine's Project Showcase",
    description: "Explore my creative projects and digital experiences. Full-stack developer specializing in modern web technologies.",
    images: [
      {
        url: '/og-image.png', // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Kaine's Project Showcase",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kaine's Project Showcase",
    description: "Explore my creative projects and digital experiences. Full-stack developer specializing in modern web technologies.",
    images: ['/og-image.png'], // Same image as OG
    creator: '@kaine', // Replace with actual Twitter handle
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kaine",
              "jobTitle": "Developer",
              "url": "https://showcase.republicofgaming.xyz",
              "sameAs": [
                "https://github.com/xdkaine", // Replace with actual URLs
              ],
              "knowsAbout": [
                "Web Development",
                "Full Stack Development",
                "JavaScript",
                "TypeScript",
                "React",
                "Next.js",
                "Node.js"
              ],
              "description": "Full-stack developer specializing in modern web technologies, game development, and innovative solutions."
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        <main className="flex-grow animate-fade-in">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
