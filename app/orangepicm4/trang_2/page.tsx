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
        salutation === "anh"
          ? "/sounds/page2/k12_hello_anh.mp3"
          : salutation === "chị"
          ? "/sounds/page2/k12_hello_chi.mp3"
          : null,
        userName ? `/sounds/ten_hoc_sinh/${userName.toLowerCase()}.mp3` : null,
        salutation === "anh"
          ? "/sounds/page2/k4_Dep_trai.mp3"
          : "/sounds/page2/k4_Xinh_gai.mp3",
        salutation === "anh"
          ? "/sounds/page2/k5_chao_mung_anh.mp3"
          : "/sounds/page2/k5_chao_mung_chi.mp3",
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
      className="min-h-screen flex flex-col select-none relative bg-gradient-to-b from-blue-100 to-purple-100"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "mass", stiffness: 100 }}
    >
      <div className="min-h-screen flex flex-col select-none relative">
        {/* Logo - Điều chỉnh kích thước nhỏ hơn */}
        <div className="absolute top-2 left-2">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={67}
            className="object-contain max-w-full max-h-full"
          />
        </div>

        {/* Text - Điều chỉnh vị trí và kích thước font */}
        <div className="absolute top-24 w-full text-center text-[40px] text-red-500 pacifico-regular">
          {greetingText}
          <br />
          <span>Hiện tại {userSalutation.toLowerCase()} cảm thấy thế nào?</span>
        </div>

        {/* Grid - Điều chỉnh margin và gap */}
        <div className="grid grid-cols-2 gap-3 mt-64 mx-auto w-4/5">
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
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg cursor-pointer transform transition-all duration-300"
              style={{ backgroundColor: mood.color }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95, transition: { duration: 0.001 } }}
              onClick={() => handleClick()}
            >
              {/* Emoji - Điều chỉnh kích thước */}
              <div className="relative w-[100px] h-[100px]">
                <Image
                  src={mood.gif}
                  alt={mood.label}
                  fill
                  priority
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              {/* Label - Điều chỉnh font size */}
              <span className="text-white text-2xl font-semibold mt-2">
                {mood.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Arrow button - Điều chỉnh kích thước và vị trí */}
        <div
          className="absolute bottom-2 right-2 text-blue-500 text-4xl cursor-pointer"
          onClick={handleClick}
        >
          <FaArrowCircleRight />
        </div>
      </div>
    </motion.div>
  );
}
