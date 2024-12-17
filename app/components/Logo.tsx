import { useContext } from "react";
import Image from "next/image";
import { LogoContext } from "./LogoContext";

const Logo = () => {
  const { logo } = useContext(LogoContext);

  return (
    <div className="w-[200px] h-[90px] relative">
      <Image
        src={logo}
        alt="Logo"
        width={200}
        height={90}
        className="object-contain max-w-full max-h-full"
      />
    </div>
  );
};

export default Logo;
