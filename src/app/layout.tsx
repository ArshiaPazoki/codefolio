// src/app/layout.tsx
import './globals.css'
// import { Geist, Geist_Mono } from 'next/font/google'
import Titlebar from '../widgets/TitleBar/Titlebar'
import Statusbar from '../widgets/Statusbar/Statusbar'
import ActivityBar from '../widgets/ActivityBar/ActivityBar'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// })
// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <Titlebar />
        <div className="flex flex-1 overflow-hidden">
          <ActivityBar />

          {/* Updated: make this flex-col & h-full */}
          <main className="flex flex-col flex-1 h-full overflow-auto">
            {children}
          </main>
        </div>
        <Statusbar />
      </body>
    </html>
  )
}
