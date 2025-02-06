"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [logo, setLogo] = useState("/Logo.png");

  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  // Tự động về chuyển trang chủ sau 10 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/orangepicm4/trang_1");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div
      className="min-h-screen flex flex-col select-none relative bg-gradient-to-b from-blue-200 via-purple-100 to-pink-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center relative">
        {/* Logo */}
        <div className="absolute top-4 left-4">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={90}
            className="object-contain"
          />
        </div>

        {/* Main Message */}
        <motion.div
          className="bg-white rounded-2xl py-8 px-10 shadow-lg mx-4 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-purple-600 font-bold leading-relaxed pacifico-regular">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-block text-yellow-500"
            >
              ✨
            </motion.span>{" "}
            Cảm ơn bạn, hãy vào lớp và bắt đầu buổi học hôm nay nào!{" "}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="inline-block text-yellow-500"
            >
              ✨
            </motion.span>
          </h1>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute bottom-10 text-6xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          🎉
        </motion.div>
      </div>
    </motion.div>
  );
}
