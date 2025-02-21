"use client";

import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState("/Logo.png");

  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  const handleClick = () => {
    router.push("/orangepicm4/bat_dau_hoc");
  };

  const handleSpeak = (audioFile) => {
    try {
      const audio = new Audio(`/sounds/page3/${audioFile}`);

      audio.onplay = () => {
        console.log("Bắt đầu phát âm thanh");
        setIsPlaying(true);
      };

      audio.onended = () => {
        console.log("Kết thúc phát âm");
        setIsPlaying(false);
      };

      audio.play().catch((playError) => {
        console.error("Lỗi play():", playError);
        setError("Không thể phát âm thanh");
      });
    } catch (error) {
      console.error("Lỗi:", error);
      setError("Có lỗi xảy ra khi phát âm thanh");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col select-none relative bg-gradient-to-b from-blue-100 to-purple-100"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "mass", stiffness: 100 }}
    >
      <div className="min-h-screen flex flex-col select-none relative">
        <div className="absolute top-4 left-4">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={67}
            className="object-contain"
          />
        </div>

        <motion.div
          className="absolute top-24 w-full text-center text-5xl text-purple-600 font-bold leading-relaxed px-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white rounded-full py-6 px-8 shadow-lg inline-block text-4xl pacifico-regular mt-8">
            <span className="text-yellow-500">🌟</span> Bạn ơi, bài tập về nhà
            làm xong chưa nè? <span className="text-yellow-500">🌟</span>
          </div>
        </motion.div>

        <div className="flex flex-1 items-center justify-center gap-8 px-4 mt-24">
          <motion.button
            className="w-80 h-80 rounded-3xl bg-gradient-to-br from-red-400 to-red-500 shadow-lg transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-white text-3xl font-bold p-6 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{
              scale: 0.8,
              transition: { duration: 0.001 }, // Nhanh hơn khi click
            }}
            onClick={() => handleSpeak("nhất_em_rồi.mp3")}
          >
            <div className="relative w-[150px] h-[150px] mb-8">
              <Image
                src="/emoji_gif/em_quen_mat.gif" // Đường dẫn tới GIF
                alt="GIF icon"
                fill
                priority
                sizes="80px"
                className="object-contain"
              />
            </div>
            Em Quên Mất Rồi
          </motion.button>

          <motion.button
            className="w-80 h-80 rounded-3xl bg-gradient-to-br from-green-400 to-green-500 shadow-lg transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-white text-3xl font-bold p-6 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8, transition: { duration: 0.001 } }}
            onClick={() => handleSpeak("tuyet_voi_em.mp3")}
          >
            <div className="relative w-[150px] h-[180px] ml-16 mb-8">
              <Image
                src="/emoji_gif/em_da_hoan_thanh.gif" // Đường dẫn tới GIF
                alt="GIF icon"
                fill
                priority
                sizes="80px"
                className="object-contain"
              />
            </div>
            Em Đã Hoàn Thành
          </motion.button>

          <motion.button
            className="w-80 h-80 rounded-3xl bg-gradient-to-br from-yellow-300 to-yellow-400 shadow-lg transform hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center text-white text-3xl font-bold p-6 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8, transition: { duration: 0.001 } }}
            onClick={() => handleSpeak("ok.mp3")}
          >
            <div className="relative w-[150px] h-[150px] mb-8">
              <Image
                src="/emoji_gif/bai_kho_qua.gif" // Đường dẫn tới GIF
                alt="GIF icon"
                fill
                priority
                sizes="80px"
                className="object-contain"
              />
            </div>
            Bài Khó Quá,
            <br />
            Em Chưa Làm Được
          </motion.button>
        </div>

        <motion.div
          className="absolute bottom-8 right-8 cursor-pointer"
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
        >
          <FaArrowCircleRight className="text-6xl text-purple-500 hover:text-purple-600 transition-colors duration-300" />
        </motion.div>
      </div>
    </motion.div>
  );
}
