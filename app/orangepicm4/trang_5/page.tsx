"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Home() {
  const [logo, setLogo] = useState("/Logo.png");

  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  const handleNavigation = () => {
    window.location.href = "trang_6";
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col select-none relative bg-gradient-to-b from-blue-100 via-purple-50 to-pink-100"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0 }}
    >
      <div className="min-h-screen flex flex-col select-none relative">
        <div className="absolute top-4 left-4">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={68}
            className="object-contain"
          />
        </div>

        <div className="mt-24 text-center px-4">
          <div className="bg-white rounded-2xl py-6 px-8 shadow-lg inline-block mt-20">
            <h1 className="text-6xl md:text-6xl text-purple-600 font-bold leading-relaxed pacifico-regular">
              <span className="text-yellow-500"></span> Bạn ơi, điều gì ảnh
              hưởng đến bạn hôm nay vậy?{" "}
              <span className="text-yellow-500"></span>
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 mt-32 px-4">
          <motion.button
            className="w-96 h-96 rounded-3xl bg-gradient-to-br from-blue-400 to-blue-500 shadow-lg flex flex-col items-center justify-center text-white text-3xl font-bold p-6 cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigation}
          >
            <div className="relative w-[150px] h-[150px] mb-8">
              <Image
                src="/emoji_gif/em_bi_met.gif" // Đường dẫn tới GIF
                alt="GIF icon"
                fill
                priority
                sizes="80px"
                className="object-contain"
              />
            </div>
            Em Bị Mệt
          </motion.button>

          <motion.button
            className="w-96 h-96 rounded-3xl bg-gradient-to-br from-purple-400 to-purple-500 shadow-lg flex flex-col items-center justify-center text-white text-3xl font-bold p-6 cursor-pointer"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigation}
          >
            <div className="relative w-[150px] h-[150px] mb-8">
              <Image
                src="/emoji_gif/kien_thuc_kho_hieu.gif" // Đường dẫn tới GIF
                alt="GIF icon"
                fill
                priority
                sizes="80px"
                className="object-contain"
              />
            </div>
            Kiến Thức Khó Hiểu
          </motion.button>

          <motion.button
            className="w-96 h-96 rounded-3xl bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg flex flex-col items-center justify-center text-white text-3xl font-bold p-6 cursor-pointer text-center"
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigation}
          >
            <div className="relative w-[150px] h-[150px] mb-8">
              <Image
                src="/emoji_gif/lop_khong_tap_trung.gif" // Đường dẫn tới GIF
                alt="GIF icon"
                fill
                priority
                sizes="80px"
                className="object-contain"
              />
            </div>
            Lớp Học
            <br />
            Không Tập Trung
          </motion.button>
        </div>

        <div className="text-center text-purple-600 text-xl mt-8 mb-4">
          Đừng lo nhé! Chúng ta sẽ cùng nhau cải thiện! 💪
        </div>
      </div>
    </motion.div>
  );
}
