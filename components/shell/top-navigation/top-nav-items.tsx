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
      name: 'Schema List',
      href: '/schemalist'
    },
    {
      name: 'Schema Viewer',
      href: '/schema'
    }
  ].map((item) => (
    <TopNavigationItem key={item.href} name={item.name} href={item.href} />
  ));
};
