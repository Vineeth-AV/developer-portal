'use client';

import { HomeIcon, LucideLayoutDashboard, ShieldIcon } from 'lucide-react'; // Example icons from Lucide
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
  return [
      {
        name: 'Home',
        href: '/',
        iconClass: HomeIcon,  // Add an icon class
      },
      {
        name: 'Dashboard',
        href: '/',
        iconClass: LucideLayoutDashboard,
      },
      {
        name: 'Upcoming features',
        href: '/',
        iconClass: ShieldIcon,
      },
    ].map((item) => (
    <TopNavigationItem key={item.href} name={item.name} href={item.href} icon = {item.iconClass} />
  ));
};
