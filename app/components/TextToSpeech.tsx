import React, { useState } from "react";

interface TextToSpeechProps {
  text: string;
  children?: React.ReactNode;
  className?: string;
  onPlay?: () => void;
  onStop?: () => void;
}

export const TextToSpeech: React.FC<TextToSpeechProps> = ({
  text,
  children,
  className = "ellipse flex items-center justify-center cursor-pointer",
  onPlay,
  onStop,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSpeak = async () => {
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
          "Content-Type": "text/plain",
          voice: "banmai",
          speed: "-1",
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
          onPlay && onPlay();
        };

        audio.onended = () => {
          console.log("Kết thúc phát âm");
          setIsPlaying(false);
          onStop && onStop();
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
    <div
      className={`${className} ${isPlaying ? "" : "opacity-90"}`}
      onClick={handleSpeak}
    >
      {children}
      {error && <div className="text-red-500 absolute bottom-0">{error}</div>}
    </div>
  );
};

export default TextToSpeech;
