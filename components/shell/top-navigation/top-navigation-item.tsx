
'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

type TopNavigationItemProps = {
  name: string;
  href: string;
};

const TopNavigationItem = ({ name, href }: TopNavigationItemProps) => {
  const path = usePathname();
  const prefetch = href.startsWith('http') ? false : undefined;
  const baseClassName =
    'py-4 px-0 overflow-hidden font-semibold whitespace-nowrap font-medium dark:text-[rgba(255,255,255,0.6)] hover:text-zinc-900 dark:hover:text-white';
  const activeClassName =
    'text-primary underline decoration-1 underline-offset-[0 rem] opacity-100 dark:text-white hover:!text-primary dark:hover:!text-white';
  const isActive = isActivePath(path, href);
  const linkClassName = clsx(baseClassName, isActive && activeClassName);

  return (
    <li key={href}>
      <Link href={href} className={linkClassName} prefetch={prefetch}>
        {name}
      </Link>
    </li>
  );
};

function isActivePath(path: string, href: string): boolean {
  return (
    path === href ||
    path.startsWith(`${href}/`)
  );
}

export default TopNavigationItem;
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
