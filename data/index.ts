import contentMap from './contentMap.json';

import {
  SideBarSourceType,
  isCategory,
  isLink,
  GETTING_STARTED_BASE_URL,
  SideBarLink
} from '../types';

export const baseUrls = [
  GETTING_STARTED_BASE_URL
];

export const flattenSideBarData = (
  sideBarData: SideBarSourceType[]
): SideBarSourceType[] => {
  return sideBarData.flatMap((item) => {
    if (isCategory(item)) {
      return item.links.flatMap((subItem) => {
        if (isCategory(subItem)) {
          return subItem.links.filter((link): link is SideBarLink => isLink(link));
        } else if (isLink(subItem)) {
          return subItem;
        } else {
          return [];
        }
      });
    } else if (isLink(item)) {
      return item;
    } else {
      return [];
    }
  });
};

export const flattenContentMap = (
  key: string,
  contentMap: { [x: string]: SideBarSourceType[] }
): SideBarLink[] =>
  contentMap[key].flatMap((item) => {
    if (isCategory(item)) {
      return item.links.flatMap((subItem) => {
        if (isCategory(subItem)) {
          return subItem.links.filter((link): link is SideBarLink => isLink(link));
        } else if (isLink(subItem)) {
          return [subItem];
        } else {
          return [];
        }
      });
    } else if (isLink(item)) {
      return [item];
    } else {
      return [];
    }
  });

export const currentNavItem = (baseUrl: string) => {
  switch (baseUrl) {
    case GETTING_STARTED_BASE_URL:
      return 'Getting Started';
    default:
      return '';
  }
};

export const sideBarData = (baseUrl: string): SideBarSourceType[] => {
  switch (baseUrl) {
    case GETTING_STARTED_BASE_URL:
      return contentMap['getting_started'];
    default:
      return [];
  }
};


