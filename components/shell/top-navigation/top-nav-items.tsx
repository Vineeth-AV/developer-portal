'use client';

import TopNavigationItem from './top-navigation-item';

export const TopNavigationItems = () => {
  return [
    {
      name: 'Getting Started',
      href: '/getting-started'
    },
    {
      name: 'API Reference',
      href: '/api-reference'
    },
    {
      name: 'Schema Viewer',
      href: '#',
      subMenu: [
        { name: 'v1', href: '/schemalist' },
        { name: 'v2', href: '/schemalist' }
      ]
    },
    {
      name: 'Support',
      href: 'https://verteil.freshdesk.com/support/login'
    },
    {
      name: 'Upcoming features',
      href: '/'
    },
    {
      name: 'Dashboard',
      href: '/'
    },
  ].map((item) => (
    <TopNavigationItem key={item.href} name={item.name} href={item.href} subMenu={item.subMenu} />
  ));
};
