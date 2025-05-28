import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KLIQT Media - AI-Powered Content & Freelancer Platform',
  description: 'The UK\'s boldest media platform for content, freelancers, and AI-powered growth. Connect with creators, automate your workflow, and scale your business.',
  keywords: 'AI content, freelancers, automation, SEO, content creation, UK media',
  authors: [{ name: 'KLIQT Media' }],
  openGraph: {
    title: 'KLIQT Media - AI-Powered Content & Freelancer Platform',
    description: 'The UK\'s boldest media platform for content, freelancers, and AI-powered growth.',
    type: 'website',
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KLIQT Media - AI-Powered Content & Freelancer Platform',
    description: 'The UK\'s boldest media platform for content, freelancers, and AI-powered growth.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-kliqt-dark via-gray-900 to-kliqt-gray">
          {children}
        </div>
      </body>
    </html>
  )
}