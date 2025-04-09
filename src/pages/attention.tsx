import { useEffect, useState } from "react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

export default function RealtimeAttention() {
  const [focusStatus, setFocusStatus] = useState("Neutral 🙂");
  const [gazeDirection, setGazeDirection] = useState("Center");
  const [blinking, setBlinking] = useState("No");
  const [history, setHistory] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [videoSrc, setVideoSrc] = useState("http://localhost:4200/video_feed");
  const [isFocused, setIsFocused] = useState(false);
  // @ts-ignore
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    if (isStreaming) {
      const newSocket = io("http://localhost:4200");

      newSocket.on("attention_data", (data) => {
        setFocusStatus(data.focus_status);
        setGazeDirection(data.gaze_direction);
        setBlinking(data.blinking);
        setHistory((prev) => [data.focus_status, ...prev.slice(0, 4)]);
        setIsFocused(data.focus_status.includes("Focused"));
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    } else {
      setIsFocused(false);
      setFocusStatus("Neutral 🙂");
      setGazeDirection("Center");
      setBlinking("No");
      setHistory([]);
    }
  }, [isStreaming]);

  const toggleStream = () => {
    setIsStreaming(!isStreaming);
    setVideoSrc(isStreaming ? "" : "http://localhost:4200/video_feed");
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-4 md:py-6 px-4 bg-gradient-to-br from-black via-[#0e0e0e] to-[#1a1a1a] w-full">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-violet-600/10 blur-[120px] rounded-full z-0" />

        {/* 🔥 Animated Alerts */}
        <AnimatePresence>
          {isStreaming && isFocused && (
            <motion.div
              key="focus-animation"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="text-4xl font-bold text-green-500"
            >
              FOCUS FOCUS FOCUS! 🎯
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isStreaming && !isFocused && focusStatus.includes("Distracted") && (
            <motion.div
              key="distracted-animation"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              className="text-4xl font-bold text-red-500"
            >
              DISTRACTED! PAY ATTENTION! 😵‍💫
            </motion.div>
          )}
        </AnimatePresence>

        {/* 📦 Horizontal Layout */}
        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-screen-2xl">
          {/* 🎥 Video Feed */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.5 }}
            className={`flex-1 border-2 rounded-xl shadow-xl ${
              isFocused ? "border-green-500" : "border-red-500"
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

          {/* 🤖 Attention Info Sidebar */}
          <div className="flex flex-col gap-6 w-full lg:w-[400px]">
            {/* Focus Status */}
            <Card className="p-6 w-full text-center bg-black/80 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-semibold text-white">Attention Status</h2>
              <p className="text-3xl mt-4 text-white">{focusStatus}</p>
              <p className="text-lg mt-2 text-white">Gaze: {gazeDirection}</p>
              <p className="text-lg mt-2 text-white">Blinking: {blinking}</p>
            </Card>

            {/* History */}
            <Card className="p-6 w-full text-center bg-black/80 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4">Attention History</h2>
              <div className="flex flex-col gap-3">
                {history.map((e, idx) => (
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
