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
'use client'
import Link from 'next/link';
import clsx from 'clsx';
import { useState } from 'react';
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

// Expand/Collapse icons (replace with your preferred icons)
const ExpandIcon = () => <span></span>; // Example expand icon
const CollapseIcon = () => <span>➖</span>; // Example collapse icon

type SideNavListProps = {
  data: SideBarSourceType;
  path: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  level?: number; // Track the level of the menu item
};

export const SideNavList = ({
  data,
  path,
  onClick,
  level = 0, // Default to top-level menu
}: SideNavListProps): React.ReactElement[] => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleToggle = (title: string) => {
    setExpanded((prev) => ({
      ...prev,
      [title]: !prev[title], // Toggle the expanded state of the clicked item
    }));
  };

  if (isCategory(data)) {
    const category = data;

    // Check if this is a second-level category (level === 1)
    const isSecondLevel = level === 1;

    // Determine if the second-level item should be expandable
    const shouldExpand = isSecondLevel && category.links && category.links.length > 0;

    return [
      <li key={category.title} className="list-none">
        <div
          className="flex items-center justify-between my-[1px] text-sm font-semibold dark:text-white"
          onClick={shouldExpand ? () => handleToggle(category.title) : undefined}
          style={{ cursor: shouldExpand ? 'pointer' : 'default' }} // Change cursor if expandable
        >
          {category.title}
          {shouldExpand && (expanded[category.title] ? <KeyboardArrowUpIcon /> : <ExpandMoreIcon />)}
        </div>
        {(expanded[category.title] || !shouldExpand) && ( // Only show children if expanded or not expandable
          <ul
            key={`${category.title}-list`}
            className="ml-1 border-l-[.5px] border-lightBorder pl-4 dark:border-[#3D3D3D]"
          >
            {category.links.map((link) => (
              <SideNavList
                key={link.title}
                data={link}
                path={path}
                onClick={onClick}
                level={level + 1} // Increment level for children
              />
            ))}
          </ul>
        )}
      </li>
    ];
  } else if (isLink(data)) {
    return [ListItem(path, data, false, onClick)];
  } else {
    return [
      <li key={data.title} className="mr-4 py-2 text-sm uppercase text-black">
        <Divider margin="mb-4 mt-4 mr-[12px]" />
        <h2 className="my-2 text-sm font-bold dark:text-white">{data.title}</h2>
        <Divider margin="mt-4 mr-[12px]" />
      </li>
    ];
  }
};

const ListItem = (
  path: string,
  link: SideBarLink | SideBarDivider,
  noLeftPadding = false,
  onClick: React.MouseEventHandler<HTMLAnchorElement> | undefined
): React.ReactElement => {
  const leftPadding = noLeftPadding ? 'ml-0' : 'ml-1'; // Adjust padding here for better alignment

  if (isLink(link)) {
    const isCurrentPage = path === link.path.replace(/\/$/, '');
    return (
      <li key={link.path} className="flex">
        <Link
          href={link.path}
          className={clsx(
            `py-[6px] pl-0 pr-3 text-sm no-underline ${leftPadding} dark:text-[#C4C7C5]`,
            isCurrentPage
              ? noLeftPadding
                ? 'font-medium text-primary dark:text-white'
                : 'border-l-[1.5px] border-primary pl-1 font-medium text-primary dark:border-white/80 dark:text-white'
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
      <li key={link.title} className={clsx('my-2 pl-0 pr-2', leftPadding)}>
        <h2 className="text-xs font-semibold uppercase text-slate-800 underline decoration-lightBorder underline-offset-[10px] dark:text-white dark:decoration-darkBorder">
          {link.title}
        </h2>
      </li>
    );
  }
};


