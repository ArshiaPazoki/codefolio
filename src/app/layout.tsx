// src/app/layout.tsx
import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import Titlebar from '../widgets/TitleBar/Titlebar'
// import Sidebar from '@/widgets/Sidebar/Sidebar'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="flex flex-col h-screen bg-bg-main text-fg-main antialiased">
        {/* VSCode-style shell */}
        <Titlebar />

        <div className="flex flex-1 overflow-x-hidden bg-bg-main">
          {/* Sidebar (folder explorer, etc.) */}
          {/* <Sidebar /> */}

          {/* Main content area (formerly .content) */}
          <main
            className="
              p-8
              text-fg-main
              font-mono
              flex-1
              h-[85vh]
              overflow-y-auto
              scroll-smooth
              overflow-x-hidden
              flex
              items-center
              scrollbar-thin
              scrollbar-thumb-accent
            "
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
