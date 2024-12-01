"use client";

import Image from "next/image";
import { FaArrowCircleRight } from "react-icons/fa";
import { LuVolume2 } from "react-icons/lu";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Nhớ import useState

export default function Home() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    router.push("/all_pages/trang_4");
  };

  const ok_text = "Tuyệt vời em";
  const quen_text = "Nhất em rồi";
  const bai_kho_text_1 = "OK, Thầy cô sẽ giảng lại cho em";

  // Cập nhật hàm handleSpeak để nhận văn bản làm tham số
  const handleSpeak = async (text: string) => {
    const API_KEY =
      process.env.NEXT_PUBLIC_FPT_AI_API_KEY ||
      "tMw3l0L4OLguLTPYl7VwSUsYGjLi6qad";

    try {
      console.log("Bắt đầu gọi API FPT.AI");
      console.log("API Key:", API_KEY);

      const response = await fetch("https://api.fpt.ai/hmi/tts/v5", {
        method: "POST",
        headers: {
          "api-key": API_KEY,
          "Content-Type": "text/plain", // Header bắt buộc
          voice: "banmai", // Hoặc "male", "female"
          speed: "-1", // Tốc độ giọng nói (-5 đến 5)
        },
        body: text,
      });

      console.log("Trạng thái response:", response.status);

      const data = await response.json();
      console.log("Dữ liệu trả về:", data);

      if (data.async) {
        console.log("URL âm thanh:", data.async);

        const audio = new Audio(data.async);

        audio.onplay = () => {
          console.log("Bắt đầu phát âm");
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
      } else {
        console.error("Không nhận được URL âm thanh");
        setError("Không nhận được URL âm thanh từ API");
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      setError(`Lỗi: ${error.message}`);
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
        <div className="absolute top-4 left-4">
          <Image src="/Logo.png" alt="Logo" width={200} height={200} />
        </div>
        <div className="absolute top-32 w-full text-center text-[60px] text-red-500  pacifico-regular">
          Em à, bài tập buổi trước em đã hoàn thành rồi chứ?
        </div>

        <div className="flex flex-1 items-center justify-center text-white text-[50px] font-bold gap-16 playpen-sans-special-500">
          <div
            className="ellipse flex items-center justify-center cursor-pointer"
            onClick={() => handleSpeak(quen_text)}
          >
            Em Quên Mất
          </div>
          <div
            className="ellipse flex items-center justify-center cursor-pointer"
            onClick={() => handleSpeak(ok_text)}
          >
            Em Đã Hoàn Thành
          </div>
          <div
            className="ellipse flex flex-col items-center justify-center cursor-pointer"
            onClick={() => handleSpeak(bai_kho_text_1)}
          >
            <div>Bài Khó Quá,</div>
            <div>Em Chưa</div>
            <div>Làm Được</div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 text-blue-500 text-5xl cursor-pointer">
          <LuVolume2 />
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
