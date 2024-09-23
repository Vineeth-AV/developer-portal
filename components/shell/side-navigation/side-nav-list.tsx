'use client';
import Link from 'next/link';
import clsx from 'clsx';
import { useState, useCallback } from 'react';
import { Divider } from '@/components/divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {
  SideBarDivider,
  SideBarLink,
  SideBarSourceType,
  isCategory,
  isLink
} from 'types';

type SideNavListProps = {
  data: SideBarSourceType;
  path: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  level?: number;
  expandedItems?: Record<string, boolean>; // Optional prop for expanded items
  onChildToggle?: (id: string) => void; // Optional prop for child toggle
};

export const SideNavList = ({
  data,
  path,
  onClick = () => { },
  level = 0,
  expandedItems = {}, // Default to empty object if not provided
  onChildToggle = () => {}, // Default to no-op function if not provided
}: SideNavListProps): React.ReactElement => {
  const [localExpandedItems, setLocalExpandedItems] = useState<Record<string, boolean>>({});

  // Toggle the expansion state of a category
  const handleToggle = useCallback((title: string) => {
    setLocalExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title], // Toggle current category only
    }));
  }, []);

  // Toggle the expansion state of a child item
  const handleChildToggle = useCallback((id: string) => {
    // onChildToggle(id); // Use the parent-provided toggle handler
  }, [onChildToggle]);

  if (isCategory(data)) {
    const category = data;
    const isExpandable = level >= 1 && category.links && category.links.length > 0;
    const isMainSection = level === 0;
    const showDivider = isMainSection && category.title !== 'Overview';
    const isOverview = category.title === 'Overview';

    return (
      <li key={`${category.title}-${level}`} className="list-none">
        {showDivider && <Divider margin="mb-3 ml-3 mt-3 mr-[12px]" />}
        <div
          className={clsx(
            "flex items-center justify-between text-sm pl-3 mt-[6px]",
            isMainSection ? (isOverview ? "text-black" : "font-bold text-[14px] leading-4 dark:text-white") : "font-normal dark:text-white"
          )}
          onClick={() => isExpandable && handleToggle(category.title)}
          style={{ cursor: isExpandable ? 'pointer' : 'default' }}
        >
          {category.title}
          {isExpandable && (localExpandedItems[category.title] ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />)}
        </div>

        {(localExpandedItems[category.title] || !isExpandable) && (
          <ul key={`${category.title}-list-${level}`} className={clsx(level > 0 ? 'pl-2' : '')}>
            {category.links.map((link) => (
              <SideNavList
                key={isLink(link) ? `${link.title}-${link.path}-${level}` : `${link.title}-${level}`}
                data={link}
                path={path}
                onClick={onClick}
                level={level + 1}
                expandedItems={expandedItems} // Pass the expanded items state down
                onChildToggle={handleChildToggle} // Pass child toggle handler down
              />
            ))}
          </ul>
        )}
      </li>
    );
  } else if (isLink(data)) {
    return ListItem(path, data, level, onClick, expandedItems, handleChildToggle);
  } else {
    return (
      <li key={`${data.title}-${level}`} className="mr-0 py-2 text-sm uppercase text-black">
        <h2 className="my-2 text-sm font-bold dark:text-white">{data.title}</h2>
      </li>
    );
  }
};

// ListItem to handle links, without affecting the parent expansion state
const ListItem = (
  path: string,
  link: SideBarLink | SideBarDivider,
  level: number,
  onClick: React.MouseEventHandler<HTMLAnchorElement> = () => {},
  expandedItems: Record<string, boolean>,
  handleChildToggle: (id: string) => void
): React.ReactElement => {
  const leftPadding = 'ml-0';
  const extraPaddingClass = level > 1 ? 'pl-2' : '';

  if (isLink(link)) {
    const isCurrentPage = path === link.path.replace(/\/$/, '');
    return (
      <li key={`${link.title}-${link.path}`} className={clsx('flex', extraPaddingClass)}>
        <Link
          href={link.path}
          className={clsx(
            `py-[6px] pl-3 pr-3 text-sm no-underline ${leftPadding} dark:text-[#394147]`,
            isCurrentPage ? 'font-medium text-primary dark:text-white' : '',
            'focus:outline-none focus:ring-0',
            'text-inherit'
          )}
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent category from toggling its expanded state
            handleChildToggle(link.title); // Toggle child item if necessary
            onClick(e); // Call any additional click handler logic if necessary
          }}
          style={{
            color: isCurrentPage ? '#0082CD' : 'inherit',
            border: 'none',
            transition: 'color 0.3s ease',
          }}
        >
          <span
            style={{
              color: isCurrentPage ? '#0082CD' : 'inherit',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#071219')}
            onMouseOut={(e) => (e.currentTarget.style.color = isCurrentPage ? '#0082CD' : 'inherit')}
          >
            {link.title}
          </span>
        </Link>
      </li>
    );
  } else {
    return (
      <li key={`${link.title}-${path}`} className={clsx('my-2 pl-0 pr-2', leftPadding, extraPaddingClass)}>
        <h2 className="text-xs font-semibold uppercase text-slate-800 underline decoration-lightBorder underline-offset-[10px] dark:text-white dark:decoration-darkBorder">
          {link.title}
        </h2>
      </li>
    );
  }
};

