
import path from 'path';
import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { components } from 'markdoc/schema';
import { getAllMarkdownFiles, getMarkdownContent } from 'lib/markdown';
import { SideNav } from 'components';
import { Metadata } from 'next';
import { baseUrls } from 'data';
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
  const path = '/' + params.slug.join('/');
  const { frontmatter } = await getMarkdownContent(path);
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
        url:  ``
      }
    }
  };
}

export async function generateStaticParams() {
  const baseUrls = [
    'getting-started',
   ];

  const paths: { params: { slug: string[] } }[] = [];
  for (const base of baseUrls) {
    const markdownFiles = await getAllMarkdownFiles(
      path.join('content', base),
      []
    );
    for (const filePath of markdownFiles) {
      const pathWithoutMd = filePath.replace(/\.md$/, '');
      const splitPath = pathWithoutMd.split(path.sep);

      // Remove "index" from the slug if it's the last element
      if (splitPath[splitPath.length - 1] === 'index') {
        splitPath.pop();
      }
      
        paths.push({ params: { slug: splitPath.slice(1) } });
      
    }
  }

  return paths.map((path) => ({
    slug: path.params.slug
  }));
}

export default async function Page({ params }: PageProps) {
  const path = '/' + params.slug.join('/');
  const { content } = await getMarkdownContent(path);

  

  if (!content) {
    return notFound();
  }

  return (
    <div className="mt-[6rem] h-screen flex flex-row justify-center">
      <div className="flex max-w-[100rem] grow flex-row justify-center">
        <SideNav path={path} />
        <div className="grow h-full overflow-y-auto">
          <div id="skip-nav" />
          {Markdoc.renderers.react(content, React, {
            components
          })}
        </div>
      </div>
    </div>
  );
}
