
// 'use client';

// import Link from 'next/link';
// import clsx from 'clsx';
// import { usePathname } from 'next/navigation';

// type TopNavigationItemProps = {
//   name: string;
//   href: string;
//   subMenu?: { name: string; href: string }[]; // Optional submenu items
// };

// const TopNavigationItem = ({ name, href, subMenu }: TopNavigationItemProps) => {
//   const path = usePathname();
//   const prefetch = href.startsWith('http') ? false : undefined;
//   const baseClassName =
//     'py-4 px-0 overflow-hidden font-semibold whitespace-nowrap font-medium dark:text-[rgba(255,255,255,0.6)] hover:text-zinc-900 dark:hover:text-white';
//   const activeClassName =
//     'text-primary underline decoration-1 underline-offset-[0 rem] opacity-100 dark:text-white hover:!text-primary dark:hover:!text-white';
//   const isActive = isActivePath(path, href);
//   const linkClassName = clsx(baseClassName, isActive && activeClassName);

//   return (
//     <li key={href} className="relative group">
//       <Link href={href} className={linkClassName} prefetch={prefetch}>
//         {name}
//       </Link>
//       {subMenu && (
//         <ul className="absolute left-0 mt-2 flex space-x-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           {subMenu.map((item) => (
//             <li key={item.href} className="hover:bg-gray-100 dark:hover:bg-gray-700">
//               <Link href={item.href} className="block py-2 px-4 text-gray-900 dark:text-gray-100">
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// };

// function isActivePath(path: string, href: string): boolean {
//   return (
//     path === href ||
//     path.startsWith(`${href}/`)
//   );
// }

// export default TopNavigationItem;

////////////////////////////////////////////////////
// 'use client';

// import Link from 'next/link';
// import clsx from 'clsx';
// import { usePathname } from 'next/navigation';
// import { ForwardRefExoticComponent, SVGProps } from 'react'; // Import correct types

// type IconType = ForwardRefExoticComponent<SVGProps<SVGSVGElement> & { title?: string }>;

// // Updated Props to accept icon as a component
// type TopNavigationItemProps = {
//   name: string;
//   href: string;
//   icon?: IconType; // Accept icon as a ForwardRefExoticComponent
//   subMenu?: { name: string; href: string }[]; // Optional submenu items
// };

// const TopNavigationItem = ({ name, href, icon: Icon, subMenu }: TopNavigationItemProps) => {
//   const path = usePathname();
//   const prefetch = href.startsWith('http') ? false : undefined;
//   const baseClassName =
//     'py-4 px-0 overflow-hidden font-semibold whitespace-nowrap font-medium dark:text-[rgba(255,255,255,0.6)] hover:text-zinc-900 dark:hover:text-white';
//   const activeClassName =
//     'text-primary underline decoration-1 underline-offset-[0rem] opacity-100 dark:text-white hover:!text-primary dark:hover:!text-white';
//   const isActive = isActivePath(path, href);
//   const linkClassName = clsx(baseClassName, isActive && activeClassName);

//   return (
//     <li key={href} className="relative group">
//       <Link href={href} className={linkClassName} prefetch={prefetch}>
//         {Icon && <Icon className="mr-2 w-5 h-5" />} {/* Render the icon if provided */}
//         {name}
//       </Link>
//       {subMenu && (
//         <ul className="absolute left-0 mt-2 flex space-x-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           {subMenu.map((item) => (
//             <li key={item.href} className="hover:bg-gray-100 dark:hover:bg-gray-700">
//               <Link href={item.href} className="block py-2 px-4 text-gray-900 dark:text-gray-100">
//                 {item.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </li>
//   );
// };

// function isActivePath(path: string, href: string): boolean {
//   return path === href || path.startsWith(`${href}/`);
// }

// export default TopNavigationItem;

////////////////////////////////////////////////////////
// 'use client';

// import Link from 'next/link';
// import clsx from 'clsx';
// import { usePathname } from 'next/navigation';

// type TopNavigationItemProps = {
//   name: string;
//   href: string;
// };

// const TopNavigationItem = ({ name, href }: TopNavigationItemProps) => {
//   const path = usePathname();
//   const baseClassName =
//     'py-1 px-1 overflow-hidden font-semibold whitespace-nowrap font-medium dark:text-[rgba(255,255,255,0.6)] hover:text-zinc-900 dark:hover:text-white';
//   const activeClassName =
//     'text-primary underline decoration-2 underline-offset-[0.0rem] opacity-100 dark:text-white hover:!text-primary dark:hover:!text-white';
//   const isActive = isActivePath(path, href);
//   const linkClassName = clsx(baseClassName, isActive && activeClassName);

//   return (
//     <li>
//       <Link href={href} className={linkClassName}>
//         {name}
//       </Link>
//     </li>
//   );
// };

// function isActivePath(path: string, href: string): boolean {
//   return (
//     path === href ||
//     path.startsWith(`${href}/`)
//   );
// }

// export default TopNavigationItem;
'use client';

import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

type TopNavigationItemProps = {
  name: string;
  href: string;
  iconSrc?: string;
  subMenu?: { name: string; href: string }[];
  openInNewWindow?: boolean;
  showPipe?: boolean;
};

const TopNavigationItem = ({ name, href, iconSrc, subMenu, openInNewWindow, showPipe }: TopNavigationItemProps) => {
  const path = usePathname();
  const prefetch = href.startsWith('http') ? false : undefined;
  const isActive = isActivePath(path, href);

  // Define items that should not have underline
  const noUnderlineItems = ['Home', 'Dashboard', 'Upcoming Features'];

  // Base classes for the link
  const baseClassName =
    'py-4 px-0 pb-4 overflow-hidden font-[normal 600] whitespace-nowrap font-normal dark:text-[rgba(255,255,255,0.6)] hover:text-zinc-900 dark:hover:text-white';

  // Only apply underline if the item is not in the noUnderlineItems list
  const activeClassName = !noUnderlineItems.includes(name)
    ? 'underline decoration-2 underline-offset-[.3rem] opacity-100 text-primary dark:text-white hover:!text-primary dark:hover:!text-white'
    : 'text-primary dark:text-white hover:!text-primary dark:hover:!text-white'; // No underline for specified items

  const linkClassName = clsx(baseClassName, isActive && activeClassName);

  // Icon color class (fill #0B73B0 when active)
  const iconClassName = clsx('mr-2', isActive ? 'fill-[#0B73B0] dark:fill-white' : 'fill-current');

  return (
    <li key={href} className="relative group flex items-center">
      <Link
        href={href}
        className={`${linkClassName} flex items-center`}
        prefetch={prefetch}
        target={openInNewWindow ? "_blank" : undefined}
        rel={openInNewWindow ? "noopener noreferrer" : undefined}
      >
        {iconSrc && (
          <Image
            src={iconSrc}
            alt={`${name} icon`}
            width={16}
            height={16}
            className={iconClassName} // Apply dynamic class to change icon color
          />
        )}
        <span>{name}</span>
      </Link>
      {showPipe && <span className="mx-2 text-gray-500">|</span>} {/* Pipe Separator */}
      
      {subMenu && (
        <ul className="absolute left-0 mt-2 flex space-x-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {subMenu.map((item) => (
            <li key={item.href} className="hover:bg-gray-100 dark:hover:bg-gray-700">
              <Link href={item.href} className="block py-2 px-4 text-gray-900 dark:text-gray-100">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

function isActivePath(path: string, href: string): boolean {
  return path === href || path.startsWith(`${href}/`);
}

export default TopNavigationItem;
