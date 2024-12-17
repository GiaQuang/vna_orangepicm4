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
  return (
    <motion.div
      className="min-h-screen flex flex-col select-none relative bg-gray-100"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "mass", stiffness: 100 }}
    >
      <div className="min-h-screen flex flex-col select-none relative bg-gray-100">
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
        <div className="flex flex-1 items-center justify-center text-red-500 text-center text-[60px] pacifico-regular">
          Điều gì làm ảnh hưởng đến em trong buổi học hôm nay thế nhỉ?
        </div>
        <div className="flex flex-1 items-start justify-center text-white text-[50px] font-bold gap-16 playpen-sans-special-500">
          <div
            className="ellipse flex items-center justify-center cursor-pointer"
            onClick={() => {
              window.location.href = "trang_6";
            }}
          >
            Em Bị Mệt
          </div>
          <div
            className="ellipse flex items-center justify-center cursor-pointer"
            onClick={() => {
              window.location.href = "trang_6";
            }}
          >
            Kiến Thức Khó Hiểu
          </div>
          <div
            className="ellipse flex flex-col items-center justify-center cursor-pointer"
            onClick={() => {
              window.location.href = "trang_6";
            }}
          >
            <div>Lớp Học Không</div>
            <div>Tập Trung</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
