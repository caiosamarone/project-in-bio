import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'

import { Red_Hat_Display } from 'next/font/google'

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body
        className={`${redHatDisplay.className} antialiased bg-background-primary text-content-body`}
      >
        {children}
      </body>
      <GoogleAnalytics gaId='G-833Y14Q4RY' />
    </html>
  )
}
