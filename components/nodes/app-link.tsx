'use client';

import { ReactNode, CSSProperties, useState, useEffect } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {usePath } from 'context/state';

type AppLinkProps = {
  href: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  showArrow?: boolean;
  children: ReactNode;
};

// Set of classes to apply when the link is an API link.
const apiClasses = [
  'after:ml-[3px] after:mr-[1px] after:rounded-sm after:bg-primary after:px-[2px] after:py-[1px]',
  "after:align-middle after:text-[8px] after:font-semibold after:text-white after:content-['API']",
  'dark:after:bg-primary/80'
];

// Default styles for the link.
const defaultStyle: CSSProperties = { textUnderlineOffset: '5px' };

export const AppLink = ({
  href: originalHref,
  target: target,
  className = 'font-medium text-primary hover:text-[rgb(64,131,193)]',
  style: originalStyle,
  showArrow = true,
  children
}: AppLinkProps) => {
  const path = usePath();

  const [href, setHref] = useState(originalHref);;

  useEffect(() => {
    // If the router is not ready, we can't resolve the link.

    let url = isApiLink(originalHref)
      ? resolveApiLink(originalHref)
      : resolveRelativeLink(originalHref, path);
    setHref(url);
  }, [originalHref, path, href]);

  const style = { ...defaultStyle, ...originalStyle };
  
  const prefetch =
    isExternalLink(originalHref) || isApiLink(originalHref) ? false : undefined;

  return (
    <Link
      href={href}
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      prefetch={prefetch}
      className={className}
      style={style}
    >
      <span
        className={clsx(
          isApiLink(originalHref) && apiClasses,
          isExternalLink(originalHref) &&
            showArrow &&
            'with-arrow whitespace-nowrap'
        )}
      >
        {isApiLink(originalHref) ? <code>{children}</code> : children}
      </span>

      <style jsx>{`
        .with-arrow::after {
          content: '';
          display: inline-block;
          width: 16px;
          height: 16px;
          background-image: url('/images/link_arrow.svg');
          background-repeat: no-repeat;
          background-size: cover;
          transform: scale(0.52);
          transform-origin: 55% 70%;
        }

        :global(html.dark) .with-arrow::after {
          background-image: url('/images/link_arrow_dark.svg');
        }
      `}</style>
    </Link>
  );
};

/**
 * Check if a link is external.
 * @param {string} href - The link to check.
 * @returns {boolean} - True if it's an external link, false otherwise.
 */
const isExternalLink = (href: string) =>
  href.startsWith('http://') || href.startsWith('https://');

/**
 * Determines if a link is an API link.
 * @param {string} href - The link to check.
 * @returns {boolean} - True if it's an API link, false otherwise.
 */
const isApiLink = (href: string) => {
  const supportedLanguages = ['csharp', 'rust'];
  return (
    supportedLanguages.some((lang) => href.startsWith(`${lang}:`)) &&
    href.split(':').length > 1
  );
};

/**
 * Resolves an API link to its full URL.
 * @param {string} href - The original API link.
 * @returns {string} - The resolved API link.
 */
const resolveApiLink = (href: string) => {
  const [language, ...rest] = href.split(':');
  const [module, method] = rest.join('.').split('#');
  return `${
    process.env.NEXT_PUBLIC_API_HOST
  }/api/${language}/api/${module}.html${method ? `#${method}` : ''}`;
};

/**
 * Resolve relative links to their full path.
 * @param {string} href - The original link.
 * @param {string} routerPath - The current route path.
 * @returns {string} - The resolved link.
 */
const resolveRelativeLink = (href: string, routerPath: string) => {
  if (isExternalLink(href) || href.startsWith('/')) {
    return href;
  }
  if (href.startsWith('#')) {
    return `${routerPath.split('#')[0]}${href}`;
  }
  return `${routerPath.replace(/\/[^/]+$/, '')}/${href}`;
};
