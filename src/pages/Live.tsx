import DefaultLayout from "@/layouts/default";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { title, subtitle } from "@/components/primitives";
import { useState } from "react";

export default function RealtimeEmotion() {
  const [isStreaming, setIsStreaming] = useState(true);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
        <h1 className={title()}>Live Emotion Detection</h1>
        <p className={subtitle({ class: "mt-2" })}>
          AI-powered real-time emotion recognition using facial analysis.
        </p>

        {/* Embedded Iframe Feed - Fully Expanded */}
        <Card className="p-4 rounded-lg shadow-lg border border-gray-500 w-full max-w-screen-2xl">
          <h2 className="text-xl font-semibold text-center">Live Webcam Feed</h2>
          <div className="relative flex justify-center items-center w-full">
            {isStreaming && (
              <iframe
                src="https://vladmandic.github.io/human/demo/typescript/index.html"
                className="w-full h-[1000px] border rounded-xl shadow-md"
                allow="camera; microphone"
                allowFullScreen
              />
            )}
          </div>
          <Button
            color="primary"
            className="mt-4"
            onClick={() => setIsStreaming(!isStreaming)}
          >
            {isStreaming ? "Stop Video" : "Start Video"}
          </Button>
        </Card>

        {/* Static Emotion Output Placeholder */}
        <Card className="p-6 w-full max-w-lg text-center shadow-lg">
          <h2 className="text-xl font-semibold">Detected Emotion</h2>
          <p className="text-2xl mt-2">Neutral 🙂</p>
        </Card>

        {/* Static Emotion History */}
        <h3 className="text-lg font-semibold mt-6">Emotion History</h3>
        <div className="flex flex-wrap gap-3">
          {["Neutral 🙂", "Neutral 🙂", "Neutral 🙂", "Neutral 🙂", "Neutral 🙂"].map((e, idx) => (
            <Card key={idx} className="px-4 py-2 shadow">{e}</Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
