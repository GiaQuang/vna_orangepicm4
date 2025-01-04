"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userSalutation, setUserSalutation] = useState("");
  const [logo, setLogo] = useState("/Logo.png");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedSalutation = localStorage.getItem("userSalutation");
    const storedLogo = localStorage.getItem("logo");

    if (storedName) setUserName(storedName);
    if (storedSalutation) setUserSalutation(storedSalutation);
    if (storedLogo) setLogo(storedLogo);
  }, []);

  useEffect(() => {
    const playLocalAudio = async () => {
      if (!userSalutation) return;

      const salutation = userSalutation.toLowerCase();

      const audioFiles = [
        // "/sounds/page2/k1_hello.mp3", // sound "Hello"
        salutation === "anh"
          ? "/sounds/page2/k12_hello_anh.mp3" // sound "anh" nếu là nam
          : salutation === "chị"
          ? "/sounds/page2/k12_hello_chi.mp3" // sound "chị" nếu là nữ
          : null,
        userName ? `/sounds/ten_hoc_sinh/${userName.toLowerCase()}.mp3` : null, // Tên nếu có
        salutation === "anh"
          ? "/sounds/page2/k4_Dep_trai.mp3" // sound "đẹp trai" cho nam
          : "/sounds/page2/k4_Xinh_gai.mp3", // sound "xinh gái" cho nữ
        // "/sounds/page2/k5_Chao_mung.mp3", // Chào mừng
        salutation === "anh"
          ? "/sounds/page2/k5_chao_mung_anh.mp3"
          : "/sounds/page2/k5_chao_mung_chi.mp3", // sound chúc mừng "anh" hoặc "chị"
        // "/sounds/page2/k5_Toi_lop.mp3", // sound tới lớp
      ].filter(Boolean);

      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();

      const loadAndPlaySequentially = async (files) => {
        for (const file of files) {
          await playAudioFile(audioContext, file);
        }
      };

      const playAudioFile = async (context, file) => {
        try {
          const response = await fetch(file);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await context.decodeAudioData(arrayBuffer);
          const source = context.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(context.destination);
          source.start();
          return new Promise((resolve) => (source.onended = resolve));
        } catch (error) {
          console.error(`Error loading or playing ${file}:`, error);
        }
      };

      // Phát âm thanh liền mạch
      await loadAndPlaySequentially(audioFiles);
    };

    playLocalAudio();
  }, [userName, userSalutation]);

  const handleClick = () => {
    toast.success("Cảm ơn bạn đã phản hồi!", {
      duration: 2000,
      position: "top-right",
      style: {
        backgroundColor: "green",
        color: "white",
      },
    });

    setTimeout(() => {
      router.push("/orangepicm4/trang_3");
    }, 1000);
  };

  const greetingText = userName
    ? `${
        userName.charAt(0).toUpperCase() + userName.slice(1)
      } à, chúc ${userSalutation.toLowerCase()} có một buổi học vui vẻ và bổ ích!`
    : "Chúc bạn có một buổi học vui vẻ và bổ ích.";

  return (
    <motion.div
      className="min-h-screen flex flex-col select-none relative bg-gray-100"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "mass", stiffness: 100 }}
    >
      <div className="min-h-screen flex flex-col select-none relative bg-gray-100">
        <div className="w-[200px] h-[90px] relative">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={90}
            className="object-contain max-w-full max-h-full"
          />
        </div>

        <div className="absolute top-20 w-full text-center text-[60px] text-red-500 pacifico-regular">
          {greetingText}
          <br />
          <span>Hiện tại {userSalutation.toLowerCase()} cảm thấy thế nào?</span>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-52 mx-auto w-2/3">
          {[
            {
              gif: "/emoji_gif/sad.gif",
              label: "Bùn thối ruột",
              color: "#ff6b6b",
            },

            {
              gif: "/emoji_gif/neutral.gif",
              label: "Trầm lặng sâu sắc",
              color: "#b0bec5",
            },
            {
              gif: "/emoji_gif/smile.gif",
              label: "Tươi như hoa mùa xuân",
              color: "#40c057",
            },
            {
              gif: "/emoji_gif/happy.gif",
              label: "Yêu đời không lối thoát",
              color: "#ff4d94",
            },
          ].map((mood, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg hover:scale-110 cursor-pointer transform transition-all duration-300"
              style={{ backgroundColor: mood.color }}
              onClick={() => handleClick()}
            >
              <div className="relative w-[80px] h-[100px]">
                <Image
                  src={mood.gif}
                  alt={mood.label}
                  fill
                  priority
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <span className="text-white text-xl font-semibold mt-4">
                {mood.label}
              </span>
            </div>
          ))}
        </div>

        <div
          className="absolute bottom-4 right-4 text-blue-500 text-5xl cursor-pointer"
          onClick={handleClick}
        >
          <FaArrowCircleRight />
        </div>
      </div>
    </motion.div>
  );
}
