import type { Metadata } from 'next'
import { Public_Sans } from 'next/font/google'
import { Toaster } from 'sonner'

import './globals.css'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin'
import { extractRouterConfig } from 'uploadthing/server'
import { ourFileRouter } from '@/app/api/uploadthing/core'
import ReactQueryProvider from '@/components/providers/react-query-provider'

const font = Public_Sans({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'X',
  description: 'X is a social media platform that allows you to connect with friends and family.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ReactQueryProvider>
      <html
        lang='en'
        suppressHydrationWarning
        className='scrollbar scrollbar-thumb-accent scrollbar-track-accent/10'
      >
        <body className={`${font.className} h-screen w-screen antialiased`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryProvider>
  )
}
