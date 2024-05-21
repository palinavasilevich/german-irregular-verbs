"use client";

import { useCallback, useEffect, useState } from "react";
import ThemeSwitcher from "@/components/themeSwitcher";
import Logo from "../logo";
import Navbar from "../navbar";
import MobileNavbar from "../navbar/mobileNavbar";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const scroll = window.scrollY;
    scroll <= 50 ? setIsVisible(true) : setIsVisible(false);
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header
      className={`${isVisible && " bg-white shadow-lg dark:bg-accent"}
      py-4  sticky top-0 z-30 transition-all"}`}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-x-6">
            <Navbar
              containerStyles="hidden xl:flex gap-x-8 items-center"
              linkStyles="relative hover:text-primary transition-all"
              underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
            />
            <ThemeSwitcher />
            <div className="xl:hidden">
              <MobileNavbar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
