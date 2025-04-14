import DefaultLayout from "@/layouts/default";
import { Card } from "@heroui/card";
import { title, subtitle } from "@/components/primitives";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

type Author = {
  name: string;
  image: string;
  color: string;
  role: string;
  focus: string;
  programming: string;
  interests: string;
};

const authors: Author[] = [
  {
    name: "Aaron",
    image: "https://i.ibb.co/1YKtKJRM/Screenshot-2025-04-08-at-2-15-53-PM-removebg-preview-1.png",
    color: "primary",
    role: "Graduate Research Assistant",
    focus:
        "Built core architecture for emotion recognition system, including data pipelines, emotion models, and real-time inference.",
    programming: "Python, C++, MATLAB, TensorFlow, PyTorch",
    interests: "Deep Learning, HPC, AI Systems",
  },
  {
    name: "Bisum",
    image: "/images/Bisum.png",
    color: "secondary",
    role: "Graduate Research Assistant",
    focus: "Contributed to AI/ML model training and integration.",
    programming: "Python, C++, MATLAB, TensorFlow, PyTorch",
    interests: "Deep Learning, HPC, AI Systems",
  },
  {
    name: "Ratish",
    image: "https://i.ibb.co/4gPgnjHT/as.png",
    color: "primary",
    role: "Graduate Research Assistant",
    focus: "Verification and testing.",
    programming: "",
    interests: "AI Systems",
  },
];

const professors: Author[] = [
  {
    name: "Dr. Sanchita Ghose",
    image: "https://i.ibb.co/5g9Gg09D/ghose.png",
    color: "success",
    role: "Assistant Professor, AI-LAMP Director",
    focus:
        "Leads research in multimodal learning and AI for human-computer interaction. Expert in deep learning for sound synthesis, video processing, and cross-modal retrieval.",
    programming: "Python, MATLAB, AI Toolkits",
    interests: "Multimodal Perception, Deep Learning, Cross-modal AI",
  },
  {
    name: "Dr. Hamid Mahmoodi",
    image: "https://necrl.github.io/NECRL/design/Hamid_1x1.jpg",
    color: "warning",
    role: "Professor & Graduate Program Coordinator NeCRL",
    focus:
        "Focuses on VLSI design, low-power high-performance circuits, and nanoelectronics. Drives innovation in semiconductor systems and mentoring students.",
    programming: "Hardware Design, Circuit Modeling",
    interests: "VLSI, Nanoelectronics, Semiconductor Systems",
  },
];
export default function ProjectShowcase() {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

  return (
      <DefaultLayout>
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-violet-600/10 blur-[120px] rounded-full z-0 pointer-events-none" />

        <section className="flex flex-col items-center justify-center gap-10 py-8 md:py-12">
          {/* Professors on far left and right, title in center */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full items-center">
            {/* Professor Left */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center cursor-pointer"
                onClick={() => setSelectedAuthor(professors[0])}
            >
              <img
                  src={professors[0].image}
                  alt={professors[0].name}
                  className="w-48 h-48 rounded-xl border-4 border-current shadow-xl object-cover"
              />
              <p className="mt-3 text-lg font-bold">{professors[0].name}</p>
              <p className="text-sm text-default-600 font-medium tracking-wide mt-1">
                {professors[0].role}
              </p>
              <button className="mt-1 text-xs underline">View More</button>
            </motion.div>

            {/* Title Center */}
            <div className="text-center space-y-3 col-span-1">
              <h1 className={title({ color: "cyan" })}>Meet the Team</h1>
              <p className={subtitle({ class: "max-w-md mx-auto" })}>
                A research collaboration between AI-LAMP and NeCRL, focused on AI/ML, LLMs, HPC, embedded systems, and nanoelectronics.
              </p>

              <p className="italic text-lg text-default-500 dark:text-gray-300 font-medium">
                &#34;Ascend Beyond Reality&#34;
              </p>
            </div>

            {/* Professor Right */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center cursor-pointer"
                onClick={() => setSelectedAuthor(professors[1])}
            >
              <img
                  src={professors[1].image}
                  alt={professors[1].name}
                  className="w-48 h-48 rounded-xl border-4 border-current shadow-xl object-cover"
              />
              <p className="mt-3 text-lg font-bold">{professors[1].name}</p>
              <p className="text-sm text-default-600 font-medium tracking-wide mt-1">
                {professors[1].role}
              </p>
              <button className="mt-1 text-xs underline">View More</button>
            </motion.div>
          </div>

          {/* Team Members Section (moved up) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full mt-6">
            {authors.map((author, idx) => (
                <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center cursor-pointer"
                    onClick={() => setSelectedAuthor(author)}
                >
                  <img
                      src={author.image}
                      alt={author.name}
                      className="w-56 h-56 rounded-xl border-4 border-current shadow-xl object-cover"
                  />
                  <p className="mt-4 text-xl font-bold">{author.name}</p>
                  <p className="text-base text-default-600 font-medium tracking-wide mt-1">
                    {author.role}
                  </p>
                  <button className="mt-2 text-sm underline">View More</button>
                </motion.div>
            ))}
          </div>

          {/* Modal */}
          <Dialog
              open={!!selectedAuthor}
              onClose={() => setSelectedAuthor(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          >
            <Dialog.Panel className="bg-white dark:bg-gray-900 p-6 rounded-xl max-w-lg w-full shadow-xl">
              {selectedAuthor && (
                  <>
                    <Dialog.Title className="text-xl font-bold mb-2">
                      {selectedAuthor.name}
                    </Dialog.Title>
                    <img
                        src={selectedAuthor.image}
                        alt={selectedAuthor.name}
                        className="w-60 h-60 mx-auto rounded-xl object-cover mb-4"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {selectedAuthor.role}
                    </p>
                    <p className="text-sm text-default-700 mb-2">
                      <strong>Focus:</strong> {selectedAuthor.focus}
                    </p>
                    {selectedAuthor.programming && (
                        <p className="text-sm text-default-700 mb-2">
                          <strong>Programming:</strong> {selectedAuthor.programming}
                        </p>
                    )}
                    <p className="text-sm text-default-700">
                      <strong>Interests:</strong> {selectedAuthor.interests}
                    </p>
                    <button
                        onClick={() => setSelectedAuthor(null)}
                        className="mt-4 px-4 py-2 bg-primary text-white rounded"
                    >
                      Close
                    </button>
                  </>
              )}
            </Dialog.Panel>
          </Dialog>

          {/* Info Sections */}
          <div className="flex flex-col gap-6 w-full max-w-5xl">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Card className="p-6 border-l-4 border-primary shadow-md">
                <h2 className="text-xl font-semibold text-primary">Vision</h2>
                <p className="mt-2 text-default-700">
                  Designing systems that understand and respond to human
                  emotions—bridging technology and empathy in real time.
                </p>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Card className="p-6 border-l-4 border-secondary shadow-md">
                <h2 className="text-xl font-semibold text-secondary">Highlights</h2>
                <ul className="mt-2 text-default-700 list-disc list-inside">
                  <li>Recognizes emotions from facial expressions and voice</li>
                  <li>Processes inputs instantly and seamlessly</li>
                  <li>Combines visual and audio insights</li>
                  <li>Shares emotional feedback live</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Card className="p-6 border-l-4 border-success shadow-md">
                <h2 className="text-xl font-semibold text-success">Tools We Love</h2>
                <ul className="mt-2 text-default-700 list-disc list-inside">
                  <li>Languages: Python, JavaScript</li>
                  <li>Libraries: OpenCV, TensorFlow, PyTorch, Librosa</li>
                  <li>Frameworks: Flask, React</li>
                  <li>Datasets: FER-2013, RAVDESS</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Card className="p-6 border-l-4 border-warning shadow-md">
                <h2 className="text-xl font-semibold text-warning">
                  Architecture Overview
                </h2>
                <p className="mt-2 text-default-700">
                  Powered by Flask for real-time backend performance, React for a
                  dynamic user interface, and WebSockets for smooth, live
                  communication.
                </p>
              </Card>
            </motion.div>
          </div>
        </section>

        <footer className="w-full text-center py-8 border-t border-gray-300 mt-16 text-sm text-gray-500">
          &copy; 2025 EmotionAI Team. All rights reserved.
        </footer>
      </DefaultLayout>
  );
}
