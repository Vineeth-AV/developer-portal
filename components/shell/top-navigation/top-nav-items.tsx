'use client';

import React from 'react';
import TopNavigationItem from './top-navigation-item';

type TopNavigationItemsProps = {
  align: 'left' | 'right';
};

export const TopNavigationItems = ({ align }: TopNavigationItemsProps) => {
  const leftItems = [
    {
      name: 'Getting Started',
      href: '/getting-started',
      openInNewWindow: false,
    },
    {
      name: 'API Reference',
      href: '/api-reference',
      openInNewWindow: false,
    },
    {
      name: 'Schema Viewer',
      href: '#',
      openInNewWindow: false,
      subMenu: [
        { name: 'v1', href: '/schemalist' },
        { name: 'v2', href: '/schemalist' },
      ],
    },
    {
      name: 'Airline Nuances',
      href: '/get',
      openInNewWindow: false,
    }
  ];

  const supportItem = {
    name: 'Support',
    href: 'https://verteil.freshdesk.com/support/login',
    openInNewWindow: true,
  };

  if (align === 'left') {
    return (
      <>
        {leftItems.map((item) => (
          <li key={item.href}>
            <TopNavigationItem
              name={item.name}
              href={item.href}
              subMenu={item.subMenu}
              openInNewWindow={item.openInNewWindow}
            />
          </li>
        ))}
      </>
    );
  }

  if (align === 'right') {
    return (
      <li key={supportItem.href}>
        <TopNavigationItem
          name={supportItem.name}
          href={supportItem.href}
          openInNewWindow={supportItem.openInNewWindow}
          isSupportItem // Pass the flag for "Support" styling
        />
      </li>
    );
  }

  return null;
};




export const TopHeaderItems = () => {
  const items = [
    {
      name: 'Home',
      href: '/getting-started',
      iconSrc: '/icons/home.svg',
      iconActiveSrc : '/icons/home_active.svg'

    },
    {
      name: 'Dashboard',
      href: '/dashboard',
      iconSrc: '/icons/dashboard.svg',
      iconActiveSrc : '/icons/dashboard_active.svg'
    },
    {
      name: 'Upcoming Features',
      href: '/features',
      iconSrc: '/icons/upcoming_feature.svg',
      iconActiveSrc : '/icons/upcoming_feature_active.svg'
    },
  ];

  return items.map((item, index) => (
    <TopNavigationItem
      key={item.href}
      name={item.name}
      href={item.href}
      iconSrc={item.iconSrc}
      iconActiveSrc={item.iconActiveSrc}
      showPipe={index !== items.length - 1} // Show pipe except for the last item
    />
  ));
};