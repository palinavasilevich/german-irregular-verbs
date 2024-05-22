"use client";

import { useEffect, useState } from "react";

import { ChevronUpIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    if (typeof window === "undefined") return;

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 right-1 xl:right-10 cursor-pointer">
      {isVisible && (
        <Button onClick={scrollToTop} size="icon">
          <ChevronUpIcon className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default ScrollToTop;
