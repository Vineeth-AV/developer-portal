import contentMap from "./contentMap.json";

import {
  SideBarSourceType,
  isCategory,
  isLink,
  GETTING_STARTED_BASE_URL,
  SideBarLink,
  AIRLINE_NUANCES,
  UPCOMING_FEATURES,
} from "../types";
import { useEffect, useState } from "react";
import { resourceLimits } from "worker_threads";

export const baseUrls = [
  GETTING_STARTED_BASE_URL,
  AIRLINE_NUANCES,
  UPCOMING_FEATURES,
];

interface LinkItem {
  title: string;
  path?: string;
  bold?: boolean;
  links?: LinkItem[];
}

interface FlatLinkItem {
  title: string;
  path: string;
}

// Recursively flatten the hierarchical structure
const flattenLinks = (data: LinkItem[]): FlatLinkItem[] => {
  const result: FlatLinkItem[] = [];

  const traverse = (items: LinkItem[]) => {
    items.forEach((item) => {
      console.log('currentIndex1 item'+ item)
      if (item.path) {
        console.log('currentIndex1 item.path'+ item.path)
        result.push({ title: item.title, path: item.path });
      }
      if (item.links) {
        console.log('currentIndex1 item.links'+ item.links)
        traverse(item.links);
      }
    });
  };

  traverse(data);
  console.log('currentIndex1 item.result'+ result)

  return result;
};

// Function to find previous and next links based on current path
const findPrevNextPaths = (data: LinkItem[], currentPath: string) => {
  const flattenedLinks = flattenLinks(data);
  console.log('currentIndex1 flattenedLinks'+ flattenedLinks)
  console.log('currentIndex1 flattenedLinks path'+ flattenedLinks.map((item) => 
    item.path))
  console.log('currentIndex1 flattenedLinks current path'+ currentPath)
  const currentIndex = flattenedLinks.findIndex((item) => 
    item.path === '/'+currentPath+'/');
  console.log('currentIndex1'+ currentIndex)
  if (currentIndex === -1) {
    return { previous: undefined, next: undefined };
  }

  const previous = flattenedLinks[currentIndex - 1];
  const next = flattenedLinks[currentIndex + 1];

  return {
    previous: previous ? previous : undefined,
    next: next ? next : undefined,
  };
};

export const SidebarNavigation = (currentPath: string) => {
  const contentMaps = contentMap.getting_started; // Adjust based on your JSON structure
   // Find the previous and next paths based on the current path
  return findPrevNextPaths(contentMaps, currentPath);
};

export const flattenSideBarData = (
  sideBarData: SideBarSourceType[]
): SideBarSourceType[] => {
  return sideBarData.flatMap((item) => {
    if (isCategory(item)) {
      return item.links.flatMap((subItem) => {
        if (isCategory(subItem)) {
          return subItem.links.filter((link): link is SideBarLink =>
            isLink(link)
          );
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
          return subItem.links.filter((link): link is SideBarLink =>
            isLink(link)
          );
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
      return "Getting Started";
    case AIRLINE_NUANCES:
      return "Airline Naunces";
    case UPCOMING_FEATURES:
      return "Upcoming Featues";
    default:
      return "";
  }
};

export const sideBarData = (baseUrl: string): SideBarSourceType[] => {
  switch (baseUrl) {
    case GETTING_STARTED_BASE_URL:
      return contentMap["getting_started"];
    case AIRLINE_NUANCES:
      return contentMap["airline-nuances"];
    case UPCOMING_FEATURES:
      return contentMap["upcoming-features"];
    default:
      return [];
  }
};
