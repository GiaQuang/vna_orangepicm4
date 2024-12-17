"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [time, setTime] = useState(new Date());
  const [name, setName] = useState("");
  const [salutation, setSalutation] = useState("Anh");
  const router = useRouter();
  const [logo, setLogo] = useState("/Logo.png");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  const formattedTime = time.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = time
    .toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "ngày $1-$2-$3");

  const handleClick = () => {
    // Lưu thông tin vào localStorage
    if (name.trim()) {
      localStorage.setItem("userSalutation", salutation);
      localStorage.setItem("userName", name);
      router.push("/all_pages/trang_2");
    } else {
      alert("Vui lòng nhập tên!");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col select-none relative background"
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "mass", stiffness: 100 }}
    >
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div key={index} className="cube"></div>
      ))}
      {/* Logo góc trên bên trái */}
      {/* <div className="absolute top-4 left-4">
        <Image src="/Logo.png" alt="Logo" width={200} height={200} />
      </div> */}
      <div className="w-[200px] h-[90px] relative">
        <Image
          src={logo}
          alt="Logo"
          width={200}
          height={90}
          className="object-contain max-w-full max-h-full"
        />
      </div>

      {/* Thời gian thực ở giữa màn hình */}
      <div className="flex flex-1 items-center justify-center text-white text-center">
        <div>
          <h1 className="text-8xl font-bold">{formattedTime}</h1>
          <p className="text-6xl mt-4">{formattedDate}</p>

          {/* Form nhập xưng hô và tên */}
          <div className="mt-8 flex flex-col items-center gap-4">
            {/* Select */}
            <select
              className="text-xl border border-gray-300 rounded-md p-2 text-black"
              value={salutation}
              onChange={(e) => setSalutation(e.target.value)}
            >
              <option value="anh">Anh</option>
              <option value="chị">Chị</option>
            </select>

            {/* Input */}
            <input
              type="text"
              placeholder="Nhập tên"
              className="text-xl border border-gray-300 rounded-md p-2 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Nút với hiệu ứng trượt lên */}
      <motion.div
        className="fixed bottom-4 right-4 text-blue-500 text-5xl cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onClick={handleClick}
      >
        <FaArrowCircleDown />
      </motion.div>
    </motion.div>
  );
}
