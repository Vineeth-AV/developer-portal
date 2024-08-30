
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const Hero = () => {
  return (
    <div className="relative flex w-full max-w-[52rem] flex-col items-center space-y-2 border-b border-b-lightBorder py-10 dark:border-b-darkBorder dark:bg-transparent sm:mx-6 md:mx-10 lg:mx-16">
      <div className="mb-10 flex flex-col items-center gap-8">
        <div className="mx-auto flex flex-col items-center justify-center gap-5 px-6 text-center lg:gap-6">
          <div className="relative mb-4 flex aspect-square w-28 items-center justify-center rounded-full border border-lightBorder/40 bg-white/40 dark:border-darkBorder/20 dark:bg-transparent">
            <Image
              src="/images/verteil-logo-alt.svg"
              alt="Verteil Logo"
              className="relative"
              priority={true}
              fill
            />
            <div className="absolute left-1/2 top-1/2 -z-10 hidden size-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full  border border-neutral-300/40 opacity-40 dark:border-darkBorder/40 lg:block" />
            <div className="absolute left-1/2 top-1/2 -z-10 hidden size-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full  border border-neutral-300/40 opacity-40 dark:border-darkBorder/40 lg:block" />
          </div>
          <h1 className="-mb-2 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl">
            Verteil API
          </h1>
          <h2 className="max-w-lg bg-gradient-to-b from-slate-800 to-black bg-clip-text text-center text-[40px] font-[750] leading-none tracking-[-0.04em] text-transparent md:max-w-xl md:text-5xl lg:max-w-5xl lg:text-7xl">
            Documentation
          </h2>
          <p className="max-w-md text-center leading-snug text-gray-500 dark:text-slate-200 md:max-w-xl md:text-[20px] lg:max-w-screen-sm lg:text-xl">
             
          </p>
        </div>
        <div className="flex w-full max-w-md flex-col items-center gap-5 px-6">
           
           
        </div>
      </div>
    </div>
  );
};
