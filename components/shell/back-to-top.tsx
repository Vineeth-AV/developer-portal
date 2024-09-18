'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-regular-svg-icons';
import Image from 'next/image';

export const BackToTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (scrollPosition > 100) {
    return (
      <button
        className="my-4 flex animate-fade-in-up flex-row items-center pl-[2px] text-xs font-semibold uppercase  dark:text-white"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
         <Image
            src={'/icons/backtotop.svg'}
            alt={`backtotop icon`}
            width={80}
            height={80}
           />

       
      </button>
    );
  } else {
    return null;
  }
};
