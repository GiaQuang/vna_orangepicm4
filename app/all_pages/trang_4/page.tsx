"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { GoStarFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Home() {
  const [rating, setRating] = useState(0);
  const router = useRouter();
  const [logo, setLogo] = useState("/Logo.png");

  useEffect(() => {
    const storedLogo = localStorage.getItem("logo");
    if (storedLogo) {
      setLogo(storedLogo);
    }
  }, []);

  const handleClick = (index) => {
    setRating(index);

    if (index <= 3) {
      toast.success("Ohhh, hãy cho ad biết nguyên nhân nhé!", {
        duration: 2000,
        position: "top-right",
        style: {
          backgroundColor: "orange",
          color: "white",
        },
      });

      setTimeout(() => {
        router.push("/all_pages/trang_5");
      }, 3000);
    } else {
      toast.success("Tuyệt vời!", {
        duration: 2000,
        position: "top-right",
        style: {
          backgroundColor: "green",
          color: "white",
        },
      });

      setTimeout(() => {
        router.push("/all_pages/trang_6"); // Chuyển trang 6 nếu chọn 5 sao
      }, 2000);
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
        <div className="absolute top-32 w-full text-center text-[60px] text-red-500 pacifico-regular ">
          Buổi Học Hôm Nay Ổn Không Em Ơi!
        </div>

        <div className="flex flex-1 items-center justify-center text-yellow-500 text-[200px] font-bold">
          <div className="flex gap-16">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`cursor-pointer transform transition-transform duration-300 
          ${star <= rating ? "text-yellow-500" : "text-gray-400"}
          hover:scale-110 group`}
                onMouseEnter={() => {
                  const starElements = document.querySelectorAll(".group");
                  starElements.forEach((el, index) => {
                    if (index < star) {
                      el.classList.add("scale-110");
                    }
                  });
                }}
                onMouseLeave={() => {
                  const starElements = document.querySelectorAll(".group");
                  starElements.forEach((el) => {
                    el.classList.remove("scale-110");
                  });
                }}
                onClick={() => handleClick(star)}
              >
                <GoStarFill />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
