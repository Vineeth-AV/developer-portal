'use client'

import * as React from 'react';
import { Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import Image from 'next/image'; // For optimized image loading in Next.js

import { Button } from '@/components/ui/button';
import { Theme } from '@/types';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const currentTheme = theme as Theme;
  const [isHovered, setIsHovered] = React.useState(false);

  // Handle click to toggle theme
  const handleClick = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="outline"
        size="icon"
        className="relative flex items-center justify-center overflow-hidden border-none w-8 h-8 rounded-full border border-gray-400" // Added rounded-full and border styles
        onClick={handleClick}
      >
        {/* Icon for theme toggle */}
        {isHovered ? (
          currentTheme === 'light' ? (
            <Moon
              className={clsx(
                "absolute size-[1.7rem] transition-all duration-500 ease-in-out transform rounded-full border border-gray-400" 
              )}
            />
          ) : (
            <Image
              src="/icons/light_mode.svg" // Path to your custom icon
              alt="Light Mode Icon"
              className={clsx(
                "absolute size-[1.7rem] transition-all duration-500 ease-in-out transform rounded-full border border-gray-400"
              )}
              width={28}
              height={28}
            />
          )
        ) : (
          currentTheme === 'light' ? (
            <Image
              src="/icons/light_mode.svg" // Path to your custom icon
              alt="Light Mode Icon"
              className={clsx(
                "absolute size-[1.7rem] transition-all duration-500 ease-in-out transform rounded-full border border-gray-400"
              )}
              width={28}
              height={28}
            />
          ) : (
            <Moon
              className={clsx(
                "absolute size-[1.7rem] transition-all duration-500 ease-in-out transform rounded-full border border-gray-400"
              )}
            />
          )
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
