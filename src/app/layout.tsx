
import { AppWrapper, PathProvider } from 'context/state';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer, TopNav } from 'components';
import { Mulish } from 'next/font/google';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import { Metadata } from 'next';
import Script from 'next/script';
import { BackToTop } from '@/components/shell/back-to-top';

const inter = Mulish({
  subsets: ['latin'], // You can add more subsets if needed
  weight: ['400', '800'], // Choose the font weights you need
  variable: '--font-mulish', // Define a custom CSS variable for the font
});
const baseUrl = 'http://localhost';

// Metadata and structured data for the site.
export const metadata: Metadata = {
  title: {
    default: 'Verteil Docs',
    template: '%s | Verteil Docs'
  },
  description: 'Welcome to the Verteil Docs.',
  keywords: [
    'Verteil',
    'documentation',
    'docs',
    'guide'
  ],
  robots: {
    index: true,
    follow: true
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verteil Docs',
    description: 'Welcome to the Verteil Docs.',
    creator: '@verteil'
  },
  openGraph: {
    type: 'website',
    title: 'Verteil Docs',
    description: 'Welcome to the Verteil Docs.',
    url: 'https://www.verteil.com/',
    locale: 'en_US',
    images: {
      url: `
      )}`
    }
  },
  category: 'Software',
  metadataBase: new URL('https://www.verteil.com/'),
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Verteil Documentation",
      "description": "Comprehensive guide to using Verteil, including setup, usage, and advanced features.",
      "mainEntityOfPage": "https://www.verteil.com/",
      "author": {
        "@type": "Organization",
        "name": "Verteil Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Verteil",
        "logo": {
          "@type": "ImageObject",
          "url": ""
        }
      },
    }),
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '',
  url: '',
  logo: '',
  sameAs: [

  ],
  brand: {
    '@type': 'Brand',
    name: 'Verteil',
    url: 'https://www.verteil.com/',
    logo: ''
  }
};

const navigationSchema = {
  '@context': 'http://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    // {
    //   '@type': 'SiteNavigationElement',
    //   position: 1,
    //   name: 'Home',
    //   description: 'Welcome to the Verteil Docs.',
    //   url: new URL('/', baseUrl).href
    // },
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Getting Started',
      description: 'Quickly get up and running with Verteil.',
      url: new URL('/getting-started', baseUrl).href
    }
  ]
};

export default function RootLayout(props: any) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PathProvider path="/">
            <div className="flex min-h-screen flex-col">
              <TopNav />
              <main className={clsx(inter.className)} id="main">
                {props.children}
              </main>

              
              <div className="pl-[15.5rem]">
                <Footer />
              </div>
              <div className="fixed bottom-3 right-3">
                <BackToTop />
              </div>
            </div>
          </PathProvider>
        </ThemeProvider>
        <Script
          id="navigation-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationSchema) }}
        />
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
        {/* Fix for issue #368 - see discussion at https://github.com/algolia/docsearch/issues/1260 */}
        <div className="fixed">
          <label htmlFor="hiddenInput" className="sr-only">
            Hidden Input for Search bar Fix
          </label>
          <input type="text" id="hiddenInput" />
        </div>
      </body>
    </html>
  );
}
