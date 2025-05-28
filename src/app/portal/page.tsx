'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Mail, ArrowRight, Users, Bot, BarChart3, Settings } from 'lucide-react'
import Link from 'next/link'

export default function PortalPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'freelancer'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle authentication logic here
    console.log('Form submitted:', formData)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
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
              <Link href="/portal" className="text-kliqt-primary">Portal</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16 min-h-screen kliqt-gradient-bg flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Info */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center lg:justify-start mb-6">
                <img
                  src="https://i.ibb.co/B5NV5MR1/kliqtsvg.png"
                  alt="KLIQT Media Logo"
                  className="h-20 md:h-24 w-auto kliqt-glow"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to the{' '}
                <span className="neon-text">KLIQT Portal</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Access your dashboard, manage projects, and connect with our AI-powered platform.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="kliqt-card text-center">
                  <Users className="h-8 w-8 text-kliqt-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Freelancers</h3>
                  <p className="text-sm text-gray-400">Find projects, manage work, get paid</p>
                </div>
                <div className="kliqt-card text-center">
                  <Bot className="h-8 w-8 text-kliqt-secondary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Clients</h3>
                  <p className="text-sm text-gray-400">Post projects, track progress, scale</p>
                </div>
                <div className="kliqt-card text-center">
                  <BarChart3 className="h-8 w-8 text-kliqt-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Analytics</h3>
                  <p className="text-sm text-gray-400">Real-time insights and reporting</p>
                </div>
                <div className="kliqt-card text-center">
                  <Settings className="h-8 w-8 text-kliqt-secondary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">AI Tools</h3>
                  <p className="text-sm text-gray-400">Automation and smart workflows</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Auth Form */}
            <motion.div
              className="max-w-md mx-auto w-full"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="kliqt-card kliqt-gradient-border">
                <div className="bg-kliqt-dark rounded-2xl p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-2">
                      {isLogin ? 'Welcome Back' : 'Join KLIQT'}
                    </h2>
                    <p className="text-gray-400">
                      {isLogin ? 'Sign in to your account' : 'Create your account'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
                            placeholder="Enter your full name"
                            required={!isLogin}
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>

                    {!isLogin && (
                      <div>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
                        >
                          <option value="freelancer">Freelancer</option>
                          <option value="client">Client</option>
                        </select>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full kliqt-btn-primary group"
                    >
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-kliqt-primary hover:text-kliqt-primary/80 transition-colors"
                    >
                      {isLogin 
                        ? "Don't have an account? Sign up" 
                        : "Already have an account? Sign in"
                      }
                    </button>
                  </div>

                  {isLogin && (
                    <div className="mt-4 text-center">
                      <Link 
                        href="/forgot-password" 
                        className="text-sm text-gray-400 hover:text-kliqt-primary transition-colors"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Demo Access */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400 mb-3">Quick Demo Access:</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="flex-1 px-4 py-2 bg-kliqt-primary/20 text-kliqt-primary rounded-lg hover:bg-kliqt-primary/30 transition-colors text-sm">
                    Demo Freelancer
                  </button>
                  <button className="flex-1 px-4 py-2 bg-kliqt-secondary/20 text-kliqt-secondary rounded-lg hover:bg-kliqt-secondary/30 transition-colors text-sm">
                    Demo Client
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}