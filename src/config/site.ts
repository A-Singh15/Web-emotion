export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AURORA⁺",
  description: "AI-driven emotion and attention detection.",

  // 🔹 Main Navigation Bar Items
  navItems: [
    { label: "Home", href: "/" },
   // { label: "Jetson Mode", href: "/Jetson" },
    { label: " Browser Mode", href: "/Live" },
    { label: "Detect Emotions", href: "/realtimedetect" },
    { label: "Focus Tracker", href: "/attention" },
    { label: "About Us", href: "/about" },
    { label: "Aurora", href: "/Aurora" },


  ],

  // 🔹 Mobile & Sidebar Menu Items
  navMenuItems: [
    { label: "Home", href: "/" },
   //  { label: "Jetson Mode", href: "/Jetson" },
    { label: " Browser Mode", href: "/Live" },
    { label: "Detect Emotions", href: "/realtimedetect" },
    { label: "Focus Tracker", href: "/attention" },
    { label: "About Us", href: "/about" },
    { label: "Aurora", href: "/Aurora" },

  ],

  // 🔹 External Links
  links: {
    github: "https://github.com/Audio-Visual-Emotion-Recognition-System",
  },
};
