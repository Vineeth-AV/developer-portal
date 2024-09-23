
export const GETTING_STARTED_BASE_URL = '/getting-started';
export const AIRLINE_NUANCES = '/airline-nuances';

export interface SideBarLink {
  title: string;
  path: string;
}

export interface SideBarCategory {
  title: string;
  links: (SideBarLink | SideBarDivider)[];
}

export interface SideBarDivider {
  title: string;
}

export function isCategory(
  source: SideBarSourceType
): source is SideBarCategory {
  return (<SideBarCategory>source).links !== undefined;
}

export function isLink(source: SideBarSourceType): source is SideBarLink {
  return (<SideBarLink>source).path !== undefined;
}

export function isDivider(source: SideBarSourceType): source is SideBarDivider {
  return (<SideBarDivider>source).title !== undefined;
}

export type SideBarSourceType = SideBarCategory | SideBarLink | SideBarDivider;
