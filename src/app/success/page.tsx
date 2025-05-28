/**
 * Payment Success Page
 * Displays confirmation after successful Stripe checkout
 */

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // In a real implementation, you'd fetch session details from your API
      // For now, we'll just show a generic success message
      setLoading(false)
    }
  }, [sessionId])

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kliqt-primary"></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="https://i.ibb.co/B5NV5MR1/kliqtsvg.png"
                alt="KLIQT Media Logo"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold neon-text">KLIQT Media</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/#services" className="hover:text-kliqt-primary transition-colors">Services</Link>
              <Link href="/pricing" className="hover:text-kliqt-primary transition-colors">Pricing</Link>
              <Link href="/#about" className="hover:text-kliqt-primary transition-colors">About</Link>
              <Link href="/portal" className="kliqt-btn-primary">Portal</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Success Content */}
      <section className="pt-24 pb-16 kliqt-gradient-bg min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <div className="flex justify-center mb-8">
              <div className="relative">
                <CheckCircle className="h-24 w-24 text-kliqt-primary" />
                <div className="absolute inset-0 h-24 w-24 bg-kliqt-primary/20 rounded-full animate-pulse"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Payment <span className="neon-text">Successful!</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Thank you for choosing KLIQT Media! Your order has been confirmed and we'll be in touch shortly to get your project started.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="kliqt-card text-center">
                <Mail className="h-8 w-8 text-kliqt-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Check Your Email</h3>
                <p className="text-sm text-gray-400">Receipt and project details sent to your inbox</p>
              </div>
              
              <div className="kliqt-card text-center">
                <Calendar className="h-8 w-8 text-kliqt-secondary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Project Kickoff</h3>
                <p className="text-sm text-gray-400">We'll schedule a call within 24 hours</p>
              </div>
              
              <div className="kliqt-card text-center">
                <CheckCircle className="h-8 w-8 text-kliqt-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Portal Access</h3>
                <p className="text-sm text-gray-400">Track progress in your client dashboard</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portal" className="kliqt-btn-primary kliqt-hover-lift group">
                Access Portal
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/" className="kliqt-btn-secondary kliqt-hover-lift">
                Back to Home
              </Link>
            </div>

            {sessionId && (
              <div className="mt-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400">
                  Order ID: <span className="text-kliqt-primary font-mono">{sessionId}</span>
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  )
}