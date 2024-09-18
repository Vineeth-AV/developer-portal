
'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';

import { baseUrls } from 'data';
import { BackToTop } from './back-to-top';
import { Divider } from '@/components/divider';

export type AsideItem = {
  id: string;
  title: string;
  level: number;
};

export const Aside = ({
  asideItems,
  path
}: {
  asideItems: AsideItem[];
  path: string;
}) => {
  const items = asideItems.filter(
    (item) =>
      item.id &&
      (item.level === 2 || item.level === 3) &&
      item.title !== 'Next steps'
  );
  const activeId = useActiveId(items.map((item) => item.id));

  return (
    <aside
      className={clsx(
        'fixed right-0 top-[6rem] mr-0 hidden h-[calc(100vh-4rem)] w-[275px] shrink-0 dark:bg-dark xl:flex',
        items.length > 1 ? '' : ''
      )}
    >
      <nav className="h-full px-6 pb-0 pt-6"> {/* Reduced top padding */}
        {items.length > 1 && (
          <>
            <h2 className="mb-1 flex flex-row items-center text-xs font-semibold uppercase dark:text-white">
              On this page
            </h2>
            <ul className="m-0 max-h-[50vh] overflow-y-auto p-0">
              {items.map((item, index) => (
                <ListItem
                  key={`${item.id}-${index}`}
                  item={item}
                  activeId={activeId ?? ''}
                />
              ))}
            </ul>

          </>
        )}
        {/* Reduced the height and padding of this container */}
        <div
          style={{
            border: '1px solid #CBD3E1',
            height: 70, // Reduced height
            padding: '0px',
            borderRadius: '4px',
            background: '#F6FAFD'
          }}
        >
          <ul
            className="mb-5 mt-2 w-full justify-center items-center max-h-[50vh]"
            style={{ color: 'var(--primary-color)' }}
          >
            <ActionItem href={editPageUrl(path)}>
              <Image
                src="/icons/edit.svg" // Path to the share icon
                alt="Profile icon"
                width={32}
                height={32}
                className="relative ml-2 flex items-center justify-center overflow-hidden border-none size-[0.8rem]" />
              <span className="text-xs font-nomral text-[11px]">Edit this page</span>
            </ActionItem>
            <Divider margin='my-2' />
            <ActionItem href="">
            <Image
                src="/icons/github.svg" // Path to the share icon
                alt="Profile icon"
                width={32}
                height={32}
                className="relative ml-2 flex items-center justify-center overflow-hidden border-none size-[0.8rem]" />
              <span className="text-xs font-nomral text-[11px] mr-4 ">GitHub Discussions</span>
            </ActionItem>
          </ul>
        </div>
      </nav>
    </aside>

  );
};

const resolvePath = (pathName: string): string => {
  return baseUrls.some((baseUrl) => pathName == baseUrl)
    ? pathName + '/index.md'
    : pathName + '.md';
};

function useActiveId(itemIds: string[]) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let potentialId = '';
      let potentialDistance = Infinity;

      itemIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();

          // Bias towards sections entering from the bottom
          if (rect.top > 0 && rect.top < potentialDistance) {
            potentialDistance = rect.top;
            potentialId = id;
          }
        }
      });

      if (potentialId) {
        setActiveId(potentialId);
      }
    };

    // Attach the event listener
    window.addEventListener('scroll', handleScroll);

    // Initial setup
    handleScroll();

    // Clean up the listener when the hook is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [itemIds]);

  return activeId;
}

type ActionItemProps = {
  href: string;
  children: ReactNode;
};

const ActionItem = ({ href, children }: ActionItemProps) => {
  return (
    <li className="m-0 my-0 text-sm">
      <Link href={href} className=" dark:text-[rgba(255,255,255,0.8)]">
        <div className="flex items-center gap-[0.2em]">{children}</div>
      </Link>
    </li>
  );
};

type ListItemProps = {
  item: AsideItem;
  activeId: string;
};

const ListItem = ({ item, activeId }: ListItemProps) => {
  const href = `#${item.id}`;
  const leftPadding = item.level >= 3 ? '-ml-1' : '';

  return (
    <li key={item.id} className={clsx('mb-1 pr-4 text-sm', leftPadding)}>
      <Link
        href={href}
        className={clsx(
          'flex items-start text-inherit',
          activeId === item.id && 'font-semibold text-primary dark:text-white'
        )}
      >
        {item.level > 2 && (
          <FontAwesomeIcon
            icon={faMinus}
            className="mx-2 mt-[-px] h-4 w-2 shrink-0"
          />
        )}
        {item.title}
      </Link>
    </li>
  );
};

const editPageUrl = (path: string) => {
  const baseEditPath =
    '';
  let basePath = path.split('#')[0];
  basePath = resolvePath(path);
  if (!basePath.endsWith('.md')) basePath += '.md'; // ensure that basePath ends with .md

  return baseEditPath + basePath;
};
