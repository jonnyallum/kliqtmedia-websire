'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Lock, Mail, ArrowRight, Users, Bot, BarChart3, Settings, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/context'

export default function PortalPage() {
  const { user, signIn, signUp, loading } = useAuth()
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'freelancer'
  })

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user && !loading) {
      router.push('/portal/dashboard')
    }
  }, [user, loading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          setError(error.message)
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, formData.fullName)
        if (error) {
          setError(error.message)
        } else {
          setError('Check your email for a confirmation link!')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleDemoLogin = async (role: 'freelancer' | 'client') => {
    setIsSubmitting(true)
    setError('')
    
    // Demo credentials
    const demoCredentials = {
      freelancer: { email: 'demo@freelancer.com', password: 'demo123' },
      client: { email: 'demo@client.com', password: 'demo123' }
    }
    
    try {
      const { error } = await signIn(
        demoCredentials[role].email,
        demoCredentials[role].password
      )
      if (error) {
        setError(`Demo ${role} account not available. Please create an account.`)
      }
    } catch (err) {
      setError('Demo login failed')
    } finally {
      setIsSubmitting(false)
    }
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
                <Link href="/freelancers" className="kliqt-card text-center hover:scale-105 transition-transform cursor-pointer group">
                  <Users className="h-8 w-8 text-kliqt-primary mx-auto mb-3 group-hover:animate-pulse" />
                  <h3 className="font-semibold mb-2">Freelancers</h3>
                  <p className="text-sm text-gray-400">Find projects, manage work, get paid</p>
                </Link>
                <Link href="/clients" className="kliqt-card text-center hover:scale-105 transition-transform cursor-pointer group">
                  <Bot className="h-8 w-8 text-kliqt-secondary mx-auto mb-3 group-hover:animate-pulse" />
                  <h3 className="font-semibold mb-2">Clients</h3>
                  <p className="text-sm text-gray-400">Post projects, track progress, scale</p>
                </Link>
                <Link href="/analytics" className="kliqt-card text-center hover:scale-105 transition-transform cursor-pointer group">
                  <BarChart3 className="h-8 w-8 text-kliqt-primary mx-auto mb-3 group-hover:animate-pulse" />
                  <h3 className="font-semibold mb-2">Analytics</h3>
                  <p className="text-sm text-gray-400">Real-time insights and reporting</p>
                </Link>
                <Link href="/ai-tools" className="kliqt-card text-center hover:scale-105 transition-transform cursor-pointer group">
                  <Settings className="h-8 w-8 text-kliqt-secondary mx-auto mb-3 group-hover:animate-pulse" />
                  <h3 className="font-semibold mb-2">AI Tools</h3>
                  <p className="text-sm text-gray-400">Automation and smart workflows</p>
                </Link>
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
                    {error && (
                      <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-red-400">{error}</span>
                      </div>
                    )}
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
                      disabled={isSubmitting || loading}
                      className="w-full kliqt-btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                      {!isSubmitting && (
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      )}
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
                  <button
                    onClick={() => handleDemoLogin('freelancer')}
                    disabled={isSubmitting || loading}
                    className="flex-1 px-4 py-2 bg-kliqt-primary/20 text-kliqt-primary rounded-lg hover:bg-kliqt-primary/30 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Demo Freelancer
                  </button>
                  <button
                    onClick={() => handleDemoLogin('client')}
                    disabled={isSubmitting || loading}
                    className="flex-1 px-4 py-2 bg-kliqt-secondary/20 text-kliqt-secondary rounded-lg hover:bg-kliqt-secondary/30 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
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