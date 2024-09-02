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

import Link from 'next/link';
import clsx from 'clsx';
import { Divider } from '@/components/divider';
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
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
};

export const SideNavList = ({
  data,
  path,
  onClick
}: SideNavListProps): React.ReactElement[] => {
  if (isCategory(data)) {
    const category = data;
    return [
      <li key={category.title} className="list-none">
        <h2 className="my-[1px] text-sm font-semibold dark:text-white">
          {category.title}
        </h2>
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
            />
          ))}
        </ul>
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
