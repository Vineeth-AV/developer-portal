'use client';

import { useState, useEffect, Key } from 'react';
import { faFileLines, faTerminal } from '@fortawesome/free-solid-svg-icons';
import { Mulish } from 'next/font/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'; // Styles

import { CopyButton } from './copy-button';
import { Theme } from 'types';

const firaMono =  Mulish({
  subsets: ['latin'], // You can add more subsets if needed
  weight: ['400', '800'], // Choose the font weights you need
  variable: '--font-mulish', // Define a custom CSS variable for the font
});


const MermaidDiagram = dynamic(() => import('@/components/tags/mermaid'), {
  ssr: false
});

// Import additional languages as needed
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash';
import protobuf from 'react-syntax-highlighter/dist/esm/languages/hljs/protobuf';
import rust from 'react-syntax-highlighter/dist/esm/languages/hljs/rust';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';

SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('protobuf', protobuf);
SyntaxHighlighter.registerLanguage('rust', rust);
SyntaxHighlighter.registerLanguage('csharp', csharp);

const commandLineLanguages = [
  'bash',
  'sh',
  'zsh',
  'powershell',
  'cmd',
  'batch',
  'dos',
  'shell'
];

type Props = {
  children: string;
  'data-language'?: string;
  title?: string;
  addMode?: boolean;
  lineNumbers?: boolean;
  showTitle?: boolean;
};

export const CodeBlock = ({
  children,
  'data-language': language,
  title,
  lineNumbers = false,
  showTitle = true
}: Props) => {
  const { resolvedTheme } = useTheme();
  const [themeStyle, setThemeStyle] = useState(atomOneDark);

  useEffect(() => {
    if (resolvedTheme === Theme.Dark) {
      setThemeStyle(atomOneDark);
    } else {
      setThemeStyle(atomOneLight);
    }
  }, [resolvedTheme]);

  // If the user specified `proto` as the language, change it to protobuf
  if (language?.toLowerCase() === 'proto') {
    language = 'protobuf';
  }

  // If the language is mermaid, render the mermaid diagram
  if (language?.toLowerCase() === 'mermaid') {
    return (
      <div className="mx-auto my-4 w-full">
        <MermaidDiagram value={`${children.trim()}`} />
      </div>
    );
  }

  return (
    <div className="group relative my-4 w-full items-center overflow-hidden rounded-lg border border-[rgb(46,46,46)] bg-[#fff] dark:bg-[#0e1116]">
      <TopBar
        language={language}
        code={children}
        title={title}
        hideTitle={!showTitle}
      />
      <SyntaxHighlighter
        language={language ?? ''}
        style={themeStyle}
        showLineNumbers={lineNumbers}
        className={clsx(firaMono.className, 'my-2 pl-[10px] text-[16px]')}
      >
        {children.trim()}
      </SyntaxHighlighter>
      {!showTitle && (
        <div
          className={clsx(
            'absolute right-0 top-2 mr-4 rounded border border-[rgb(253,248,248)] bg-[rgb(6,22,38)] opacity-0',
            'transition-opacity duration-500 group-hover:opacity-100'
          )}
        >
          <CopyButton text={children} />
        </div>
      )}
    </div>
  );
};

type TopBarProps = {
  language?: string;
  title?: string;
  code: string;
  hideTitle?: boolean;
};

const TopBar = ({ language, code, title, hideTitle }: TopBarProps) =>
  language && !hideTitle ? (
    <div className="flex h-12 flex-row items-center justify-between border-b border-b-[hsl(0,0%,18%)] bg-black/20 text-white dark:bg-black/20">
      <div className="m-0 ml-4 flex flex-row items-center gap-3 p-0 text-sm">
        {LanguageIcon(language ?? '')}
        {title ?? fixLanguage(language) ?? ''}
      </div>
      <div className="mr-4 flex flex-row items-center gap-4">
        <CopyButton text={code} />
      </div>
    </div>
  ) : null;

// Provides an icon given the language of the code block
function LanguageIcon(language: string) {
  return language === undefined ? (
    <FontAwesomeIcon icon={faFileLines} className="size-4" />
  ) : commandLineLanguages.includes(language) ? (
    <FontAwesomeIcon icon={faTerminal} className="size-4" />
  ) : (
    <FontAwesomeIcon icon={faFileLines} className="size-4" />
  );
}

// A function to fix the spelling of the language
function fixLanguage(language: string) {
  if (language === 'csharp') {
    return 'C#';
  } else {
    return language;
  }
}
