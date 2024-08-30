'use client';

import { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { getModeFromPath } from 'utils/modeFromPath';
 import { usePathname } from 'next/navigation';


type Props = {
  children: ReactNode;
  path: string;
};

// Contexts for the mode, platform, and path
const PathContext = createContext<string | null>(null);


export function AppWrapper({ children }: { children: ReactNode }) {
  
  const path = usePathname();

  // Update the search mode when the mode changes
  
  useEffect(() => {
    // Get the mode from the path
    const pathMode = getModeFromPath(path);

    // Get the platform and mode strings from local storage if it exists
     
    pathMode  
  }, [path]);

  

  return (
    {children}
  );
}

export const PathProvider: React.FC<{ path: string; children: ReactNode }> = ({
  children,
  path
}: Props) => {
  return <PathContext.Provider value={path}>{children}</PathContext.Provider>;
};

// Custom hook to handle observing the path
export const usePath = () => {
  const context = useContext(PathContext);
  if (!context) {
    throw new Error('usePath must be used within a PathProvider');
  }
  return context;
};

 
// Custom hook to handle component mounting
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
};

function tryParseJSON(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null;
  }
}
