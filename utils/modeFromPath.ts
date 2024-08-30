
import { baseUrls } from 'data';
 
// Utility function to get the mode from the path

export const getModeFromPath = (path: string) => {
  const pathSegments = path.split('/');
  const modeSegmentWithoutFragment = pathSegments[1].split('#')[0];
  baseUrls.find((item) => item === `/${modeSegmentWithoutFragment}`) ?? '';
};
