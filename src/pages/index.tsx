import { useEffect, useRef, useState } from "react";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { url: string };
    }
  }
}

export default function IndexPage() {
  const [isSplineReady, setIsSplineReady] = useState(false);
  const splineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = "hidden";

    // Load spline-viewer script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.79/build/spline-viewer.js";

    script.onload = () => {
      setIsSplineReady(true);

      // Remove Spline watermark
      const interval = setInterval(() => {
        const viewer = document.querySelector("spline-viewer");
        const branding = viewer?.shadowRoot?.querySelector('[part="branding"]');
        if (branding) {
          branding.remove();
          clearInterval(interval);
        }
      }, 500);
    };

    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <DefaultLayout>
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-violet-600/10 blur-[120px] rounded-full z-0" />

      {/* Spline Viewer */}
      {isSplineReady && (
        <div
          ref={splineRef}
          className="absolute top-0 left-0 w-full h-full scale-[1.6] md:scale-[1.7] overflow-hidden -z-10 pointer-events-none select-none"
        >
          <spline-viewer url="https://prod.spline.design/6FvHj30hveMkrNtg/scene.splinecode" />
        </div>
      )}

      {/* Main Content */}
      <section className="relative flex flex-col items-center justify-center text-white z-10 min-h-[100vh] gap-4">
        <div className="text-center max-w-3xl px-4">
          <h1 className={`${title()} text-5xl md:text-6xl font-bold leading-tight`}>
            Welcome to <span className={title({ color: "violet" })}>AURORA⁺</span>
          </h1>
          <p className={`${subtitle({ class: "mt-3" })} text-lg md:text-xl`}>
            Experience real-time emotion recognition using cutting-edge AI technology.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap gap-6 justify-center">
          <Link className={buttonStyles({ color: "secondary", radius: "full", variant: "shadow" })} href="/realtimedetect">
            Try Without AI
          </Link>
          <Link className={buttonStyles({ color: "warning", radius: "full", variant: "shadow" })} href="/Live">
            Try With AI
          </Link>
          <Link className={buttonStyles({ color: "success", radius: "full", variant: "shadow" })} href="/attention">
            Test Your Focus
          </Link>
        </div>

        {/* Hidden Chat Trigger */}
        <Link
          href="/aurora"
          className="mt-6 h-20 w-full max-w-sm rounded-lg cursor-pointer"
          aria-label="Hidden area to chat with AURORA"
        >
          <div className="w-full h-full" />
        </Link>
      </section>
    </DefaultLayout>
  );
}
