import { useRef } from "react";
import { Navbar } from "@/components/navbar";
import "@/styles/globals.css";
import "../styles/globals.css"; // if you're one level down

export default function DefaultLayout({
                                        children,
                                      }: {
  children: React.ReactNode;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* 🌐 Non-interactive Iframe Background */}
      <div className="fixed top-0 left-0 w-full h-screen -z-10">
        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        <iframe
          ref={iframeRef}
          src="https://codepen.io/A-Singh15/full/mydYePw"
          frameBorder="0"
          allowFullScreen
          className="w-full h-full"
          style={{
            border: "none",
            pointerEvents: "none", // disables interaction
            zIndex: 0,
          }}
        />
      </div>

      {/* 🧭 Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* 🧠 Scrollable content with padding for fixed header/footer */}
      <main className="pt-24 pb-20 px-6 container mx-auto max-w-7xl relative z-10">
        {children}
      </main>


    </div>
  );
}
