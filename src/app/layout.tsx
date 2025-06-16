import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Front-End Sinka',
  description: 'Desafio Full Stack Sinka',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${interSans.variable} antialiased`}>
        {children}
        <Toaster richColors position="top-left" />
      </body>
    </html>
  )
}
