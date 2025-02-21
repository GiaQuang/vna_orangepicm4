"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GoStarFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Home() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const router = useRouter();
  const [logo, setLogo] = useState("/Logo.png");

  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  const playSound = (soundFile) => {
    const audio = new Audio(`/sounds/page4/${soundFile}`);
    audio.play();
  };

  const handleClick = (index) => {
    setRating(index);

    if (index <= 3) {
      playSound("quack.mp3");
      toast.success("Ohhh, hãy cho mình biết nguyên nhân nhé!", {
        duration: 2000,
        position: "top-right",
        style: {
          backgroundColor: "orange",
          color: "white",
          fontSize: "1.2rem",
          borderRadius: "1rem",
        },
      });

      setTimeout(() => {
        router.push("/orangepicm4/trang_5");
      }, 3000);
    } else {
      playSound("yeah.mp3");
      toast.success("Tuyệt vời! ⭐", {
        duration: 2000,
        position: "top-right",
        style: {
          backgroundColor: "green",
          color: "white",
          fontSize: "1.2rem",
          borderRadius: "1rem",
        },
      });

      setTimeout(() => {
        router.push("/orangepicm4/trang_6");
      }, 2000);
    }
  };

  const starEmojis = ["😢", "😕", "😐", "😊", "🤩"];

  return (
    <motion.div
      className="min-h-screen flex flex-col select-none relative bg-gradient-to-b from-blue-200 via-purple-100 to-pink-100"
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
            height={67}
            className="object-contain"
          />
        </div>

        <div className="absolute top-24 w-full text-center ">
          <motion.div
            className="bg-white rounded-2xl py-6 px-8 shadow-lg inline-block mx-4 mt-20"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl text-purple-600 font-bold leading-relaxed pacifico-regular">
              <span className="text-yellow-500">🌟</span> Bạn ơi, buổi học hôm
              nay có vui, có ổn không nè?{" "}
              <span className="text-yellow-500">🌟</span>
            </h1>
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 mt-40">
          <div className="flex gap-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                className="flex flex-col items-center gap-4 cursor-pointer"
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setHoveredRating(star)}
                onHoverEnd={() => setHoveredRating(0)}
              >
                <div
                  className={`transition-all duration-300 ${
                    star <= rating || star <= hoveredRating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  style={{ fontSize: "12rem", lineHeight: "1" }} // Kích thước tùy chỉnh
                  onClick={() => handleClick(star)}
                >
                  <GoStarFill className="filter drop-shadow-lg" />
                </div>

                <div className="text-4xl transition-transform duration-300">
                  {star <= rating || star <= hoveredRating
                    ? starEmojis[star - 1]
                    : ""}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-2xl text-purple-600 font-medium mt-8">
            {hoveredRating > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white px-6 py-3 rounded-full shadow-md"
              >
                {hoveredRating <= 3 ? "Chưa được vui à?" : "Wow, vui quá há!"}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
