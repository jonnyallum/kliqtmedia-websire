/**
 * Analytics Page
 * Real-time insights and reporting dashboard
 */

'use client'

import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign,
  Clock,
  Target,
  Eye,
  MousePointer,
  Zap,
  ArrowRight,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react'
import Link from 'next/link'

const analyticsData = {
  overview: {
    totalRevenue: 125000,
    revenueGrowth: 23.5,
    activeProjects: 47,
    projectsGrowth: 12.3,
    totalUsers: 2847,
    usersGrowth: 18.7,
    conversionRate: 4.2,
    conversionGrowth: -2.1
  },
  recentMetrics: [
    { label: "Page Views", value: "12,847", change: "+15.3%", trend: "up" },
    { label: "Unique Visitors", value: "3,421", change: "+8.7%", trend: "up" },
    { label: "Bounce Rate", value: "32.1%", change: "-5.2%", trend: "down" },
    { label: "Avg. Session", value: "4m 23s", change: "+12.4%", trend: "up" },
    { label: "New Signups", value: "156", change: "+28.9%", trend: "up" },
    { label: "Project Completions", value: "89", change: "+6.1%", trend: "up" }
  ],
  topPages: [
    { page: "/freelancers", views: 4521, percentage: 35.2 },
    { page: "/clients", views: 3847, percentage: 29.9 },
    { page: "/pricing", views: 2156, percentage: 16.8 },
    { page: "/portal", views: 1834, percentage: 14.3 },
    { page: "/ai-tools", views: 489, percentage: 3.8 }
  ],
  userFlow: [
    { step: "Landing Page", users: 1000, conversion: 100 },
    { step: "Browse Services", users: 750, conversion: 75 },
    { step: "View Pricing", users: 450, conversion: 45 },
    { step: "Sign Up", users: 180, conversion: 18 },
    { step: "First Project", users: 89, conversion: 8.9 }
  ]
}

export default function AnalyticsPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
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
              <Link href="/analytics" className="text-kliqt-primary">Analytics</Link>
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
                <div className="p-4 bg-kliqt-primary/10 rounded-2xl">
                  <BarChart3 className="h-16 w-16 text-kliqt-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Real-time{' '}
                <span className="neon-text">Analytics</span>{' '}
                & Insights
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Make data-driven decisions with comprehensive analytics and reporting. 
                Track performance, understand user behavior, and optimize your business.
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="kliqt-btn-primary flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Refresh Data
                </button>
                <button className="kliqt-btn-secondary flex items-center justify-center">
                  <Download className="h-5 w-5 mr-2" />
                  Export Report
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="kliqt-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-400" />
                  </div>
                  <div className={`flex items-center text-sm ${
                    analyticsData.overview.revenueGrowth > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {analyticsData.overview.revenueGrowth > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(analyticsData.overview.revenueGrowth)}%
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {formatCurrency(analyticsData.overview.totalRevenue)}
                </div>
                <div className="text-sm text-gray-400">Total Revenue</div>
              </div>

              <div className="kliqt-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Target className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className={`flex items-center text-sm ${
                    analyticsData.overview.projectsGrowth > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {analyticsData.overview.projectsGrowth > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(analyticsData.overview.projectsGrowth)}%
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {analyticsData.overview.activeProjects}
                </div>
                <div className="text-sm text-gray-400">Active Projects</div>
              </div>

              <div className="kliqt-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <div className={`flex items-center text-sm ${
                    analyticsData.overview.usersGrowth > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {analyticsData.overview.usersGrowth > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(analyticsData.overview.usersGrowth)}%
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {analyticsData.overview.totalUsers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Total Users</div>
              </div>

              <div className="kliqt-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-kliqt-primary/10 rounded-lg">
                    <MousePointer className="h-6 w-6 text-kliqt-primary" />
                  </div>
                  <div className={`flex items-center text-sm ${
                    analyticsData.overview.conversionGrowth > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {analyticsData.overview.conversionGrowth > 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(analyticsData.overview.conversionGrowth)}%
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">
                  {analyticsData.overview.conversionRate}%
                </div>
                <div className="text-sm text-gray-400">Conversion Rate</div>
              </div>
            </motion.div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {/* Recent Metrics */}
              <motion.div
                className="kliqt-card"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Recent Metrics</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    Last 30 days
                  </div>
                </div>
                
                <div className="space-y-4">
                  {analyticsData.recentMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div>
                        <div className="font-medium">{metric.label}</div>
                        <div className="text-2xl font-bold">{metric.value}</div>
                      </div>
                      <div className={`flex items-center text-sm ${
                        metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {metric.change}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Top Pages */}
              <motion.div
                className="kliqt-card"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Top Pages</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <Eye className="h-4 w-4 mr-1" />
                    Page views
                  </div>
                </div>
                
                <div className="space-y-4">
                  {analyticsData.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{page.page}</div>
                        <div className="w-full bg-gray-800 rounded-full h-2 mt-2">
                          <div 
                            className="bg-kliqt-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${page.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="font-bold">{page.views.toLocaleString()}</div>
                        <div className="text-sm text-gray-400">{page.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* User Flow */}
            <motion.div
              className="kliqt-card mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">User Conversion Flow</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <Activity className="h-4 w-4 mr-1" />
                  Conversion funnel
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {analyticsData.userFlow.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="relative">
                      <div className="w-full bg-gray-800 rounded-lg p-4 mb-2">
                        <div className="text-2xl font-bold text-kliqt-primary mb-1">
                          {step.users}
                        </div>
                        <div className="text-sm text-gray-400">{step.step}</div>
                      </div>
                      <div className="text-sm font-medium">
                        {step.conversion}% conversion
                      </div>
                      {index < analyticsData.userFlow.length - 1 && (
                        <ArrowRight className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Analytics Features</h2>
              <p className="text-xl text-gray-400">Comprehensive insights to grow your business</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: BarChart3,
                  title: "Real-time Dashboard",
                  description: "Monitor your business metrics in real-time with live updates"
                },
                {
                  icon: PieChart,
                  title: "Custom Reports",
                  description: "Create custom reports tailored to your specific business needs"
                },
                {
                  icon: LineChart,
                  title: "Trend Analysis",
                  description: "Identify patterns and trends to make informed decisions"
                },
                {
                  icon: Users,
                  title: "User Behavior",
                  description: "Understand how users interact with your platform"
                },
                {
                  icon: Target,
                  title: "Goal Tracking",
                  description: "Set and track business goals with detailed progress reports"
                },
                {
                  icon: Zap,
                  title: "Performance Insights",
                  description: "Optimize performance with detailed speed and usage analytics"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="kliqt-card text-center hover:border-kliqt-primary/50 transition-all"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-kliqt-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-kliqt-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
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
              <BarChart3 className="h-16 w-16 text-kliqt-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Unlock Your Data?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Get started with KLIQT Analytics and make data-driven decisions for your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/portal" className="kliqt-btn-primary text-lg px-8 py-4">
                  Start Free Trial
                </Link>
                <Link href="/pricing" className="kliqt-btn-secondary text-lg px-8 py-4">
                  View Pricing
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}