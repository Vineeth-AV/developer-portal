'use client';

import TopNavigationItem from './top-navigation-item';

export const TopNavigationItems = () => {
  return [
    {
      name: 'Getting Started',
      href: '/getting-started',
      openInNewWindow : false
    },
    {
      name: 'API Reference',
      href: '/api-reference',
      openInNewWindow : false
    },
    {
      name: 'Schema Viewer',
      href: '#',
      openInNewWindow : false,
      subMenu: [
        { name: 'v1', href: '/schemalist' },
        { name: 'v2', href: '/schemalist' }
      ]
    },
    {
      name: 'Support',
      href: 'https://verteil.freshdesk.com/support/login',
      openInNewWindow : true
    }
      ].map((item) => (
    <TopNavigationItem key={item.href} name={item.name} href={item.href} subMenu={item.subMenu} 
    openInNewWindow = {item.openInNewWindow}/>
  ));
};

export const TopHeaderItems = () => {
  const items = [
    {
      name: 'Home',
      href: '/getting-started',
      iconSrc: '/icons/home.svg',
    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      iconSrc: '/icons/dashboard.svg',
    },
    {
      name: 'Upcoming Features',
      href: '/features',
      iconSrc: '/icons/upcoming_features.svg',
    },
  ];

  return items.map((item, index) => (
    <TopNavigationItem
      key={item.href}
      name={item.name}
      href={item.href}
      iconSrc={item.iconSrc}
      showPipe={index !== items.length - 1} // Show pipe except for the last item
    />
  ));
};