"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [logo, setLogo] = useState("/Logo.png");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
    // Kích hoạt animation bằng cách toggle state
    setIsVisible(true);
  }, []);

  const handleScreenClick = () => {
    router.push("/orangepicm4/trang_4");
  };

  const backgroundEmojis = ["🎯", "⭐", "🎨", "📚", "✨"];

  return (
    <AnimatePresence>
      <motion.div
        className="relative min-h-screen bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-400 cursor-pointer select-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        onClick={handleScreenClick}
      >
        {/* Background Emojis */}
        {isVisible &&
          backgroundEmojis.map((emoji, index) => (
            <motion.div
              key={index}
              className="absolute text-5xl pointer-events-none"
              style={{
                top: `${Math.random() * 70 + 15}vh`,
                left: `${Math.random() * 70 + 15}vw`,
              }}
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
                opacity: [0.7, 0.3, 0.7],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: index * 0.2,
              }}
            >
              {emoji}
            </motion.div>
          ))}

        <div className="min-h-screen flex flex-col items-center justify-center relative">
          {/* Logo */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={logo}
              alt="Logo"
              width={200}
              height={90}
              className="object-contain"
            />
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-3xl py-14 px-12 shadow-2xl mx-4 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl text-purple-600 font-bold leading-relaxed pacifico-regular"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="mb-4 text-yellow-500 text-7xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🎓
              </motion.div>
              <span className="mb-2">Vậy là kết thúc buổi học rồi,</span>
              <br />
              <span
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text mt-4"
                style={{ lineHeight: "1.8" }}
              >
                hãy cùng đánh giá buổi học hôm nay nhé!
              </span>
            </motion.h1>
          </motion.div>

          {/* Instructions */}
          <motion.div
            className="absolute bottom-8 text-white text-xl font-bold italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="opacity-50">Quét thẻ hoặc vân tay để tiếp tục</div>
          </motion.div>

          {/* Bottom Emojis */}
          <motion.div
            className="absolute bottom-20 flex gap-8 text-6xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {["📝", "🎨", "🌟"].map((emoji, index) => (
              <motion.span
                key={index}
                animate={{
                  y: [-10, 10],
                  rotate: [-10, 10],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: index * 0.3,
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
