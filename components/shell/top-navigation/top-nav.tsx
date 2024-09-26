import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { MobileMenu } from './mobile-menu';
import { MobileSideNav } from '@/components/shell/side-navigation/mobile-side-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import logoIcon from 'public/verteil-logo.svg';
import { TopHeaderItems, TopNavigationItems } from './top-nav-items';
import { SearchButton } from '@/components/shell/search-button';
import Profile from '../profile/profile';

export const TopNav = () => (
  <div
    className={clsx(
      'fixed top-0 z-10 flex w-full flex-col justify-center border-b border-lightBorder bg-[#F8FBFD]',
      'dark:border-darkBorder/60 dark:bg-dark'
    )}
  >
    <div
      id="main-nav"
      className="flex w-full flex-col items-center justify-center"
    >
      <div className="w-full max-w-[100rem] ">
        <div className="flex h-[3.75rem] pb-5 w-full grow  items-start justify-between text-sm">
          <Logo />


          <ul className="absolute left-60 flex flex-row text-[13px] items-start justify-start space-x-2 lg:ml-8 w-full">
            <TopHeaderItems />
          </ul>
          <div className="hidden pt-4 items-center lg:flex justify-between">
            <SearchButton className="w-full min-w-[300px]" />
            <span className="mx-4 text-gray-500">|</span>
            <div className="mx-0 flex h-[10px] items-center border-l border-lightBorder pr-2 dark:border-darkBorder">
              <Profile />
            </div>

            <div className="mx-0 flex h-[10px] items-center border-l border-lightBorder dark:border-darkBorder">
              <ThemeToggle />
            </div>
          </div>
          <MobileMenu />
        </div>
        <div className="flex w-full grow items-start justify-between text-[14px] font-semibold leading-[17.57px] lg:h-[3.25rem]">
          {/* Left-aligned navigation items */}
          <nav className="my-1 hidden lg:flex">
            <ul className="flex space-x-4">
              <TopNavigationItems align="left" />
            </ul>
          </nav>

          {/* Right-aligned support item */}
          <nav className="my-1 hidden lg:flex">
            <ul className="flex">
              <TopNavigationItems align="right" />
            </ul>
          </nav>
        </div>


      </div>
    </div>
    <MobileSideNav />
  </div>
);

const Logo = () => (
  <Link href="/getting-started">
    <div className="mb-0 ml-[0.3rem] mr-0 mt-3 flex items-center justify-start gap-1 pb-4 lg:ml-[0.0rem]">
      <Image
        src={logoIcon}
        alt="Vertel Logo"
        className="mt-2"
        priority={true}
      />
    </div>
  </Link>
);