import { useEffect, useRef } from "react";
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
  const splineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.79/build/spline-viewer.js";
    document.body.appendChild(script);
  }, []);

  return (
    <DefaultLayout>
      {/* Background Spline */}
      <div ref={splineRef} className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10" />

      <section className="relative flex flex-col items-center justify-center gap-6 py-20 text-white z-10">
        <div className="text-center max-w-3xl">
          <h1 className={`${title()} text-5xl md:text-6xl`}>
            Welcome to <span className={title({ color: "violet" })}>AURORA⁺</span>
          </h1>
          <p className={`${subtitle({ class: "mt-4" })} text-xl md:text-2xl`}>
            Experience real-time emotion recognition using cutting-edge AI technology.
          </p>
        </div>

        {/* Main Feature Buttons */}
        <div className="mt-16 flex flex-wrap gap-6 justify-center">
          <Link className={buttonStyles({ color: "primary", radius: "full", variant: "shadow" })} href="/jetson">
            Without Jetson AI
          </Link>
          <Link className={buttonStyles({ color: "secondary", radius: "full", variant: "shadow" })} href="/live">
            With Jetson AI
          </Link>
          <Link className={buttonStyles({ color: "warning", radius: "full", variant: "shadow" })} href="/realtimedetect">
            Real-Time Detection
          </Link>
          <Link className={buttonStyles({ color: "success", radius: "full", variant: "shadow" })} href="/attention">
            Attention Span
          </Link>
        </div>

        {/* Invisible Click Area */}
        <Link
          href="/aurora"
          className="mt-10 h-24 w-full max-w-sm rounded-lg cursor-pointer"
          aria-label="Hidden area to chat with AURORA"
        >
          <div className="w-full h-full" />
        </Link>

        <div className="h-32 md:h-48" />
      </section>
    </DefaultLayout>
  );
}
