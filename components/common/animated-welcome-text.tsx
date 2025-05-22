
"use client";

import { motion, useAnimation, type Variants } from "framer-motion";
import type React from 'react';
import { useEffect } from 'react';
import { cn } from "@/lib/utils";

interface AnimatedWelcomeTextProps {
  text: string;
  className?: string;
}

export const AnimatedWelcomeText: React.FC<AnimatedWelcomeTextProps> = ({ text, className }) => {
  const words = text.split(" ");
  const controls = useAnimation(); // Controls for word and container animation sequence

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        opacity: { duration: 0.5 }, // Container fade-in duration
        staggerChildren: 0.08, // Delay between each word animation
        delayChildren: 0.3,    // Delay before words start animating after container is visible
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, x: -20 }, // Start faded and slightly to the left
    visible: {
      opacity: 1,
      x: 0, // End in place
      transition: {
        type: "spring",
        damping: 12, 
        stiffness: 90, 
      },
    },
  };

  useEffect(() => {
    const sequence = async () => {
      // Ensure it starts from hidden, then animates to visible
      await controls.start("hidden"); 
      await controls.start("visible");
    };
    
    sequence(); // Initial animation run

    const intervalId = setInterval(sequence, 15000); // Loop every 15 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [controls]); // Added controls to dependency array as it's used in effect

  return (
    // Outer container for centering if needed, and applying base className
    <motion.div 
      className={cn("flex justify-center items-center w-full", className)}
    >
      <motion.p
        className={cn(
          "text-xl sm:text-2xl md:text-3xl font-semibold text-center leading-relaxed", // Responsive text size
          "text-sky-100", // Light sky blue color (#e0f2fe)
          // Subtle soft glow effect using text-shadow with the text color
          "[text-shadow:0_0_10px_rgba(224,242,254,0.7),_0_0_20px_rgba(224,242,254,0.3)]"
          // Or using Tailwind JIT:
          // "[text-shadow:0_0_10px_theme(colors.sky.100/0.7),_0_0_20px_theme(colors.sky.100/0.3)]"
        )}
        variants={containerVariants}
        initial="hidden" 
        animate={controls}
      >
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={wordVariants}
            className="inline-block mr-[0.25em]" // Ensures space between words
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
};

