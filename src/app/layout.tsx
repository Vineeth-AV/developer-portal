
import { AppWrapper, PathProvider } from 'context/state';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer, TopNav } from 'components';
import { Inter } from 'next/font/google';
import clsx from 'clsx';
import { Metadata } from 'next';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });
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
    'RPC',
    'Ice',
    'ZeroC',
    'networking',
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
    creator: '@zeroc'
  },
  openGraph: {
    type: 'website',
    title: 'Verteil Docs',
    description: 'Welcome to the Verteil Docs.',
    url: 'https://docs.Verteil.dev/',
    locale: 'en_US',
    images: {
      url: `https://docs.Verteil.dev/api/og?title=${'Verteil Docs'}&description=${'Welcome to the Verteil Docs.'}&path=${encodeURIComponent(
        '/'
      )}`
    }
  },
  category: 'Software',
  metadataBase: new URL('https://docs.Verteil.dev'),
  other: {
    'application/ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "Verteil Documentation",
      "description": "Comprehensive guide to using Verteil, including setup, usage, and advanced features.",
      "mainEntityOfPage": "https://docs.Verteil.dev",
      "author": {
        "@type": "Organization",
        "name": "Verteil Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Verteil",
        "logo": {
          "@type": "ImageObject",
          "url": "https://docs.Verteil.dev/Verteil-logo.svg"
        }
      },
    }),
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ZeroC',
  url: 'https://www.zeroc.com/',
  logo: 'https://download.zeroc.com/brand-assets/zeroc-logo.svg',
  sameAs: [
    'https://x.com/zeroc',
    'https://www.linkedin.com/company/zeroc-inc/',
    'https://github.com/zeroc-inc'
  ],
  brand: {
    '@type': 'Brand',
    name: 'Verteil',
    url: 'https://docs.Verteil.dev/',
    logo: 'https://download.zeroc.com/brand-assets/Verteil-logo.svg'
  }
};

const navigationSchema = {
  '@context': 'http://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'SiteNavigationElement',
      position: 1,
      name: 'Home',
      description: 'Welcome to the Verteil Docs.',
      url: new URL('/', baseUrl).href
    },
    {
      '@type': 'SiteNavigationElement',
      position: 2,
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
                <Footer />
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
