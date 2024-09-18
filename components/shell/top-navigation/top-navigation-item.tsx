import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

type TopNavigationItemProps = {
  name: string;
  href: string;
  iconSrc?: string; // Default icon
  iconActiveSrc?: string; // Active icon
  subMenu?: { name: string; href: string }[];
  openInNewWindow?: boolean;
  showPipe?: boolean;
  isSupportItem?: boolean; // Add flag to identify the "Support" item
};

const TopNavigationItem = ({
  name,
  href,
  iconSrc,
  iconActiveSrc,
  subMenu,
  openInNewWindow,
  showPipe,
  isSupportItem,
}: TopNavigationItemProps) => {
  const path = usePathname();
  const prefetch = href.startsWith('http') ? false : undefined;
  const isActive = isActivePath(path, href);

  // Define items that should not have underline
  const noUnderlineItems = ['Home', 'Dashboard', 'Upcoming Features'];

  // Base classes for the link
  const baseClassName =
    'py-4 pb-4 overflow-hidden font-[normal 600] whitespace-nowrap font-normal dark:text-[rgba(255,255,255,0.6)] hover:text-zinc-900 dark:hover:text-white';

  // Only apply underline if the item is not in the noUnderlineItems list
  const activeClassName = !noUnderlineItems.includes(name)
    ? 'underline decoration-2 underline-offset-[.7rem] opacity-100 text-primary dark:text-white hover:!text-primary dark:hover:!text-white'
    : 'text-primary dark:text-white hover:!text-primary dark:hover:!text-white'; // No underline for specified items
 
  // If the item is the "Support" item, use blue color and add a share icon
  const supportClassName = isSupportItem ? 'text-[#0B73B0] hover:text-[#0B73B0]' : '';

  return (
    <li key={href} className="relative group flex items-center">
      <Link
        href={href}
        className={`${clsx(baseClassName, isActive && activeClassName, supportClassName)} flex items-center`}
        prefetch={prefetch}
        target={openInNewWindow ? "_blank" : undefined}
        rel={openInNewWindow ? "noopener noreferrer" : undefined}
      >
        {/* Add the share icon for the "Support" menu */}
        {isSupportItem && (
          <Image
            src="/icons/support.svg" // Path to the share icon
            alt="Share icon"
            width={12}
            height={12}
            className="mr-2" // Space between the icon and text
          />
        )}
        
        {/* Show different icons based on the active state */}
        {iconSrc && iconActiveSrc && (
          <Image
            src={isActive ? iconActiveSrc : iconSrc}
            alt={`${name} icon`}
            width={16}
            height={16}
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
