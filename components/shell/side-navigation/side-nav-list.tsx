// import Link from 'next/link';
// import clsx from 'clsx';
// import { Divider } from '@/components/divider';
// import {
//   SideBarDivider,
//   SideBarLink,
//   SideBarSourceType,
//   isCategory,
//   isLink
// } from 'types';

// type SideNavListProps = {
//   data: SideBarSourceType;
//   path: string;
//   onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
// };

// export const SideNavList = ({
//   data,
//   path,
//   onClick
// }: SideNavListProps): React.ReactElement[] => {
//   if (isCategory(data)) {
//     const category = data;
//     return [
//       <li key={category.title} className="list-none">
//         <h2 className="my-[10px] text-sm font-semibold dark:text-white">
//           {category.title}
//         </h2>
//         <ul
//           key={`${category.title}-list`}
//           className="ml-3 border-l-[1.5px] border-lightBorder pl-4 dark:border-[#3D3D3D]"
//         >
//           {category.links.map((link) => (
//             <SideNavList
//               key={link.title}
//               data={link}
//               path={path}
//               onClick={onClick}
//             />
//           ))}
//         </ul>
//       </li>
//     ];
//   } else if (isLink(data)) {
//     return [ListItem(path, data, false, onClick)];
//   } else {
//     return [
//       <li key={data.title} className="mr-4 py-2 text-sm uppercase text-black">
//         <Divider margin="mb-4 mt-4 mr-[12px]" />
//         <h2 className="my-2 text-sm font-bold dark:text-white">{data.title}</h2>
//         <Divider margin="mt-4 mr-[12px]" />
//       </li>
//     ];
//   }
// };

// const ListItem = (
//   path: string,
//   link: SideBarLink | SideBarDivider,
//   noLeftPadding = false,
//   onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined
// ): React.ReactElement => {
//   const leftPadding = noLeftPadding ? 'ml-0' : 'ml-3';

//   if (isLink(link)) {
//     const isCurrentPage = path === link.path.replace(/\/$/, '');
//     return (
//       <li key={link.path} className="flex">
//         <Link
//           href={link.path}
//           className={clsx(
//             `py-[6px] pl-0 pr-3 text-sm no-underline  ${leftPadding} dark:text-[#C4C7C5]`,
//             isCurrentPage
//               ? noLeftPadding
//                 ? 'font-medium text-primary dark:text-white'
//                 : 'ml-[-3px] border-l-[1.5px] border-primary pl-[13.5px] font-medium text-primary dark:border-white/80 dark:text-white'
//               : 'mr-1 hover:text-zinc-900 dark:hover:text-white'
//           )}
//           onClick={onClick}
//         >
//           {link.title}
//         </Link>
//       </li>
//     );
//   } else {
//     return (
//       <li key={link.title} className={clsx('my-2 pl-0 pr-2', leftPadding)}>
//         <h2 className="text-xs font-semibold uppercase text-slate-800 underline decoration-lightBorder underline-offset-[10px] dark:text-white dark:decoration-darkBorder">
//           {link.title}
//         </h2>
//       </li>
//     );
//   }
// };

/*
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
};

export const SideNavList = ({
  data,
  path,
  onClick = () => {},
  level = 0,
}: SideNavListProps): React.ReactElement => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Toggles the expansion state of a category
  const handleToggle = useCallback((title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  }, []);

  if (isCategory(data)) {
    const category = data;
    const isExpandable = level >= 1 && category.links && category.links.length > 0;
    const isMainSection = level === 0;
    const showDivider = isMainSection && category.title !== 'Overview'; // Only show divider for main sections, except 'Overview'

    return (
      <li key={`${category.title}-${level}`} className="list-none">
        {/* Conditionally add a divider above all main sections except 'Overview' }
        {showDivider && <Divider margin="mb-4 mt-4 mr-[12px]" />}
        <div
          className={clsx(
            "flex items-center justify-between my-[1px] text-sm dark:text-white",
            isMainSection ? "font-bold" : "font-normal"
          )}
          onClick={(e) => {
            if (isExpandable && e.currentTarget === e.target) {
              handleToggle(category.title);
            }
          }}
          style={{ cursor: isExpandable ? 'pointer' : 'default' }}
        >
          {category.title}

          {isExpandable && (expandedItems[category.title] ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />)}
        </div>

        {(expandedItems[category.title] || !isExpandable) && (
          <ul
            key={`${category.title}-list-${level}`}
            className={clsx(level > 0 ? 'pl-2' : '')} // Add padding for nested levels
          >
            {category.links.map((link) => (
              <SideNavList
                key={isLink(link) ? `${link.title}-${link.path}-${level}` : `${link.title}-${level}`}
                data={link}
                path={path}
                onClick={onClick}
                level={level + 1} // Increment the level for each nested item
              />
            ))}
          </ul>
        )}
      </li>
    );
  } else if (isLink(data)) {
    return ListItem(path, data, level, onClick);
  } else {
    return (
      <li key={`${data.title}-${level}`} className="mr-0 py-2 text-sm uppercase dark:text-[#071219]">
        <h2 className="my-2 text-sm font-bold dark:text-white">{data.title}</h2>
      </li>
    );
  }
};

const ListItem = (
  path: string,
  link: SideBarLink | SideBarDivider,
  level: number, // Use the level to determine padding
  onClick: React.MouseEventHandler<HTMLAnchorElement> = () => {},
): React.ReactElement => {
  const leftPadding = 'ml-0';

  // Add padding dynamically based on the nesting level
  const extraPaddingClass = level > 1 ? 'pl-2' : '';

  if (isLink(link)) {
    const isCurrentPage = path === link.path.replace(/\/$/, '');
    return (
      <li key={`${link.title}-${link.path}`} className={clsx('flex', extraPaddingClass)}>
        <Link
          href={link.path}
          className={clsx(
            `py-[6px] pl-0 pr-3 text-sm no-underline ${leftPadding} dark:text-[#394147]`,
            isCurrentPage
              ? 'border-l-[1.5px] border-primary pl-1 font-medium text-primary dark:border-white/80 dark:text-white'
              : 'hover:text-zinc-900 dark:hover:text-white'
          )}
          onClick={onClick}
        >
          {link.title}
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
*/

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
};

export const SideNavList = ({
  data,
  path,
  onClick = () => {},
  level = 0,
}: SideNavListProps): React.ReactElement => {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Toggles the expansion state of a category, ensuring other expanded items stay open
  const handleToggle = useCallback((title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title], // Toggle only the clicked category
    }));
  }, []);

  if (isCategory(data)) {
    const category = data;
    const isExpandable = level >= 1 && category.links && category.links.length > 0;
    const isMainSection = level === 0;
    const showDivider = isMainSection && category.title !== 'Overview'; // Only show divider for main sections except 'Overview'
    const isOverview = category.title === 'Overview'; // Check if the title is 'Overview'

    return (
      <li key={`${category.title}-${level}`} className="list-none">
        {/* Conditionally add a divider above all main sections except 'Overview' */}
        {showDivider && <Divider margin="mb-4 mt-4 mr-[12px]" />}
        <div
          className={clsx(
            "flex items-center justify-between my-[2px] text-sm pb-2 pl-3",
            isMainSection ? (isOverview ? "text-black" : "font-bold dark:text-white") : "font-normal dark:text-white"
          )}
          onClick={(e) => {
            if (isExpandable && e.currentTarget === e.target) {
              handleToggle(category.title); // Toggle only this category
            }
          }}
          style={{ cursor: isExpandable ? 'pointer' : 'default' }}
        >
          {category.title}

          {isExpandable && (expandedItems[category.title] ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />)}
        </div>

        {(expandedItems[category.title] || !isExpandable) && (
          <ul
            key={`${category.title}-list-${level}`}
            className={clsx(level > 0 ? 'pl-2' : '')} // Add padding for nested levels
          >
            {category.links.map((link) => (
              <SideNavList
                key={isLink(link) ? `${link.title}-${link.path}-${level}` : `${link.title}-${level}`}
                data={link}
                path={path}
                onClick={onClick}
                level={level + 1} // Increment the level for each nested item
              />
            ))}
          </ul>
        )}
      </li>
    );
  } else if (isLink(data)) {
    return ListItem(path, data, level, onClick);
  } else {
    return (
      <li key={`${data.title}-${level}`} className="mr-0 py-2 text-sm uppercase text-black">
        <h2 className="my-2 text-sm font-bold dark:text-white">{data.title}</h2>
      </li>
    );
  }
};

const ListItem = (
  path: string,
  link: SideBarLink | SideBarDivider,
  level: number, // Use the level to determine padding
  onClick: React.MouseEventHandler<HTMLAnchorElement> = () => {},
): React.ReactElement => {
  const leftPadding = 'ml-0';

  // Add padding dynamically based on the nesting level
  const extraPaddingClass = level > 1 ? 'pl-2' : '';

  if (isLink(link)) {
    const isCurrentPage = path === link.path.replace(/\/$/, '');
    return (
      <li key={`${link.title}-${link.path}`} className={clsx('flex', extraPaddingClass)}>
        <Link
          href={link.path}
          className={clsx(
            `py-[6px] pl-3 pr-3 text-sm no-underline ${leftPadding} dark:text-[#394147]`,
            isCurrentPage
              ? 'font-medium text-primary dark:text-white'
              : 'hover:text-zinc-900 dark:hover:text-white',
            'focus:outline-none focus:ring-0', // Remove default focus styling
            'text-inherit' // Ensure text color inheritance from parent
          )}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the parent category from toggling its expanded state
            onClick(e);
          }}
          style={{
            color: isCurrentPage ? '#0082CD' : 'inherit', // Set color dynamically
            border: 'none', // Remove any border styling
          }}
        >
          {link.title}
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
 