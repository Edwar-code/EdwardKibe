import type { Metadata } from 'next'
import Head from 'next/head'
import { Inter, Calistoga } from 'next/font/google'
import { twMerge } from 'tailwind-merge'
import { Providers } from '../providers'

// internationalization
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/src/i18n/routing'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const calistoga = Calistoga({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'],
})

interface MetadataImage {
  url: string
  width?: number
  height?: number
  alt?: string
}
interface WebsiteMetadata {
  title?: string
  description?: string
  openGraph?: {
    url?: string
    title?: string
    description?: string
    images?: MetadataImage[]
    siteName?: string
  }
  twitter?: {
    card?: string
    site?: string
    title?: string
    description?: string
    image?: string
  }
}

export const metadata: WebsiteMetadata = {
  title: 'Edward Kibe- IR and IT Specialist',
  description:
    "Explore Edward Kibe- Web development Projects, showcasing React/Javascript Skills Design Expertise. Get in touch with me.",

  openGraph: {
    url: 'https://edward-kibe.vercel.app/en',
    title: 'Edward Kibe- IR and IT Specialist',
    description: 'A showcase of my web development projects and expertise',
    images: [
      {
        url: 'https://https://edward-kibe.vercel.app/en/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMoses%20Portfolio%20website.194b3bfe.png&w=3840&q=75',
        width: 800,
        height: 600,
        alt: 'Website hompage',
      },
    ],
    siteName: 'Ed Web Dev',
  },
  // add twitter metadata if needed
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@yourtwitterhandle',
  //   title: 'My Awesome Portfolio',
  //   description: 'A showcase of my web development projects and skills',
  //   image: 'https://www.myawesomeportfolio.com/twitter-image.jpg',
  // },
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <Head>
        <title>Edward Kibe- IR and IT Specialist</title>
        <meta
          // This meta tag provides a brief description for search engines and browser tab previews.
          name="description"
          content="Explore Edward Kibe Web development Projects, showcasing React/Javascript Skills Design Expertise. Get in touch with me."
        />
        <link rel="canonical" href="https://https://edward-kibe.vercel.app/en" />
        {/* JSON-LD Structured Data for rich snippets */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Edward Kibe',
            url: 'https://https://edward-kibe.vercel.app/en',
            sameAs: [
              'https://www.linkedin.com/in/moseslevin/',
              'https://github.com/MosesLevin',
              // 'https://twitter.com/yourtwitterhandle',
            ],
            jobTitle: 'IR and IT Specialist',
            worksFor: { '@type': 'Organization', name: 'Your Company' },
            alumniOf: {
              '@type': 'University',
              name: 'Kenya Methodist University.',
            },
            // This field in your structured data describes your portfolio for Google to generate rich snippets.
            description:
              'A showcase of my Web Development projects and Skills. Bringing Websites to Life.',
            image:
              'https://https://edward-kibe.vercel.app/en/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMoComputerMemoji.8d87ca22.png&w=750&q=75',
          })}
        </script>
      </Head>
      <body
        className={twMerge(
          inter.variable,
          calistoga.variable,
          'dark:bg-gray-900 bg-brown1 text-white antialiased font-sans'
        )}
      >
        {/* wrap our internationalization provider with another theme provider - if any more providers need to make a provider component take props for useTranslation hook to work in client components to avoid translation prop drilling in many components */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
