export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  category: string;
  status: 'completed' | 'in-progress' | 'planned';
  images: string[];
  thumbnailImage: string;
  links: {
    github?: string;
    live?: string;
    demo?: string;
    discord?: string;
    documentation?: string;
  };
  features: string[];
  challenges: string[];
  dateCreated: string;
  dateUpdated: string;
}

export const projects: Project[] = [
  {
    id: "republic-of-gaming",
    title: "Republic of Gaming",
    description: "A community-driven project built by for me for people to meet online.",
    fullDescription: "Republic of Gaming is an online community for people to meet and share experiences. We formed out of the game Garry's Mod, based out of DarkRP re-skin called 1942RP. Providing an experience is Resistance Occupied Poland, we created a unique experience providing a fun and engaging environment for players to immerse themselves in. With a focus on roleplay, we offer a variety of jobs, events, and activities to keep our community engaged and entertained.",
    technologies: ["Lua", "PHP", "JavaScript", "Hammer", "Source Engine"],
    category: "Game Development",
    status: "completed",
    images: [
      "/img/projects/rog/site.png",
      "/img/projects/rog/2.jpg",
      "/img/projects/rog/3.png",
      "/img/projects/rog/4.png",
      "/img/projects/rog/5.png",
      "/img/projects/rog/gmod.webp"
      
    ],
    thumbnailImage: "/img/projects/rog/site.png",
    links: {
      github: "https://github.com/xdkaine",
      live: "https://republicofgaming.xyz",
      discord: "https://discord.gg/D3XKxRtpHs"
    },
    features: [
      "Dynamic RP Experience with custom jobs and events",
      "Unique Weapons and Content constantly",
      "Maps created to feature rich detail and immersion",
      "Built with community feedback and involvement"
    ],
    challenges: [
      "Implementing proper CI/CD for Game Server Updates",
      "Transiutioning Production Servers between Hosts",
      "Developing new mechanics and systems from scratch",
      "Building an active project as a solo developer*"
    ],
    dateCreated: "2017-7-05",
    dateUpdated: "2025-04-03"
  },
  
  {
    id: "sam",
    title: "SAM - Server Administration Tool",
    description: "A Garry's Mod Addon for Server Administration.",
    fullDescription: "SAM is a powerful server administration tool for Garry's Mod, designed to help server owners manage their communities effectively. Built for Republic of Gaming, the website for this tool includes a Ban List, Leaderboard for its users and a Community List to honor its donoators and supporters of the community. Other pages include are our shops and rules for our community.",
    technologies: ["Lua", "PHP", "MySQL"],
    category: "Game Development",
    status: "completed",
    images: [
      "/img/projects/sam/1.png",
      "/img/projects/sam/2.png",
      "/img/projects/sam/3.png",
      "/img/projects/sam/4.png",
      "/img/projects/sam/5.png",
      "/img/projects/sam/6.png",
      "/img/projects/sam/7.png",
      "/img/projects/sam/8.png",
      "/img/projects/sam/9.png",
      "/img/projects/sam/10.png",
      "/img/projects/sam/11.png",
      "/img/projects/sam/12.png",
    ],
    thumbnailImage: "/img/projects/sam/1.png",
    links: {
      github: "https://github.com/xdkaine",
      live: "https://sam.republicofgaming.xyz/v2"
    },
    features: [
      "Real-time player banning and unbanning",
      "Gamemode/Server Statistics and Analytics",
      "Steam SSO Authentication",
      "Detailed Logs and Audit Trails",
      "Live Server Reports reported straight to Web Panel"
    ],
    challenges: [
      "Implementing real-time statistics tracking by querying database",
      "Secure authentication through Admin Pages via Steam SSO",
      "Web Panel actions being reflected in-game",
      "Design choices to make website user-friendly"
    ],
    dateCreated: "2023-11-11",
    dateUpdated: "2025-3-22"
  },

    {
    id: "btchat",
    title: "BTChat - Bluetooth Communication App",
    description: "BTChat is a peer-to-peer communication app .",
    fullDescription: "BTChat is a peer-to-peer communication app that uses Bluetooth Low Energy and Multipeer Connectivity for messaging between nearby devices without requiring internet or cellular connectivity.",
    technologies: ["Swift", "SwiftUI", "CoreBluetooth"],
    category: "App Development",
    status: "In-Progress",
    images: [
      "/img/projects/sam/1.png",
    ],
    thumbnailImage: "/img/projects/sam/1.png",
    links: {
      github: "https://github.com/xdkaine",
      live: "https://sam.republicofgaming.xyz/v2"
    },
    features: [
      "Real-time player banning and unbanning",
      "Gamemode/Server Statistics and Analytics",
      "Steam SSO Authentication",
      "Detailed Logs and Audit Trails",
      "Live Server Reports reported straight to Web Panel"
    ],
    challenges: [
      "Implementing real-time statistics tracking by querying database",
      "Secure authentication through Admin Pages via Steam SSO",
      "Web Panel actions being reflected in-game",
      "Design choices to make website user-friendly"
    ],
    dateCreated: "2023-11-11",
    dateUpdated: "2025-3-22"
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project.id === id);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(project => project.category === category);
}

export function getProjectsByStatus(status: Project['status']): Project[] {
  return projects.filter(project => project.status === status);
}