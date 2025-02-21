// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// export default function Trang6() {
//   const [userName, setUserName] = useState("");
//   const [userSalutation, setUserSalutation] = useState("");
//   const [countdown, setCountdown] = useState(10);
//   const [logo, setLogo] = useState("/Logo.png");

//   useEffect(() => {
//     const storedLogo = localStorage.getItem("logo");
//     if (storedLogo) {
//       setLogo(storedLogo);
//     }
//   }, []);

//   useEffect(() => {
//     // Mảng màu sắc cho các hình bóng
//     const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
//     const numBalls = 50;
//     const balls = [];

//     // Tạo các hình bóng trên trang
//     for (let i = 0; i < numBalls; i++) {
//       const ball = document.createElement("div");
//       ball.classList.add("ball");
//       ball.style.background = colors[Math.floor(Math.random() * colors.length)];
//       ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
//       ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
//       ball.style.transform = `scale(${Math.random()})`;
//       ball.style.width = `${Math.random() + 0.5}em`;
//       ball.style.height = ball.style.width;

//       balls.push(ball);
//       document.body.append(ball);
//     }

//     balls.forEach((el, i) => {
//       const to = {
//         x: Math.random() * (i % 2 === 0 ? -11 : 11),
//         y: Math.random() * 12,
//       };

//       let anim = el.animate(
//         [
//           { transform: "translate(0, 0)" },
//           { transform: `translate(${to.x}rem, ${to.y}rem)` },
//         ],
//         {
//           duration: (Math.random() + 1) * 2000,
//           direction: "alternate",
//           fill: "both",
//           iterations: Infinity,
//           easing: "ease-in-out",
//         }
//       );
//     });

//     // Lấy dữ liệu từ localStorage
//     const storedName = localStorage.getItem("userName");
//     const storedSalutation = localStorage.getItem("userSalutation");
//     if (storedName) {
//       setUserName(storedName);
//     }
//     if (storedSalutation) {
//       setUserSalutation(storedSalutation);
//     }

//     // Đếm ngược thời gian
//     const interval = setInterval(() => {
//       setCountdown((prev) => {
//         if (prev === 1) {
//           clearInterval(interval);
//           // Chuyển trang sau khi đếm ngược kết thúc
//           window.location.href = "ket_thuc_hoc";
//         }
//         return prev - 1;
//       });
//     }, 1000); // Đếm ngược mỗi giây

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <motion.div
//       className="min-h-screen flex flex-col select-none relative bg-gray-100"
//       initial={{ y: "-100%" }}
//       animate={{ y: 0 }}
//       exit={{ y: "100%" }}
//       transition={{ type: "mass", stiffness: 100 }}
//     >
//       <div className="absolute top-4 left-4">
//         <Image
//           src={logo}
//           alt="Logo"
//           width={200}
//           height={90}
//           className="object-contain max-w-full max-h-full"
//         />
//       </div>

//       <div className="flex flex-col items-center justify-center mt-72">
//         <div className="text-[200px] text-red-500 bonheur-royale-regular">
//           Cảm ơn,{" "}
//           <span className="font-bold text-blue-500 ml-2">
//             {userName.charAt(0).toUpperCase() + userName.slice(1)}!
//           </span>
//         </div>

//         {/* Hẹn gặp lại */}
//         <div className="text-[40px] text-gray-700 itim-regular mb-8">
//           Hẹn Gặp Lại{" "}
//           {userSalutation.charAt(0).toUpperCase() + userSalutation.slice(1)} Vào
//           Buổi Học Tiếp Theo!
//         </div>

//         <div className="flex-grow"></div>
//       </div>

//       {/* Thông báo đếm ngược ở cuối trang */}
//       <div className="text-xl text-gray-300 absolute bottom-0 left-0 right-0 text-center mb-2">
//         <div className="flex flex-col items-center justify-center">
//           <button
//             className="mb-2 px-6 py-3 bg-white text-gray-500 text-lg rounded-lg shadow-md hover:bg-gray-200 transition-all playpen-sans-special-500"
//             onClick={() => {
//               window.location.href = "ket_thuc_hoc";
//             }}
//           >
//             Trang Chủ
//           </button>
//         </div>
//         Chuyển về trang chủ sau: {countdown}s
//       </div>
//     </motion.div>
//   );
// }
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    // Create floating particles
    const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];
    const numBalls = 30;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
      const ball = document.createElement("div");
      ball.classList.add("ball");
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
      ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
      ball.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
      ball.style.width = `${Math.random() * 0.5 + 0.5}em`;
      ball.style.height = ball.style.width;
      ball.style.opacity = "0.6";
      ball.style.borderRadius = "50%";

      balls.push(ball);
      document.body.append(ball);
    }

    balls.forEach((el, i) => {
      const to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12,
      };

      el.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${to.x}rem, ${to.y}rem)` },
        ],
        {
          duration: (Math.random() + 1) * 3000,
          direction: "alternate",
          fill: "both",
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
    });

    const storedName = localStorage.getItem("userName");
    const storedSalutation = localStorage.getItem("userSalutation");
    if (storedName) setUserName(storedName);
    if (storedSalutation) setUserSalutation(storedSalutation);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          window.location.href = "ket_thuc_hoc";
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      balls.forEach((ball) => ball.remove());
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="relative w-[1280px] h-[800px] mx-auto flex flex-col select-none bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo */}
        <motion.div
          className="absolute top-4 left-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={67}
            className="object-contain max-w-full max-h-full hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center mt-36 px-4">
          <motion.div
            className="text-[150px] text-red-500 bonheur-royale-regular text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          >
            Cảm ơn,{" "}
            <span className="font-bold text-blue-500 ml-2 inline-block hover:scale-105 transition-transform">
              {userName.charAt(0).toUpperCase() + userName.slice(1)}!
            </span>
          </motion.div>

          <motion.div
            className="text-[40px] text-gray-700 itim-regular mb-8 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Hẹn Gặp Lại{" "}
            <span className="text-blue-600">
              {userSalutation.charAt(0).toUpperCase() + userSalutation.slice(1)}
            </span>{" "}
            Vào Buổi Học Tiếp Theo!
          </motion.div>
        </div>

        {/* Footer - Fixed position */}
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-[400px] text-center backdrop-blur-sm py-4 px-6">
          <div className="flex flex-col items-center justify-center">
            <button
              className="mb-3 px-8 py-3 bg-blue-500 text-white text-lg rounded-full shadow-lg hover:bg-blue-600 transition-all playpen-sans-special-500 transform hover:scale-105"
              onClick={() => {
                window.location.href = "ket_thuc_hoc";
              }}
            >
              Trang Chủ
            </button>
            <div className="text-xl text-gray-600">
              Chuyển về trang chủ sau:{" "}
              <span className="font-bold">{countdown}s</span>
            </div>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
