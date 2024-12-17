"use client";
import { createContext, useState } from "react";

interface LogoContextType {
  logo: string;
  setLogo: (newLogo: string) => void;
}

export const LogoContext = createContext<LogoContextType>({
  logo: "/Logo.png",
  setLogo: () => {},
});

export const LogoProvider = ({ children }: { children: React.ReactNode }) => {
  const [logo, setLogo] = useState("/Logo.png");

  return (
    <LogoContext.Provider value={{ logo, setLogo }}>
      {children}
    </LogoContext.Provider>
  );
};
