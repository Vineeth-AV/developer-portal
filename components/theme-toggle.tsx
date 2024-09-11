// 'use client';

// import * as React from 'react';
// import { Moon, Sun } from 'lucide-react';
// import { useTheme } from 'next-themes';
// import clsx from 'clsx';

// import { Button } from '@/components/ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger
// } from '@/components/ui/dropdown-menu';
// import { Theme } from '@/types';

// export function ThemeToggle() {
//   const { theme, setTheme } = useTheme();
//   const currentTheme = theme as Theme;
//   const [isHovered, setIsHovered] = React.useState(false);

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button
//           variant="outline"
//           size="icon"
//           className="relative border-none hover:bg-zinc-100 focus-visible:border-0 focus-visible:!outline-none focus-visible:ring-transparent dark:!outline-none dark:hover:bg-darkAccent dark:focus-visible:!border-0 dark:focus-visible:!ring-0"
//           onMouseEnter={() => setIsHovered(true)}
//           onMouseLeave={() => setIsHovered(false)}
//         >
//           <Sun 
//             className={clsx(
//               "size-[1.2rem] transition-transform duration-300",
//               isHovered ? "rotate-[-90deg] scale-0" : "rotate-0 scale-100"
//             )}
//           />
//           <Moon 
//             className={clsx(
//               "absolute size-[1.2rem] transition-transform duration-300",
//               isHovered ? "rotate-0 scale-100" : "rotate-90 scale-0"
//             )}
//           />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent
//         className="!border-lightBorder !bg-white dark:!border-darkBorder dark:!bg-dark dark:!text-white"
//         align="end"
//       >
//         <DropdownMenuItem
//           className={clsx(
//             'hover:bg-zinc-100 dark:hover:bg-darkAccent',
//             currentTheme == Theme.Light && 'font-bold'
//           )}
//           onClick={() => setTheme('light')}
//         >
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           className={clsx(
//             'hover:bg-zinc-100 dark:hover:bg-darkAccent',
//             currentTheme == Theme.Dark && 'font-bold'
//           )}
//           onClick={() => setTheme('dark')}
//         >
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem
//           className={clsx(
//             'hover:bg-zinc-100 dark:hover:bg-darkAccent',
//             currentTheme == Theme.System && 'font-bold'
//           )}
//           onClick={() => setTheme('system')}
//         >
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }

'use client'

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import dynamic from 'next/dynamic';

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
        className="relative flex items-center justify-center overflow-hidden border-none w-10 h-10"
        onClick={handleClick}
      >
        {/* Icon for theme toggle */}
        {isHovered ? (
          currentTheme === 'light' ? (
            <Moon
              className={clsx(
                "absolute size-[1.2rem] transition-all duration-500 ease-in-out transform"
              )}
            />
          ) : (
            <Sun
              className={clsx(
                "absolute size-[1.2rem] transition-all duration-500 ease-in-out transform"
              )}
            />
          )
        ) : (
          currentTheme === 'light' ? (
            <Sun
              className={clsx(
                "absolute size-[1.2rem] transition-all duration-500 ease-in-out transform"
              )}
            />
          ) : (
            <Moon
              className={clsx(
                "absolute size-[1.2rem] transition-all duration-500 ease-in-out transform"
              )}
            />
          )
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
