/**
 * Developer Portal - API Documentation
 * Interactive API documentation with Swagger UI
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code, Key, Book, Zap, Shield, Globe } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import Swagger UI to avoid SSR issues
const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kliqt-primary"></div>
    </div>
  )
}) as any

export default function DeveloperPortal() {
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Import Swagger UI CSS
    import('swagger-ui-react/swagger-ui.css').catch(() => {
      // Fallback if CSS import fails
      console.warn('Could not load Swagger UI CSS')
    })
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
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
              <Link href="/jobs" className="hover:text-kliqt-primary transition-colors">Jobs</Link>
              <Link href="/portal" className="hover:text-kliqt-primary transition-colors">Portal</Link>
              <Link href="/developer" className="text-kliqt-primary">Developer</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-kliqt-primary/20 rounded-full mb-6">
              <Code className="w-8 h-8 text-kliqt-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              KLIQT Media <span className="neon-text">API</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Integrate with the UK's boldest media platform. Access job listings, post opportunities, 
              and build powerful AI-enhanced applications with our RESTful API.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.1 }}
              className="kliqt-card kliqt-hover-lift text-center"
            >
              <Globe className="w-12 h-12 text-kliqt-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Public API</h3>
              <p className="text-gray-300">
                Access job listings without authentication. Perfect for job boards and aggregators.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.2 }}
              className="kliqt-card kliqt-hover-lift text-center"
            >
              <Key className="w-12 h-12 text-kliqt-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">API Keys</h3>
              <p className="text-gray-300">
                Secure authentication with scoped permissions. Generate keys for posting jobs and advanced features.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.3 }}
              className="kliqt-card kliqt-hover-lift text-center"
            >
              <Zap className="w-12 h-12 text-kliqt-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">AI Integration</h3>
              <p className="text-gray-300">
                Built for AI tools and automation. Seamlessly integrate with your workflows and agents.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-kliqt-primary text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <Book className="w-5 h-5 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab('documentation')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'documentation'
                  ? 'bg-kliqt-primary text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <Code className="w-5 h-5 inline mr-2" />
              API Docs
            </button>
            <button
              onClick={() => setActiveTab('authentication')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'authentication'
                  ? 'bg-kliqt-primary text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              <Shield className="w-5 h-5 inline mr-2" />
              Authentication
            </button>
          </div>

          {/* Tab Content */}
          <div className="kliqt-card">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-kliqt-primary">Quick Start</h3>
                    <div className="space-y-3 text-gray-300">
                      <p>1. <strong>Public Access</strong>: Start with our public endpoints - no auth required</p>
                      <p>2. <strong>Get API Key</strong>: Register and generate an API key for posting jobs</p>
                      <p>3. <strong>Integrate</strong>: Use our RESTful API in your applications</p>
                      <p>4. <strong>Scale</strong>: Built for high-volume AI and automation use cases</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-kliqt-primary">Base URLs</h3>
                    <div className="space-y-2">
                      <div className="bg-gray-800 p-3 rounded font-mono text-sm">
                        <strong>Production:</strong> https://kliqtmedia.co.uk/api
                      </div>
                      <div className="bg-gray-800 p-3 rounded font-mono text-sm">
                        <strong>Development:</strong> http://localhost:3007/api
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3 text-kliqt-primary">Example: Get Jobs</h3>
                  <pre className="text-sm overflow-x-auto">
                    <code>{`curl -X GET "https://kliqtmedia.co.uk/api/jobs/list?type=wanted&limit=10" \\
  -H "Content-Type: application/json"`}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'documentation' && (
              <div>
                <h2 className="text-3xl font-bold mb-6">API Documentation</h2>
                <div className="swagger-container">
                  <SwaggerUI url="/swagger.yaml" />
                </div>
              </div>
            )}

            {activeTab === 'authentication' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-4">Authentication</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-kliqt-primary">Public Endpoints</h3>
                    <p className="text-gray-300 mb-3">
                      Some endpoints like <code className="bg-gray-800 px-2 py-1 rounded">/api/jobs/list</code> are public and don't require authentication.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-kliqt-primary">API Key Authentication</h3>
                    <p className="text-gray-300 mb-3">
                      For posting jobs and advanced features, you'll need an API key. Include it in the request header:
                    </p>
                    <div className="bg-gray-800 p-4 rounded font-mono text-sm">
                      <code>x-api-key: kliqt_your_api_key_here</code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold mb-3 text-kliqt-primary">Scopes</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">read_jobs</span>
                        <span className="text-gray-300">Read access to job listings</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">post_jobs</span>
                        <span className="text-gray-300">Create new job postings</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-sm">manage_jobs</span>
                        <span className="text-gray-300">Full job management access</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-kliqt-primary/10 border border-kliqt-primary/20 p-6 rounded-lg">
                    <h4 className="font-bold text-kliqt-primary mb-2">Ready to get started?</h4>
                    <p className="text-gray-300 mb-4">
                      Sign up for a KLIQT Media account to generate your API keys and start integrating.
                    </p>
                    <Link 
                      href="/portal" 
                      className="inline-flex items-center px-6 py-3 bg-kliqt-primary text-black font-medium rounded-lg hover:bg-kliqt-primary/90 transition-colors"
                    >
                      Get API Key
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .swagger-container .swagger-ui {
          filter: invert(1) hue-rotate(180deg);
        }
        .swagger-container .swagger-ui .scheme-container {
          background: #1f2937;
          border: 1px solid #374151;
        }
      `}</style>
    </main>
  )
}