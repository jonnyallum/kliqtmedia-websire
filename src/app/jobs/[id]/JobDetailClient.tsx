/**
 * Job Detail Client Component
 * Handles client-side interactivity for job detail pages
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft,
  MapPin, 
  Clock, 
  Eye, 
  Users, 
  Star,
  Briefcase,
  Code,
  Smartphone,
  Palette,
  TrendingUp,
  Video,
  Bot,
  ShoppingCart,
  FileText,
  Send,
  Heart,
  Share2,
  Flag,
  Calendar,
  DollarSign,
  Globe,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import { Job } from '@/data/sampleJobs'

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

interface JobDetailClientProps {
  job: Job
}

export default function JobDetailClient({ job }: JobDetailClientProps) {
  const [isApplying, setIsApplying] = useState(false)
  const [applicationMessage, setApplicationMessage] = useState('')
  const [proposedBudget, setProposedBudget] = useState('')
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [isSaved, setIsSaved] = useState(false)

  const CategoryIcon = categoryIcons[job.category] || Briefcase

  const formatBudget = (min?: number, max?: number, currency = 'GBP') => {
    if (!min && !max) return 'Budget TBD'
    if (min && max) return `£${min.toLocaleString()} - £${max.toLocaleString()}`
    if (min) return `From £${min.toLocaleString()}`
    if (max) return `Up to £${max.toLocaleString()}`
    return 'Budget TBD'
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just posted'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks}w ago`
  }

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsApplying(true)
    
    // Simulate application submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsApplying(false)
    alert('Application submitted successfully!')
    setApplicationMessage('')
    setProposedBudget('')
    setPortfolioUrl('')
  }

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
              <Link href="/#services" className="hover:text-kliqt-primary transition-colors">Services</Link>
              <Link href="/pricing" className="hover:text-kliqt-primary transition-colors">Pricing</Link>
              <Link href="/jobs" className="text-kliqt-primary">Jobs</Link>
              <Link href="/portal" className="hover:text-kliqt-primary transition-colors">Portal</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-16">
        {/* Breadcrumb */}
        <section className="py-6 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/jobs" className="text-kliqt-secondary hover:text-kliqt-secondary/80 transition-colors">
                Jobs
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-400">{job.category}</span>
              <span className="text-gray-400">/</span>
              <span className="text-white truncate">{job.title}</span>
            </div>
          </div>
        </section>

        {/* Job Header */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <Link
                      href="/jobs"
                      className="flex items-center text-kliqt-secondary hover:text-kliqt-secondary/80 transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Jobs
                    </Link>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setIsSaved(!isSaved)}
                        className={`p-2 rounded-lg transition-colors ${
                          isSaved 
                            ? 'bg-kliqt-secondary/10 text-kliqt-secondary' 
                            : 'bg-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors"
                        aria-label="Share this job"
                        title="Share this job"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 bg-gray-800 text-gray-400 hover:text-white rounded-lg transition-colors"
                        aria-label="Report this job"
                        title="Report this job"
                      >
                        <Flag className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-kliqt-secondary/10 rounded-xl mr-4">
                      <CategoryIcon className="h-8 w-8 text-kliqt-secondary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="text-kliqt-secondary font-medium">{job.category}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.type === 'wanted' 
                            ? 'bg-blue-500/10 text-blue-400' 
                            : 'bg-green-500/10 text-green-400'
                        }`}>
                          {job.type === 'wanted' ? 'Job Wanted' : 'Service Available'}
                        </span>
                        {job.featured && (
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatTimeAgo(job.created_at!)}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {job.views} views
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {job.applications} applications
                        </div>
                      </div>
                    </div>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-6">{job.title}</h1>

                  <div className="kliqt-card mb-8">
                    <h2 className="text-xl font-bold mb-4">Project Description</h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                        {job.description}
                      </p>
                    </div>
                  </div>

                  <div className="kliqt-card mb-8">
                    <h2 className="text-xl font-bold mb-4">Skills & Technologies</h2>
                    <div className="flex flex-wrap gap-3">
                      {job.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-kliqt-secondary/10 text-kliqt-secondary rounded-full font-medium hover:bg-kliqt-secondary/20 transition-colors cursor-pointer"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="kliqt-card">
                    <h2 className="text-xl font-bold mb-4">Project Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-center">
                        <DollarSign className="h-5 w-5 text-kliqt-secondary mr-3" />
                        <div>
                          <div className="font-medium">Budget</div>
                          <div className="text-gray-400">{formatBudget(job.budget_min, job.budget_max)}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-kliqt-secondary mr-3" />
                        <div>
                          <div className="font-medium">Location</div>
                          <div className="text-gray-400">{job.location || 'Remote'}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-kliqt-secondary mr-3" />
                        <div>
                          <div className="font-medium">Remote Work</div>
                          <div className="text-gray-400">{job.remote ? 'Yes' : 'No'}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-kliqt-secondary mr-3" />
                        <div>
                          <div className="font-medium">Posted</div>
                          <div className="text-gray-400">{formatTimeAgo(job.created_at!)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  className="sticky top-24"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Budget Card */}
                  <div className="kliqt-card mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-kliqt-secondary mb-2">
                        {formatBudget(job.budget_min, job.budget_max)}
                      </div>
                      <div className="text-gray-400 text-sm">Project Budget</div>
                    </div>
                  </div>

                  {/* Application Form */}
                  {job.type === 'wanted' && (
                    <div className="kliqt-card mb-6">
                      <h3 className="text-xl font-bold mb-4">Apply for this Job</h3>
                      <form onSubmit={handleApply} className="space-y-4">
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-2">
                            Cover Message *
                          </label>
                          <textarea
                            id="message"
                            value={applicationMessage}
                            onChange={(e) => setApplicationMessage(e.target.value)}
                            required
                            rows={4}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors resize-none"
                            placeholder="Tell the client why you're the perfect fit for this project..."
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium mb-2">
                            Your Proposed Budget (£)
                          </label>
                          <input
                            type="number"
                            id="budget"
                            value={proposedBudget}
                            onChange={(e) => setProposedBudget(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors"
                            placeholder="5000"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="portfolio" className="block text-sm font-medium mb-2">
                            Portfolio URL
                          </label>
                          <input
                            type="url"
                            id="portfolio"
                            value={portfolioUrl}
                            onChange={(e) => setPortfolioUrl(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors"
                            placeholder="https://your-portfolio.com"
                          />
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isApplying || !applicationMessage.trim()}
                          className="w-full kliqt-btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isApplying ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5 mr-2" />
                              Submit Application
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* Contact Card for Available Services */}
                  {job.type === 'available' && (
                    <div className="kliqt-card mb-6">
                      <h3 className="text-xl font-bold mb-4">Contact Freelancer</h3>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-kliqt-secondary mb-2">
                            {formatBudget(job.budget_min, job.budget_max)}
                          </div>
                          <div className="text-gray-400 text-sm">Per day rate</div>
                        </div>
                        <Link href="/portal" className="w-full kliqt-btn-primary flex items-center justify-center">
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </Link>
                        <Link href="/portal" className="w-full kliqt-btn-secondary flex items-center justify-center">
                          <Briefcase className="h-5 w-5 mr-2" />
                          Hire Now
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Stats Card */}
                  <div className="kliqt-card">
                    <h3 className="text-lg font-bold mb-4">Project Stats</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Views</span>
                        <span className="font-medium">{job.views}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Applications</span>
                        <span className="font-medium">{job.applications}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Remote OK</span>
                        <span className="font-medium">
                          {job.remote ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <span className="text-gray-400">No</span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Posted</span>
                        <span className="font-medium">{formatTimeAgo(job.created_at!)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}