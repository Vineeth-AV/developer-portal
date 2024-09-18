
'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faMessage, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import GitHubIcon from '@mui/icons-material/GitHub';

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
        'fixed right-0 top-[5rem] mr-0 hidden h-[calc(100vh-4rem)] w-[275px] shrink-0 dark:bg-dark xl:flex',
        items.length > 1 ? '' : ''
      )}
    >
      <nav className="h-full px-8 pb-0 pt-11">
        {items.length > 1 && (
          <>
            <h2 className="mb-1 flex flex-row items-center text-xs font-semibold uppercase  dark:text-white">
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
            <Divider />
          </>
        )}
        <div style={{ border: '1px solid #CBD3E1', padding: '0px', borderRadius: '4px', background: '#F6FAFD' }}>
          <ul
            className="m-0 p-0 pl-[6px] max-h-[50vh]"
            style={{ color: 'var(--primary-color)' }}
          >
            <ActionItem href={editPageUrl(path)} >
              <FontAwesomeIcon
                icon={faPenToSquare}
                width={14}
                height={14}
                className="mr-[2px] text-[11px]"
              />
              <span className="text-xs">Edit this page</span>
            </ActionItem>
            <Divider />
            <ActionItem href="" >
              <GitHubIcon
               width={14}
                height={14}
                className="mr-[2px] text-[11px]"
              />
              <span className="text-xs">GitHub Discussions</span>
            </ActionItem>
          </ul>
        </div>

        {/* <BackToTop /> */}
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
