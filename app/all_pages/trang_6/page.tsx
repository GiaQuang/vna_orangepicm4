"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Trang6() {
  const [userName, setUserName] = useState("");
  const [userSalutation, setUserSalutation] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [logo, setLogo] = useState("/Logo.png");

  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  useEffect(() => {
    const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
    const numBalls = 50;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
      let ball = document.createElement("div");
      ball.classList.add("ball");
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
      ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
      ball.style.transform = `scale(${Math.random()})`;
      ball.style.width = `${Math.random() + 0.5}em`;
      ball.style.height = ball.style.width;

      balls.push(ball);
      document.body.append(ball);
    }

    balls.forEach((el, i) => {
      let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12,
      };

      let anim = el.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${to.x}rem, ${to.y}rem)` },
        ],
        {
          duration: (Math.random() + 1) * 2000,
          direction: "alternate",
          fill: "both",
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });

    // Lấy dữ liệu từ localStorage
    const storedName = localStorage.getItem("userName");
    const storedSalutation = localStorage.getItem("userSalutation");
    if (storedName) {
      setUserName(storedName);
    }
    if (storedSalutation) {
      setUserSalutation(storedSalutation);
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          window.location.href = "trang_1";
        }
        return prev - 1;
      });
    }, 1000); // 1 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="min-h-screen flex flex-col select-none relative bg-gray-100"
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "mass", stiffness: 100 }}
    >
      <div className="w-[200px] h-[90px] relative">
        <Image
          src={logo}
          alt="Logo"
          width={200}
          height={90}
          className="object-contain max-w-full max-h-full"
        />
      </div>

      <div className="flex flex-col items-center justify-center ">
        <div className="text-[200px] text-red-500 bonheur-royale-regular mt-68">
          Cảm ơn,{" "}
          <span className="font-bold text-blue-500 ml-2">{userName}!</span>
        </div>

        {/* Hẹn gặp lại */}
        <div className="text-[40px] text-gray-700 itim-regular mb-8">
          Hẹn Gặp Lại{" "}
          {userSalutation.charAt(0).toUpperCase() + userSalutation.slice(1)} Vào
          Buổi Học Tiếp Theo!
        </div>

        <div className="flex-grow"></div>

        <div className="flex flex-col items-center justify-center mb-8">
          <button
            className="mb-4 px-6 py-3 bg-white text-gray-500 text-lg rounded-lg shadow-md hover:bg-gray-200 transition-all playpen-sans-special-500"
            onClick={() => {
              window.location.href = "trang_1";
            }}
          >
            Trang Chủ
          </button>

          <div className="text-xl text-gray-300 ">
            Chuyển về trang chủ sau: {countdown}s
          </div>
        </div>
      </div>
    </motion.div>
  );
}
