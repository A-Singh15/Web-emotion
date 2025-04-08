import DefaultLayout from "@/layouts/default";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import { useState, useRef } from "react";

export default function RealtimeEmotion() {
  const [isStreaming, setIsStreaming] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    if (iframeRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        iframeRef.current.requestFullscreen?.();
      }
    }
  };

  return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-start gap-6 px-4 md:px-10 pt-4 md:pt-6 min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a]">

          {/* Ambient Glow Background */}
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] bg-violet-600/10 blur-[120px] rounded-full z-0" />

          {/* Page Title */}
          <div className="text-center z-10 max-w-4xl">
            <h1 className={`${title()} text-4xl md:text-5xl`}>Live Emotion Detection</h1>
            <p className={`${subtitle({ class: "mt-2" })} text-base md:text-lg`}>
              AI-powered real-time emotion recognition using facial analysis.
            </p>
          </div>

          {/* Webcam Feed Container - full width */}
          <Card className="w-full max-w-[95rem] p-5 rounded-xl shadow-2xl border border-gray-800 bg-black/90 z-10">
            <h2 className="text-lg font-semibold text-center text-white mb-3">Live Webcam Feed</h2>

            <div className="relative flex justify-center items-center w-full h-[600px] md:h-[680px]">
              {isStreaming && (
                // eslint-disable-next-line jsx-a11y/iframe-has-title
              <iframe
                      ref={iframeRef}
                      src="https://vladmandic.github.io/human/demo/typescript/index.html"
                      className="w-full h-full rounded-xl border shadow-md"
                      allow="camera; microphone"
                      allowFullScreen
                  />
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <Button color="primary" onClick={() => setIsStreaming(!isStreaming)}>
                {isStreaming ? "Stop Video" : "Start Video"}
              </Button>
              <Button color="secondary" onClick={toggleFullscreen}>
                Toggle Fullscreen
              </Button>
            </div>
          </Card>

          {/* Detected Emotion Section */}
          <Card className="p-6 w-full max-w-lg text-center shadow-xl bg-gradient-to-br from-[#181818] to-[#101010] text-white -mt-2 z-10">
            <h2 className="text-lg font-semibold">Detected Emotion</h2>
            <p className="text-3xl mt-2">Neutral 🙂</p>
          </Card>

          {/* Emotion History */}
          <div className="w-full max-w-6xl mt-8 text-center z-10">
            <h3 className="text-base font-semibold text-white mb-3">Emotion History</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {["Neutral 🙂", "Neutral 🙂", "Neutral 🙂", "Neutral 🙂", "Neutral 🙂"].map((e, idx) => (
                  <Card key={idx} className="px-4 py-2 shadow bg-gray-800 text-white">
                    {e}
                  </Card>
              ))}
            </div>
          </div>
        </section>
      </DefaultLayout>
  );
}
