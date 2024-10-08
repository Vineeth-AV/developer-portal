'use client';

import { DocSearch } from '@docsearch/react';
import '@docsearch/css';
import style from './search.module.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
 
type Props = {
  className?: string;
};

export const SearchButton = ({ className }: Props) => {
   const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  

 
  // When docsearch is opened, DocSearch--active' is added to the body
  // we use this to detect when docsearch is opened and add our custom
  // search buttons
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.nodeName === 'BODY') {
          const target = mutation.target as HTMLElement;
          if (target.classList.contains('DocSearch--active')) {
            const container = document.querySelector('.DocSearch-Modal');
            const existingDiv = document.querySelector('.slice-mode');
            if (container && !existingDiv) {
              const myDiv = document.createElement('div');
              myDiv.className =
                'slice-mode px-[var(--docsearch-spacing)] pt-[var(--docsearch-spacing)]';
              container.prepend(myDiv);
              setPortalContainer(myDiv);
            }
          } else {
            setPortalContainer(null);
          }
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={clsx(className, style.search)} id="search">
      <DocSearch
        appId={process.env.NEXT_PUBLIC_APP_ID ?? ''}
        apiKey={process.env.NEXT_PUBLIC_SEARCH_KEY ?? ''}
        indexName=""
        insights={true}
        searchParameters={{
         }}
      />
    </div>
  );
};
