/**
 * Jobs Board Page
 * Browse and filter job listings for KLIQT Media platform
 */

'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
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
  ChevronDown,
  ExternalLink
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
  created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
}))

const categories = [
  'All Categories',
  'Web Development',
  'Mobile Apps',
  'Design',
  'Marketing',
  'Video Editing',
  'AI & Automation',
  'E-commerce',
  'Content Writing'
]

const jobTypes = ['All Types', 'wanted', 'available']

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedType, setSelectedType] = useState('All Types')
  const [sortBy, setSortBy] = useState('newest')
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let filtered = mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           job.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'All Categories' || job.category === selectedCategory
      const matchesType = selectedType === 'All Types' || job.type === selectedType

      return matchesSearch && matchesCategory && matchesType
    })

    // Sort jobs
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
        break
      case 'budget_high':
        filtered.sort((a, b) => (b.budget_max || 0) - (a.budget_max || 0))
        break
      case 'budget_low':
        filtered.sort((a, b) => (a.budget_min || 0) - (b.budget_min || 0))
        break
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
    }

    return filtered
  }, [searchTerm, selectedCategory, selectedType, sortBy])

  const featuredJobs = mockJobs.filter(job => job.featured).slice(0, 3)

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

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
        {/* Hero Section */}
        <section className="py-20 kliqt-gradient-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-kliqt-secondary/10 rounded-2xl">
                  <Briefcase className="h-16 w-16 text-kliqt-secondary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Find Your Next{' '}
                <span className="neon-text">Project</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Discover high-quality projects and talented freelancers on KLIQT Media. 
                Connect, collaborate, and create amazing work together.
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              className="max-w-4xl mx-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs, skills, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors text-lg"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="kliqt-btn-secondary flex items-center justify-center px-6 py-4 md:w-auto"
                >
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </button>
              </div>

              {/* Filters */}
              {showFilters && (
                <motion.div
                  className="mt-6 p-6 bg-gray-800/50 rounded-xl border border-gray-700"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        aria-label="Filter by category"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Type</label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        aria-label="Filter by job type"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors"
                      >
                        {jobTypes.map(type => (
                          <option key={type} value={type}>
                            {type === 'All Types' ? 'All Types' : 
                             type === 'wanted' ? 'Jobs Wanted' : 'Services Available'}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        aria-label="Sort jobs by"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors"
                      >
                        <option value="newest">Newest First</option>
                        <option value="budget_high">Highest Budget</option>
                        <option value="budget_low">Lowest Budget</option>
                        <option value="popular">Most Popular</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Featured Jobs Banner */}
        {featuredJobs.length > 0 && (
          <section className="py-16 bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                className="text-center mb-12"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <Star className="inline h-8 w-8 text-kliqt-secondary mr-3" />
                  Featured Projects
                </h2>
                <p className="text-xl text-gray-400">High-priority projects with great opportunities</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredJobs.map((job, index) => {
                  const CategoryIcon = categoryIcons[job.category] || Briefcase
                  return (
                    <motion.div
                      key={job.id}
                      className="kliqt-card hover:border-kliqt-secondary/50 transition-all cursor-pointer group"
                      variants={fadeInUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="p-2 bg-kliqt-secondary/10 rounded-lg mr-3">
                            <CategoryIcon className="h-6 w-6 text-kliqt-secondary" />
                          </div>
                          <span className="text-sm text-kliqt-secondary font-medium">{job.category}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          job.type === 'wanted' 
                            ? 'bg-blue-500/10 text-blue-400' 
                            : 'bg-green-500/10 text-green-400'
                        }`}>
                          {job.type === 'wanted' ? 'Wanted' : 'Available'}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold mb-3 group-hover:text-kliqt-secondary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.slice(0, 3).map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {job.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                            +{job.tags.length - 3} more
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {job.views}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {job.applications}
                          </div>
                        </div>
                        <div className="text-kliqt-secondary font-medium">
                          {formatBudget(job.budget_min, job.budget_max)}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Job Listings */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                All Jobs ({filteredJobs.length})
              </h2>
              <div className="text-sm text-gray-400">
                Showing {filteredJobs.length} of {mockJobs.length} jobs
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <motion.div
                className="text-center py-16"
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6 }}
              >
                <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search criteria or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedCategory('All Categories')
                    setSelectedType('All Types')
                  }}
                  className="kliqt-btn-secondary"
                >
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {filteredJobs.map((job, index) => {
                  const CategoryIcon = categoryIcons[job.category] || Briefcase
                  return (
                    <motion.div
                      key={job.id}
                      className="kliqt-card hover:border-kliqt-secondary/50 transition-all cursor-pointer group"
                      variants={fadeInUp}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <div className="p-2 bg-kliqt-secondary/10 rounded-lg mr-3">
                                <CategoryIcon className="h-6 w-6 text-kliqt-secondary" />
                              </div>
                              <div>
                                <span className="text-sm text-kliqt-secondary font-medium">{job.category}</span>
                                <div className="flex items-center space-x-2 text-xs text-gray-400">
                                  <Clock className="h-3 w-3" />
                                  <span>{formatTimeAgo(job.created_at!)}</span>
                                  {job.location && (
                                    <>
                                      <span>•</span>
                                      <MapPin className="h-3 w-3" />
                                      <span>{job.location}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {job.featured && (
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              )}
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                job.type === 'wanted' 
                                  ? 'bg-blue-500/10 text-blue-400' 
                                  : 'bg-green-500/10 text-green-400'
                              }`}>
                                {job.type === 'wanted' ? 'Wanted' : 'Available'}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold mb-3 group-hover:text-kliqt-secondary transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-gray-400 mb-4 line-clamp-2">
                            {job.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded hover:bg-kliqt-secondary/10 hover:text-kliqt-secondary transition-colors cursor-pointer"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="lg:ml-8 lg:text-right">
                          <div className="text-2xl font-bold text-kliqt-secondary mb-2">
                            {formatBudget(job.budget_min, job.budget_max)}
                          </div>
                          <div className="flex lg:justify-end items-center space-x-4 text-sm text-gray-400 mb-4">
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {job.views} views
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {job.applications} applications
                            </div>
                          </div>
                          <Link
                            href={`/jobs/${job.id}`}
                            className="kliqt-btn-primary inline-flex items-center"
                          >
                            View Details
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 kliqt-gradient-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Briefcase className="h-16 w-16 text-kliqt-secondary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Next Project?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of freelancers and clients already using KLIQT Media to find great work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/portal" className="kliqt-btn-primary text-lg px-8 py-4">
                  Post a Job
                </Link>
                <Link href="/freelancers" className="kliqt-btn-secondary text-lg px-8 py-4">
                  Find Freelancers
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}