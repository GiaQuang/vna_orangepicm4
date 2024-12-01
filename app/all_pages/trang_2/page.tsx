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

  const API_KEY =
    process.env.NEXT_PUBLIC_FPT_AI_API_KEY ||
    "tMw3l0L4OLguLTPYl7VwSUsYGjLi6qad";

  // Lấy thông tin từ localStorage khi component mount
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedSalutation = localStorage.getItem("userSalutation");

    if (storedName) setUserName(storedName);
    if (storedSalutation) setUserSalutation(storedSalutation);
  }, []);

  // Phát âm thanh khi vừa vào trang
  useEffect(() => {
    const audioTextTest = userName
      ? userSalutation === "Anh"
        ? `Hello ${userSalutation} ${userName} đẹp trai, chào mừng ${userSalutation} tới lớp`
        : userSalutation === "Chị"
        ? `Hello ${userSalutation} ${userName} xinh gái, chào mừng ${userSalutation} tới lớp`
        : `Hello ${userSalutation} ${userName}, chào mừng ${userSalutation} tới lớp`
      : "Chào bạn, chào mừng bạn tới lớp";

    if (audioTextTest) {
      const fetchAudio = async () => {
        try {
          const response = await fetch("https://api.fpt.ai/hmi/tts/v5", {
            method: "POST",
            headers: {
              "api-key": API_KEY,
              "Content-Type": "text/plain",
              voice: "banmai",
              speed: "-1",
            },
            body: audioTextTest,
          });

          const data = await response.json();
          if (data.async) {
            const audio = new Audio(data.async);
            audio.play();
          } else {
            console.error("Không nhận được URL âm thanh từ API");
          }
        } catch (error) {
          console.error("Lỗi gọi API FPT.AI:", error);
        }
      };

      fetchAudio();
    }
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
      router.push("/all_pages/trang_3");
    }, 1000);
  };

  const greetingText = userName
    ? `${userName} à, chúc ${userSalutation} có một buổi học vui vẻ và bổ ích!`
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
        <div className="absolute top-4 left-4">
          <Image src="/Logo.png" alt="Logo" width={200} height={200} />
        </div>

        <div className="absolute top-32 w-full text-center text-[60px] text-red-500 pacifico-regular">
          {greetingText}
          <br />
          <span>Hiện tại {userSalutation} cảm thấy thế nào?</span>
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
