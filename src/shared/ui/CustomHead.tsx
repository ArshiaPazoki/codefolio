// src/app/head.tsx  (App Router) or components/CustomHead.tsx (Pages Router)
import NextHead from 'next/head'
import { FC } from 'react'

export interface HeadProps {
  title?: string
  description?: string
  keywords?: string
  author?: string
  url?: string
  image?: string
}

const CustomHead: FC<HeadProps> = ({
  title = 'Arshia Pazoki | Senior Test Automation Engineer & SDET',
  description = 'Arshia Pazoki is a Senior Test Automation Engineer & SDET building modern, robust web applications. Explore my projects, articles, and more.',
  keywords = [
    'Arshia Pazoki',
    'Test Automation',
    'SDET',
    'Senior QA Engineer',
    'Web Developer Portfolio',
    'Next.js',
    'Tailwind CSS',
    'VSCode Portfolio',
  ].join(', '),
  author = 'Arshia Pazoki',
  url = process.env.NEXT_PUBLIC_SITE_URL || 'https://vscode-portfolio.vercel.app',
  image = process.env.NEXT_PUBLIC_OG_IMAGE || '/og-image.png',
}) => (
  <NextHead>
    {/* Basic tags */}
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords"    content={keywords} />
    <meta name="author"      content={author} />

    {/* Canonical / base URL */}
    <base href={url} />

    {/* Open Graph */}
    <meta property="og:type"        content="website" />
    <meta property="og:title"       content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url"         content={url} />
    <meta property="og:image"       content={image} />

    {/* Twitter */}
    <meta name="twitter:card"        content="summary_large_image" />
    <meta name="twitter:creator"     content="@ArshiaPazoki" />
    <meta name="twitter:title"       content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image"       content={image} />

    {/* Favicons & manifest (optional) */}
    <link rel="icon"      href="/favicon.ico" />
    <link rel="manifest"  href="/site.webmanifest" />
  </NextHead>
)

export default CustomHead
