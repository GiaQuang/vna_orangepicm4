"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BsEmojiFrownFill,
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsEmojiHeartEyesFill,
} from "react-icons/bs";
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
        "/sounds/page2/k1_hello.mp3", // sound "Hello"
        salutation === "anh"
          ? "/sounds/page2/k2_Anh.mp3" // sound "anh" nếu là nam
          : salutation === "chị"
          ? "/sounds/page2/k2_Chi.mp3" // sound "chị" nếu là nữ
          : null,
        userName ? `/sounds/ten_hoc_sinh/${userName.toLowerCase()}.mp3` : null, // Tên nếu có
        salutation === "anh"
          ? "/sounds/page2/k4_Dep_trai.mp3" // sound "đẹp trai" cho nam
          : "/sounds/page2/k4_Xinh_gai.mp3", // sound "xinh gái"
        "/sounds/page2/k5_Chao_mung.mp3", // Chào mừng
        salutation === "anh"
          ? "/sounds/page2/k2_Anh.mp3"
          : "/sounds/page2/k2_Chi.mp3", // sound "anh" hoặc "chị"
        "/sounds/page2/k5_Toi_lop.mp3", // sound tới lớp
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

        <div className="absolute top-32 w-full text-center text-[60px] text-red-500 pacifico-regular">
          {greetingText}
          <br />
          <span>Hiện tại {userSalutation.toLowerCase()} cảm thấy thế nào?</span>
        </div>

        <div className="flex flex-1 items-center justify-between text-red-500 text-[250px] mt-40">
          <BsEmojiFrownFill
            className="ml-60 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={handleClick}
          />
          <BsEmojiNeutralFill
            className="transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={handleClick}
          />
          <BsEmojiSmileFill
            className="transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={handleClick}
          />
          <BsEmojiHeartEyesFill
            className="mr-60 transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={handleClick}
          />
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
