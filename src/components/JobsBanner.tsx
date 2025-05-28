/**
 * Jobs Banner Component
 * Displays trending and recent job listings on the homepage
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase,
  TrendingUp,
  Clock,
  Eye,
  Users,
  ArrowRight,
  Code,
  Smartphone,
  Palette,
  Video,
  Bot,
  ShoppingCart,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import sampleJobs, { Job } from '@/data/sampleJobs'

// Category icons mapping
const categoryIcons: Record<string, any> = {
  'Web Development': Code,
  'Mobile Apps': Smartphone,
  'Design': Palette,
  'Marketing': TrendingUp,
  'Video Editing': Video,
  'AI & Automation': Bot,
  'E-commerce': ShoppingCart,
  'Content Writing': FileText
}

// Mock data with sample jobs for demo
const mockJobs: Job[] = sampleJobs.map((job, index) => ({
  ...job,
  id: `job-${index + 1}`,
  created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() // Last 7 days
}))

export default function JobsBanner() {
  const [isClient, setIsClient] = useState(false)
  
  // Prevent hydration mismatch by only calculating time-sensitive data on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Get trending jobs (featured + high views)
  const trendingJobs = mockJobs
    .filter(job => job.featured || (job.views && job.views > 100))
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 3)

  // Get recent jobs (last 3 days) - only calculate on client to prevent hydration mismatch
  const recentJobs = isClient ? mockJobs
    .filter(job => {
      const jobDate = new Date(job.created_at!)
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      return jobDate > threeDaysAgo
    })
    .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
    .slice(0, 3) : []

  const formatBudget = (min?: number, max?: number) => {
    if (!min && !max) return 'Budget TBD'
    if (min && max) return `£${min.toLocaleString()} - £${max.toLocaleString()}`
    if (min) return `From £${min.toLocaleString()}`
    if (max) return `Up to £${max.toLocaleString()}`
    return 'Budget TBD'
  }

  const formatTimeAgo = (dateString: string) => {
    if (!isClient) return 'Recently posted' // Fallback for SSR
    
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just posted'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return `${Math.floor(diffInDays / 7)}w ago`
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  if (trendingJobs.length === 0 && recentJobs.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-kliqt-secondary/10 rounded-2xl">
              <Briefcase className="h-12 w-12 text-kliqt-secondary" />
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Latest <span className="neon-text">Opportunities</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Discover trending projects and fresh opportunities from our growing community
          </p>
          <Link href="/jobs" className="kliqt-btn-primary inline-flex items-center">
            Browse All Jobs
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Trending Jobs */}
          {trendingJobs.length > 0 && (
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-8">
                <TrendingUp className="h-6 w-6 text-kliqt-secondary mr-3" />
                <h3 className="text-2xl font-bold">Trending Projects</h3>
              </div>
              <div className="space-y-4">
                {trendingJobs.map((job, index) => {
                  const CategoryIcon = categoryIcons[job.category] || Briefcase
                  return (
                    <motion.div
                      key={job.id}
                      variants={fadeInUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      <Link href={`/jobs/${job.id}`}>
                        <div className="kliqt-card hover:border-kliqt-secondary/50 transition-all cursor-pointer group">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-3">
                                <div className="p-2 bg-kliqt-secondary/10 rounded-lg mr-3">
                                  <CategoryIcon className="h-5 w-5 text-kliqt-secondary" />
                                </div>
                                <div>
                                  <span className="text-sm text-kliqt-secondary font-medium">{job.category}</span>
                                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                                    <Eye className="h-3 w-3" />
                                    <span>{job.views} views</span>
                                    <span>•</span>
                                    <Users className="h-3 w-3" />
                                    <span>{job.applications} applications</span>
                                  </div>
                                </div>
                              </div>
                              <h4 className="font-bold mb-2 group-hover:text-kliqt-secondary transition-colors line-clamp-1">
                                {job.title}
                              </h4>
                              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                {job.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="text-kliqt-secondary font-medium">
                                  {formatBudget(job.budget_min, job.budget_max)}
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  job.type === 'wanted' 
                                    ? 'bg-blue-500/10 text-blue-400' 
                                    : 'bg-green-500/10 text-green-400'
                                }`}>
                                  {job.type === 'wanted' ? 'Wanted' : 'Available'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* Recent Jobs */}
          {recentJobs.length > 0 && (
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center mb-8">
                <Clock className="h-6 w-6 text-kliqt-primary mr-3" />
                <h3 className="text-2xl font-bold">Recently Posted</h3>
              </div>
              <div className="space-y-4">
                {recentJobs.map((job, index) => {
                  const CategoryIcon = categoryIcons[job.category] || Briefcase
                  return (
                    <motion.div
                      key={job.id}
                      variants={fadeInUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    >
                      <Link href={`/jobs/${job.id}`}>
                        <div className="kliqt-card hover:border-kliqt-primary/50 transition-all cursor-pointer group">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-3">
                                <div className="p-2 bg-kliqt-primary/10 rounded-lg mr-3">
                                  <CategoryIcon className="h-5 w-5 text-kliqt-primary" />
                                </div>
                                <div>
                                  <span className="text-sm text-kliqt-primary font-medium">{job.category}</span>
                                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                                    <Clock className="h-3 w-3" />
                                    <span>{formatTimeAgo(job.created_at!)}</span>
                                  </div>
                                </div>
                              </div>
                              <h4 className="font-bold mb-2 group-hover:text-kliqt-primary transition-colors line-clamp-1">
                                {job.title}
                              </h4>
                              <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                                {job.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="text-kliqt-primary font-medium">
                                  {formatBudget(job.budget_min, job.budget_max)}
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  job.type === 'wanted' 
                                    ? 'bg-blue-500/10 text-blue-400' 
                                    : 'bg-green-500/10 text-green-400'
                                }`}>
                                  {job.type === 'wanted' ? 'Wanted' : 'Available'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="kliqt-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Next Project?</h3>
            <p className="text-gray-400 mb-6">
              Join thousands of freelancers and clients already using KLIQT Media to find great work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/jobs" className="kliqt-btn-primary">
                Find Jobs
              </Link>
              <Link href="/portal" className="kliqt-btn-secondary">
                Post a Project
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}