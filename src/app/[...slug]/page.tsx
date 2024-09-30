// // pages/getting-started.tsx

// import pathModule from 'path'; // Renamed to avoid shadowing
// import Markdoc from '@markdoc/markdoc';
// import React from 'react';
// import { components } from 'markdoc/schema';
// import { getAllMarkdownFiles, getMarkdownContent } from 'lib/markdown';
// import { SideNav } from 'components';
// import { Metadata } from 'next';
// import { notFound } from 'next/navigation';

// export const dynamicParams = false;

// type Params = {
//   slug: string[];
// };

// type PageProps = {
//   params: Params;
// };

// export async function generateMetadata({
//   params
// }: PageProps): Promise<Metadata> {
//   const pagePath = '/' + params.slug.join('/');
//   const { frontmatter } = await getMarkdownContent(pagePath);
//   const title: string = frontmatter?.title ?? '';
//   const description: string = frontmatter?.description ?? '';
//   return {
//     title,
//     description,
//     twitter: {
//       title,
//       description
//     },
//     openGraph: {
//       title,
//       description,
//       images: {
//         url: '' // Ensure this is correctly set
//       }
//     }
//   };
// }

// export async function generateStaticParams() {
//   const baseUrls = [
//     'getting-started',
//     'airline-nuances',
//     'upcoming-features'
//    ];

//   const paths: { params: { slug: string[] } }[] = [];
//   for (const base of baseUrls) {
//     console.log('base:', base);
//     console.log('baseUrls:', pathModule.join('content', base));
//     const markdownFiles = await getAllMarkdownFiles(
//       pathModule.join('content', base),
//       []
//     );
//     console.log('markdownFiles:', markdownFiles);
//     for (const filePath of markdownFiles) {
//       console.log('filepath:', filePath);
//       const pathWithoutMd = filePath.replace(/\.md$/, '');
//       const splitPath = pathWithoutMd.split(pathModule.sep);

//       // Remove "index" from the slug if it's the last element
//       if (splitPath[splitPath.length - 1] === 'index') {
//         splitPath.pop();
//       }
      
//       paths.push({ params: { slug: splitPath.slice(1) } });
//     }
//   }

//   return paths.map((path) => ({
//     slug: path.params.slug
//   }));
// }

// export default async function Page({ params }: PageProps) {
//   const pagePath = '/' + params.slug.join('/');
//   const { content } = await getMarkdownContent(pagePath);
//   console.log('pagepath:', pagePath);
//   if (!content) {
//     return notFound();
//   }

//   return (
//     <div className="mt-[6rem] h-screen flex flex-row justify-center">
//       <div className="flex max-w-[100rem] grow flex-row justify-center">
//         <SideNav path={pagePath} />
//         <div className="grow ml-[260px] h-full overflow-y-auto" role="main" tabIndex={-1} aria-labelledby="skip-nav">
//           <div id="skip-nav" />
//           {Markdoc.renderers.react(content, React, {
//             components,
//           })}
//         </div>
//       </div>
//     </div>
//   );  
// }

// pages/[...slug].tsx

import path from 'path';
import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { components } from 'markdoc/schema';
import { getAllMarkdownFiles, getMarkdownContent } from 'lib/markdown';
import { SideNav } from 'components';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

type Params = {
  slug: string[];
};

type PageProps = {
  params: Params;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const slugPath = '/' + params.slug.join('/');
  const { frontmatter } = await getMarkdownContent(params.slug.join('/'));
  const title: string = frontmatter?.title ?? '';
  const description: string = frontmatter?.description ?? '';
  return {
    title,
    description,
    twitter: {
      title,
      description
    },
    openGraph: {
      title,
      description,
      images: {
        // Provide a valid URL or remove the images field if not needed
        url: 'https://example.com/image.png' 
      }
    }
  };
}

export async function generateStaticParams() {
  const baseUrls = [
    'getting-started',
    'airline-nuances',
    'upcoming-features'
  ];

  const paths: { params: { slug: string[] } }[] = [];
  for (const base of baseUrls) {
    console.log('base:', base);
    const markdownFiles = await getAllMarkdownFiles(
      path.join('content', base),
      []
    );
    console.log('markdownFiles:', markdownFiles);
    for (const filePath of markdownFiles) {
      console.log('filePath:', filePath);
      const pathWithoutMd = filePath.replace(/\.md$/, '');
      const splitPath = pathWithoutMd.split('/'); // Use '/' for consistency

      // Remove "index" from the slug if it's the last element
      if (splitPath[splitPath.length - 1] === 'index') {
        splitPath.pop();
      }
      
      // Assuming 'content' is the root, slice(1) to remove 'content'
      const slug = splitPath.slice(1);
      
      paths.push({ params: { slug } });
    }
  }

  return paths;
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug.join('/'); // Create slug string
  const { content } = await getMarkdownContent(slug);

  if (!content) {
    return notFound();
  }

  return (
    <div className="mt-[6rem] h-screen flex flex-row justify-center">
      <div className="flex max-w-[100rem] grow flex-row justify-center">
        <SideNav path={`/${slug}`} />
        <div className="grow ml-[260px] h-full overflow-y-auto" role="main" tabIndex={-1} aria-labelledby="skip-nav">
          <div id="skip-nav" />
          {Markdoc.renderers.react(content, React, {
            components,
          })}
        </div>
      </div>
    </div>
  );  
}
