/**
 * AI Content & SEO Service Page
 * Showcases AI-powered content generation and SEO optimization services
 */

'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Zap, Search, BarChart3, Bot, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

export default function AIContentSEOPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "GPT-4 Content Generation",
      description: "Blog posts, ad copy, and social media content generated with advanced AI"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Automated SEO Research",
      description: "Keyword research, competitor analysis, and content optimization"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Tracking",
      description: "Google Search Console integration and traffic analytics"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "On-Page Optimization",
      description: "Technical SEO audits and automated optimization recommendations"
    }
  ]

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
              <Link href="/jobs" className="hover:text-kliqt-primary transition-colors">Jobs</Link>
              <Link href="/developer" className="hover:text-kliqt-primary transition-colors">API</Link>
              <Link href="/portal" className="kliqt-btn-primary">Portal</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-kliqt-primary/20 rounded-full mb-6">
              <Zap className="w-8 h-8 text-kliqt-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI Content & <span className="neon-text">SEO</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Supercharge your brand with our AI-powered content systems and search optimization agents.
              Whether you're launching a site or scaling traffic, KLIQT delivers hands-off results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing#ai" className="kliqt-btn-primary kliqt-hover-lift group">
                View AI Plans & Pricing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="kliqt-btn-secondary kliqt-hover-lift">
                Get Custom Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What's <span className="neon-text">Included</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Complete AI-powered content and SEO automation suite
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="kliqt-card kliqt-hover-lift text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-kliqt-primary/20 rounded-full mb-4 text-kliqt-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-kliqt-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Complete <span className="neon-text">Content Automation</span>
              </h2>
              <div className="space-y-4">
                {[
                  "GPT-4 generated blog and ad copy",
                  "Automated SEO keyword research",
                  "On-page optimization & health audits",
                  "Performance tracking & Google Search Console integration",
                  "Social media content scheduling",
                  "Competitor analysis and insights"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-kliqt-primary flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="kliqt-card"
            >
              <h3 className="text-2xl font-bold mb-4 text-kliqt-primary">Results You Can Expect</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Content Production Speed</span>
                  <span className="text-kliqt-primary font-bold">10x Faster</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>SEO Ranking Improvement</span>
                  <span className="text-kliqt-primary font-bold">3-6 Months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Traffic Increase</span>
                  <span className="text-kliqt-primary font-bold">200-500%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Content Quality Score</span>
                  <span className="text-kliqt-primary font-bold">95%+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="neon-text">Automate</span> Your Growth?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join hundreds of businesses already using KLIQT's AI content systems to scale their online presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing#ai" className="kliqt-btn-primary kliqt-hover-lift">
                View AI Plans & Pricing
              </Link>
              <Link href="/contact" className="kliqt-btn-secondary kliqt-hover-lift">
                Schedule Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}