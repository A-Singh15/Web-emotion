import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import { io, Socket } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

export default function RealtimeEmotion() {
  const [emotion, setEmotion] = useState("Neutral 🙂");
  const [emotionHistory, setEmotionHistory] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [videoSrc, setVideoSrc] = useState("http://localhost:4200/video_feed");
  const [alertEmotion, setAlertEmotion] = useState(false);
  // @ts-ignore
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4200");

    newSocket.on("connect", () => console.log("✅ WebSocket Connected"));
    newSocket.on("disconnect", () => console.log("❌ WebSocket Disconnected"));

    newSocket.on("emotion_data", (data) => {
      const detectedEmotion = getEmoji(data.emotion);
      setEmotion(detectedEmotion);

      setEmotionHistory((prev) => {
        if (prev.length === 0 || prev[0] !== detectedEmotion) {
          return [detectedEmotion, ...prev.slice(0, 4)];
        }
        return prev;
      });

      setAlertEmotion(data.emotion !== "neutral" && data.emotion !== "happy");
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const getEmoji = (emotion: string) => {
    const emojiMap: { [key: string]: string } = {
      happy: "Happy 😃",
      sad: "Sad 😢",
      angry: "Angry 😡",
      surprised: "Surprised 😲",
      neutral: "Neutral 🙂",
      fear: "Fear 😨",
      disgust: "Disgust 🤢",
    };
    return emojiMap[emotion] || "Neutral 🙂";
  };

  const toggleStream = () => {
    setIsStreaming(!isStreaming);
    setVideoSrc(isStreaming ? "" : "http://localhost:4200/video_feed");
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-4 md:py-6 px-4 bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a] w-full">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-violet-600/10 blur-[120px] rounded-full z-0" />

        {/* 🔥 Emotion Alert */}
        <AnimatePresence>
          {isStreaming && alertEmotion && (
            <motion.div
              key="emotion-alert"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-4xl font-bold text-red-500"
            >
              Unusual Emotion Detected! ⚠️
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📦 Main Horizontal Layout */}
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-screen-2xl">
          {/* 🎥 Video Container */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
            className={`flex-1 border-2 rounded-xl shadow-xl ${
              alertEmotion ? "border-red-500" : "border-gray-700"
            }`}
          >
            <Card className="p-4 w-full flex flex-col items-center bg-black/90">
              <h2 className="text-xl font-semibold text-white">Live Webcam Feed</h2>
              <div className="relative mt-4 w-full h-[600px]">
                {isStreaming ? (
                  <motion.img
                    src={videoSrc}
                    alt="Live Webcam"
                    className="w-full h-full rounded-lg border shadow-md object-cover bg-black"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center text-white text-lg">
                    Camera is Off 📷
                  </div>
                )}
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <Button color="primary" onClick={toggleStream}>
                  {isStreaming ? "Stop Video" : "Start Video"}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* 🤖 Emotion Cards Sidebar */}
          <div className="flex flex-col gap-6 w-full lg:w-[400px]">
            {/* Detected Emotion */}
            <Card className="p-6 w-full text-center bg-black/80 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-semibold text-white">Detected Emotion</h2>
              <motion.p
                className="text-3xl mt-4 text-white"
                key={emotion}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {emotion}
              </motion.p>
            </Card>

            {/* Emotion History */}
            <Card className="p-6 w-full text-center bg-black/80 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Emotion History</h2>
              <div className="flex flex-col gap-3">
                {emotionHistory.map((e, idx) => (
                  <div key={idx} className="bg-gray-900 text-white px-4 py-2 rounded shadow text-lg">
                    {e}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}