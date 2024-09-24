'use client';

import * as React from 'react';
import { Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Ensure the component is mounted before interacting with `theme`
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    if (mounted) {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  // Ensure no rendering of dynamic content until after mount
  if (!mounted) return null;

  const isLightTheme = theme === 'light';
  const icon = isHovered
    ? isLightTheme
      ? <Moon className="size-[1.7rem]" />
      : <Image src="/icons/light_mode.svg" alt="Light Mode Icon" width={28} height={28} />
    : isLightTheme
      ? <Image src="/icons/light_mode.svg" alt="Light Mode Icon" width={28} height={28} />
      : <Moon className="size-[1.7rem]" />;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="relative flex items-center justify-center w-8 h-8 overflow-hidden rounded-full border border-gray-400"
        onClick={handleClick}
        aria-label={`Switch to ${isLightTheme ? 'dark' : 'light'} mode`}
      >
        {icon}
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
}
