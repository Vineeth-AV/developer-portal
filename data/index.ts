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

export const baseUrls = [
  GETTING_STARTED_BASE_URL,
  AIRLINE_NUANCES,
  UPCOMING_FEATURES,
];

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
