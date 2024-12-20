"use client";

import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; // Nhớ import useState

export default function Home() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logo, setLogo] = useState("/Logo.png");

  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  const handleClick = () => {
    router.push("/orangepicm4/trang_4");
  };

  // Hàm handleSpeak cập nhật để phát file âm thanh từ local
  const handleSpeak = (audioFile: string) => {
    try {
      const audio = new Audio(`/sounds/page3/${audioFile}`); // Đảm bảo rằng file âm thanh được lưu

      audio.onplay = () => {
        console.log("Bắt đầu phát âm thanh");
        setIsPlaying(true);
      };

      audio.onended = () => {
        console.log("Kết thúc phát âm");
        setIsPlaying(false);
      };

      audio.play().catch((playError) => {
        console.error("Lỗi play():", playError);
        setError("Không thể phát âm thanh");
      });
    } catch (error) {
      console.error("Lỗi:", error);
      setError("Có lỗi xảy ra khi phát âm thanh");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col select-none relative bg-gray-100"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "mass", stiffness: 100 }}
    >
      <div className="min-h-screen flex flex-col select-none relative bg-gray-100">
        {/* Logo góc trên bên trái */}
        <Image
          src={logo}
          alt="Logo"
          width={200}
          height={90}
          className="object-contain max-w-full max-h-full"
        />
        <div className="absolute top-32 w-full text-center text-[60px] text-red-500  pacifico-regular">
          Em à, bài tập buổi trước em đã hoàn thành rồi chứ?
        </div>

        <div className="flex flex-1 items-center justify-center text-white text-[50px] font-bold gap-16 playpen-sans-special-500">
          <div
            className="ellipse flex items-center justify-center transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={() => handleSpeak("nhất_em_rồi.mp3")} // Sử dụng tệp âm thanh 1
          >
            Em Quên Mất Rồi
          </div>
          <div
            className="ellipse flex items-center justify-center transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={() => handleSpeak("tuyet_voi_em.mp3")} // Sử dụng tệp âm thanh 2
          >
            Em Đã Hoàn Thành
          </div>
          <div
            className="ellipse flex flex-col items-center justify-center transform transition-transform duration-300 hover:scale-110 cursor-pointer"
            onClick={() => handleSpeak("ok.mp3")} // Sử dụng tệp âm thanh 3
          >
            <div>Bài Khó Quá,</div>
            <div>Em Chưa</div>
            <div>Làm Được</div>
          </div>
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
