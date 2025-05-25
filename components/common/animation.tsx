"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedWelcomeTextProps {
  text: string;
  className?: string;
}

export const AnimatedWelcomeText: React.FC<AnimatedWelcomeTextProps> = ({
  text,
  className,
}) => {
  const words = text.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => (prev ? prev + " " + words[currentIndex] : words[currentIndex]));
        setCurrentIndex((prev) => prev + 1);
      }, 600); // Speed between each word
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, words]);

  return (
    <div
      className={cn(
        "w-full flex justify-center mt-4",
        className
      )}
    >
      <p className="text-center text-lg sm:text-xl md:text-2xl font-medium text-blue-100">
        {displayedText}
        <span className="animate-pulse text-blue-200">|</span> {/* Blinking cursor */}
      </p>
    </div>
  );
};
