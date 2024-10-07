
import contentMap from 'data/contentMap.json';

interface LinkItem {
  title: string;
  path?: string;
  bold?: boolean;
  links?: LinkItem[];
}

interface Breadcrumb {
  name: string;
  href: string;
}

interface FlatLinkItem {
  title: string;
  path: string;
  fullHierarchy: string[]; // Track full hierarchy for breadcrumb construction
}

// Recursively flatten the hierarchical structure, tracking parent hierarchy
const flattenLinks = (data: { [key: string]: LinkItem[] }): FlatLinkItem[] => {
  const result: FlatLinkItem[] = [];

  const traverse = (items: LinkItem[], parentPath: string, hierarchy: string[]) => {
    items.forEach((item) => {
      const currentHierarchy = [...hierarchy, item.title]; // Track hierarchy

      if (item.path) {
        const fullPath = `${parentPath}${item.path}`.replace(/\/\//g, '/'); // Normalize slashes
        result.push({ title: item.title, path: fullPath, fullHierarchy: currentHierarchy });
      }

      if (item.links) {
        traverse(item.links, `${parentPath}${item.path ? item.path : ''}`, currentHierarchy); // Pass the current hierarchy
      }
    });
  };

  // Traverse all top-level categories in the content map
  Object.values(data).forEach((category) => traverse(category, '', []));

  return result;
};

// Generate breadcrumbs for the clicked path, considering the hierarchy
export const getBreadcrumbs = (path: string): Breadcrumb[] => {
  const flatContentMap = flattenLinks(contentMap); // Flatten the content map
  if (!flatContentMap.length) return [];

  // Normalize the path by removing trailing slashes
  const normalizedPath = path.replace(/\/$/, '');

  const breadcrumbs: Breadcrumb[] = [];
  let accumulatedPath = '';

  // Split the path into segments and build breadcrumbs
  const pathSegments = normalizedPath.split('/').filter(Boolean);

  pathSegments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`;

    // Find the matched item in the flatContentMap
    const matchedItem = flatContentMap.find((item) => item.path === accumulatedPath + '/');

    if (matchedItem) {
      matchedItem.fullHierarchy.forEach((hierarchyItem, idx) => {
        // Skip the "Overview" and remove the last item
        if (hierarchyItem === 'Overview' || (index === pathSegments.length - 1 && idx === matchedItem.fullHierarchy.length - 1)) {
          return; // Skip the overview and the last clicked item
        }

        // Add breadcrumbs for the hierarchy up to the parent
        if (!breadcrumbs.some((crumb) => crumb.name === hierarchyItem)) {
          breadcrumbs.push({
            name: hierarchyItem,
            href: matchedItem.path.split('/').slice(0, idx + 2).join('/'),
          });
        }
      });
    }
  });

  return breadcrumbs;
};
