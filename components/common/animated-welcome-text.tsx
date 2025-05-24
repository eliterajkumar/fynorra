"use client";

import type React from "react";
import { cn } from "@/lib/utils";

interface AnimatedWelcomeTextProps {
  text: string;
  className?: string;
}

export const AnimatedWelcomeText: React.FC<AnimatedWelcomeTextProps> = ({ text, className }) => {
  const words = text.split(" ");

  return (
    <div className={cn("flex justify-center items-center w-full", className)}>
      <p
        className={cn(
          "text-xl sm:text-2xl md:text-3xl font-semibold text-center leading-relaxed",
          "text-sky-100",
          "[text-shadow:0_0_10px_rgba(224,242,254,0.7),_0_0_20px_rgba(224,242,254,0.3)]"
        )}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block mr-[0.25em]">
            {word}
          </span>
        ))}
      </p>
    </div>
  );
};
