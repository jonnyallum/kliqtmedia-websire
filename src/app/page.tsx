/**
 * KLIQT Media Homepage
 * Modern, professional homepage with service cards and portal integration
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Users, Bot, Star, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import JobsBanner from '@/components/JobsBanner'

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <img
                src="https://i.ibb.co/B5NV5MR1/kliqtsvg.png"
                alt="KLIQT Media Logo"
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold neon-text">KLIQT Media</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex space-x-8"
            >
              <Link href="#services" className="hover:text-kliqt-primary transition-colors">Services</Link>
              <Link href="/jobs" className="hover:text-kliqt-primary transition-colors">Jobs</Link>
              <Link href="/developer" className="hover:text-kliqt-primary transition-colors">API</Link>
              <Link href="#pricing" className="hover:text-kliqt-primary transition-colors">Pricing</Link>
              <Link href="#about" className="hover:text-kliqt-primary transition-colors">About</Link>
              <Link href="/portal" className="kliqt-btn-primary">Portal</Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img
              src="https://i.ibb.co/B5NV5MR1/kliqtsvg.png"
              alt="KLIQT Media Logo"
              className="h-16 md:h-20 w-auto mx-auto mb-6"
            />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              AI-Powered <span className="neon-text">Content</span> & 
              <br />Creative <span className="neon-text">Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
              Supercharge your brand with our AI agents, freelancer network, and automation platforms. 
              Scale your content, streamline your workflow, and dominate your market.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/portal" className="kliqt-btn-primary kliqt-hover-lift">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="#services" className="kliqt-btn-secondary kliqt-hover-lift">
              Explore Services
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our <span className="neon-text">Services</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Cutting-edge solutions for modern businesses
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <Link href="/services/ai-content-seo">
              <motion.div variants={fadeInUp} className="kliqt-card kliqt-hover-lift cursor-pointer">
                <div className="flex items-center mb-4">
                  <Zap className="h-8 w-8 text-kliqt-primary mr-3" />
                  <h3 className="text-xl font-bold text-kliqt-primary">AI Content & SEO</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Powerful AI agents to supercharge your brand, boost your traffic, and automate growth.
                </p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• GPT-powered content generation</li>
                  <li>• SEO optimization & keyword research</li>
                  <li>• Automated social media posting</li>
                  <li>• Performance analytics & reporting</li>
                </ul>
              </motion.div>
            </Link>

            <Link href="/services/freelancer-network">
              <motion.div variants={fadeInUp} className="kliqt-card kliqt-hover-lift cursor-pointer">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-kliqt-primary mr-3" />
                  <h3 className="text-xl font-bold text-kliqt-primary">Freelancer Network</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Connect with creators, editors, and devs. Real-time projects, real results.
                </p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Vetted creative professionals</li>
                  <li>• Project management tools</li>
                  <li>• Real-time collaboration</li>
                  <li>• Quality assurance & reviews</li>
                </ul>
              </motion.div>
            </Link>

            <Link href="/services/agent-powered-platforms">
              <motion.div variants={fadeInUp} className="kliqt-card kliqt-hover-lift cursor-pointer">
                <div className="flex items-center mb-4">
                  <Bot className="h-8 w-8 text-kliqt-primary mr-3" />
                  <h3 className="text-xl font-bold text-kliqt-primary">Agent-Powered Platforms</h3>
                </div>
                <p className="text-gray-400 mb-4">
                  Use or license our automation and delegation agents for scale and speed.
                </p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Custom AI agent development</li>
                  <li>• Workflow automation</li>
                  <li>• API integrations</li>
                  <li>• White-label solutions</li>
                </ul>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-kliqt-primary/10 to-kliqt-secondary/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <div className="text-3xl md:text-4xl font-bold text-kliqt-primary mb-2">500+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-kliqt-primary mb-2">50+</div>
              <div className="text-gray-400">Active Freelancers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-kliqt-primary mb-2">24/7</div>
              <div className="text-gray-400">AI Support</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-kliqt-primary mb-2">99%</div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jobs Banner */}
      <JobsBanner />

      {/* CTA Section */}
      <section id="pricing" className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="neon-text">Scale</span> Your Business?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join hundreds of businesses already using KLIQT Media to automate, create, and grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing" className="kliqt-btn-primary kliqt-hover-lift">
                View Pricing
              </Link>
              <Link href="/contact" className="kliqt-btn-secondary kliqt-hover-lift">
                Get In Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://i.ibb.co/B5NV5MR1/kliqtsvg.png"
                  alt="KLIQT Media Logo"
                  className="h-8 w-auto"
                />
                <span className="text-2xl font-bold neon-text">KLIQT Media</span>
              </div>
              <p className="text-gray-400">
                AI-powered content and freelancer platform for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/services/ai-content-seo" className="hover:text-kliqt-primary transition-colors">AI Content</Link></li>
                <li><Link href="/services/freelancer-network" className="hover:text-kliqt-primary transition-colors">Freelancers</Link></li>
                <li><Link href="/services/agent-powered-platforms" className="hover:text-kliqt-primary transition-colors">Automation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-kliqt-primary transition-colors">About</Link></li>
                <li><Link href="/jobs" className="hover:text-kliqt-primary transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-kliqt-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-kliqt-primary transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-kliqt-primary transition-colors">Terms</Link></li>
                <li><Link href="/developer" className="hover:text-kliqt-primary transition-colors">API</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 KLIQT Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}