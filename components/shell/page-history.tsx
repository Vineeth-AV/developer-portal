
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

import { sideBarData, baseUrls, flattenSideBarData, SidebarNavigation } from 'data';
import { SideBarLink, isLink } from 'types';
import { Divider } from '@/components/divider';
import { getMarkdownContent } from '@/lib/markdown';
import React from 'react';

 
const stripTrailingSlash = (str: string) => {
  return str.endsWith('/') ? str.slice(0, -1) : str;
};

const usePageLinks = (path: string) => {
  const basePath = path.split('#')[0];
  console.log('basepath1'+basePath)
  const pathSegments = basePath.split('/');
  console.log('pathSegments1'+path)
  const baseUrl = baseUrls.find((item) => item === `/${pathSegments[1]}`) ?? '';
  const links: SideBarLink[] = flattenSideBarData(sideBarData(baseUrl)).filter(
    isLink
  );

  console.log('isLink1'+links)

  const data  = SidebarNavigation(path)
  
  const previous = data.previous
  const next = data.next
  console.log('previous1'+data.previous)
  console.log('next1'+data.next)

  return { previous, next };
};

export const PageHistory = ({ path }: { path: string }) => {
  const { previous, next } = usePageLinks(path);
  const isHome = path === '/';

  if (isHome) return null;

  return (
    <>
      <Divider />
      <div className="-mx-4 mb-8 flex flex-row items-center justify-between p-0">
        <NavLink
          direction={Direction.Left}
          path={previous?.path}
          title={previous?.title}
        />
        <NavLink
          direction={Direction.Right}
          path={next?.path}
          title={next?.title}
        />
      </div>
    </>
  );
};

const NavLink = ({
  direction,
  path,
  title
}: {
  direction: Direction;
  path?: string;
  title?: string;
}) => {
  if (!path || !title) return <div className="w-1/2"></div>;

  const isLeft = direction === Direction.Left;

  return (
    <div
      className={clsx(
        'flex w-1/2 items-start rounded-lg',
        isLeft ? 'justify-start' : 'justify-center'
      )}
    >
      <Link
        href={path}
        className="group flex flex-col p-3 text-left text-primary "
      >
        <div className="flex flex-row items-center">
          {isLeft && (
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="mr-2 mt-[21px] size-4"
            />
          )}
          <div className="flex flex-col">
            <span className="w-full text-sm font-[600] leading-normal text-slate-500 transition-colors group-hover:text-slate-800 dark:text-white/80 dark:group-hover:text-white">
              {isLeft ? 'Previous' : 'Next'}
            </span>
            <span className="grow">{title}</span>
            <div />
          </div>
          {!isLeft && (
            <FontAwesomeIcon
              icon={faChevronRight}
              className="ml-2 mt-[21px] size-4"
            />
          )}
        </div>
      </Link>
    </div>
  );
};

enum Direction {
  Left,
  Right
}

