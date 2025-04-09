import { useState, useRef } from "react";
import DefaultLayout from "@/layouts/default";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import { motion } from "framer-motion";

export default function RealtimeEmotion() {
  const [isStreaming, setIsStreaming] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    const iframe = iframeRef.current;
    if (iframe) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframe.requestFullscreen?.();
      }
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-start gap-8 py-6 relative bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a] overflow-hidden w-full">

        {/* Background Glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-violet-600/10 blur-[120px] rounded-full z-0" />

        {/* Page Title */}
        <div className="text-center z-10 w-full max-w-screen-xl px-4">
          <h1 className={`${title()} text-4xl md:text-5xl text-white`}>            AI-powered real-time emotion recognition.
          </h1>
          <p className={`${subtitle({ class: "mt-2" })} text-base md:text-lg text-gray-300`}>
          </p>
        </div>

        {/* Webcam Feed */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-screen-2xl border-2 rounded-xl shadow-xl border-gray-700 z-10"
        >
          <Card className="p-4 w-full flex flex-col items-center bg-black/90">
            <h2 className="text-xl font-semibold text-white">Live Webcam Feed</h2>
            <div className="relative mt-4 w-full h-[600px]">
              {isStreaming ? (
                // eslint-disable-next-line jsx-a11y/iframe-has-title
                <iframe
                  ref={iframeRef}
                  src="https://vladmandic.github.io/human/demo/typescript/index.html"
                  className="w-full h-full rounded-lg border shadow-md"
                  allow="camera; microphone"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center text-white text-lg">
                  Camera is Off 📷
                </div>
              )}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Button color="primary" onClick={() => setIsStreaming(!isStreaming)}>
                {isStreaming ? "Stop Video" : "Start Video"}
              </Button>
              <Button color="secondary" onClick={toggleFullscreen}>
                Toggle Fullscreen
              </Button>
            </div>
          </Card>
        </motion.div>


      </section>
    </DefaultLayout>
  );
}
