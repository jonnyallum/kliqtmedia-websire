/**
 * AI Tools Page
 * Automation and smart workflows powered by AI
 */

'use client'

import { motion } from 'framer-motion'
import { 
  Settings, 
  Bot, 
  Zap,
  Brain,
  Code,
  MessageSquare,
  Image,
  FileText,
  Search,
  ArrowRight,
  CheckCircle,
  Star,
  Play,
  Sparkles,
  Cpu,
  Database,
  Globe,
  Shield,
  Clock,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'

const aiTools = [
  {
    id: 1,
    name: "KLIQT Assistant",
    description: "AI-powered project management and task automation",
    category: "Productivity",
    icon: Bot,
    features: ["Smart scheduling", "Task prioritization", "Progress tracking", "Team coordination"],
    pricing: "£29/month",
    rating: 4.9,
    users: "12K+",
    color: "kliqt-primary"
  },
  {
    id: 2,
    name: "Code Generator",
    description: "Generate high-quality code from natural language descriptions",
    category: "Development",
    icon: Code,
    features: ["Multi-language support", "Best practices", "Documentation", "Testing"],
    pricing: "£49/month",
    rating: 4.8,
    users: "8.5K+",
    color: "blue-400"
  },
  {
    id: 3,
    name: "Content Creator",
    description: "AI-powered content generation for marketing and social media",
    category: "Marketing",
    icon: FileText,
    features: ["Blog posts", "Social media", "Email campaigns", "SEO optimization"],
    pricing: "£39/month",
    rating: 4.7,
    users: "15K+",
    color: "purple-400"
  },
  {
    id: 4,
    name: "Design Studio",
    description: "Create stunning visuals and graphics with AI assistance",
    category: "Design",
    icon: Image,
    features: ["Logo design", "Brand assets", "Social graphics", "Image editing"],
    pricing: "£59/month",
    rating: 4.9,
    users: "6.2K+",
    color: "pink-400"
  },
  {
    id: 5,
    name: "Smart Chat",
    description: "Intelligent customer service chatbot with natural language processing",
    category: "Customer Service",
    icon: MessageSquare,
    features: ["24/7 support", "Multi-language", "Integration ready", "Analytics"],
    pricing: "£79/month",
    rating: 4.8,
    users: "4.8K+",
    color: "green-400"
  },
  {
    id: 6,
    name: "Data Analyzer",
    description: "Advanced analytics and insights powered by machine learning",
    category: "Analytics",
    icon: Database,
    features: ["Predictive analytics", "Pattern recognition", "Custom reports", "Real-time insights"],
    pricing: "£99/month",
    rating: 4.9,
    users: "3.1K+",
    color: "orange-400"
  }
]

const useCases = [
  {
    title: "Automate Repetitive Tasks",
    description: "Let AI handle routine work so you can focus on what matters most",
    icon: Zap,
    examples: ["Data entry", "Email responses", "Report generation", "Social media posting"]
  },
  {
    title: "Enhance Creativity",
    description: "Use AI as your creative partner to generate ideas and content",
    icon: Sparkles,
    examples: ["Content writing", "Design concepts", "Marketing campaigns", "Product ideas"]
  },
  {
    title: "Improve Decision Making",
    description: "Make data-driven decisions with AI-powered insights and predictions",
    icon: Brain,
    examples: ["Market analysis", "Risk assessment", "Performance optimization", "Trend forecasting"]
  },
  {
    title: "Scale Your Business",
    description: "Handle more work without hiring more people using intelligent automation",
    icon: TrendingUp,
    examples: ["Customer support", "Lead qualification", "Content moderation", "Quality assurance"]
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    company: "TechStart Ltd",
    role: "CTO",
    content: "KLIQT's AI tools have revolutionized our development process. We're shipping features 3x faster.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Marcus Johnson",
    company: "Creative Agency",
    role: "Creative Director",
    content: "The Design Studio AI has become an essential part of our creative workflow. Incredible results!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    company: "E-commerce Plus",
    role: "Marketing Manager",
    content: "Content Creator AI helps us maintain consistent, high-quality content across all our channels.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5
  }
]

export default function AIToolsPage() {
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
              <Link href="/ai-tools" className="text-kliqt-primary">AI Tools</Link>
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
                  <Settings className="h-16 w-16 text-kliqt-secondary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                AI-Powered{' '}
                <span className="neon-text">Automation</span>{' '}
                Tools
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Supercharge your workflow with cutting-edge AI tools. Automate tasks, 
                enhance creativity, and scale your business with intelligent solutions.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="#tools" className="kliqt-btn-primary text-lg px-8 py-4">
                  Explore AI Tools
                </Link>
                <button className="kliqt-btn-secondary text-lg px-8 py-4 flex items-center justify-center">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">50K+</div>
                <div className="text-gray-400">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">1M+</div>
                <div className="text-gray-400">Tasks Automated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">24/7</div>
                <div className="text-gray-400">AI Support</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI Tools Grid */}
        <section id="tools" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our AI Tool Suite</h2>
              <p className="text-xl text-gray-400">Powerful AI solutions for every aspect of your business</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  className="kliqt-card hover:border-kliqt-secondary/50 transition-all cursor-pointer group"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-${tool.color}/10 rounded-xl`}>
                      <tool.icon className={`h-8 w-8 text-${tool.color}`} />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm text-yellow-400">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        {tool.rating}
                      </div>
                      <div className="text-xs text-gray-400">{tool.users} users</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-kliqt-secondary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{tool.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">{tool.category}</div>
                    <div className="flex flex-wrap gap-1">
                      {tool.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {tool.features.length > 2 && (
                        <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                          +{tool.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-kliqt-secondary">{tool.pricing}</div>
                    <button className="text-kliqt-secondary hover:text-kliqt-secondary/80 transition-colors">
                      Try Free →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Can AI Do for You?</h2>
              <p className="text-xl text-gray-400">Discover the possibilities with AI automation</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  className="kliqt-card"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-kliqt-secondary/10 rounded-xl flex-shrink-0">
                      <useCase.icon className="h-8 w-8 text-kliqt-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                      <p className="text-gray-400 mb-4">{useCase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {useCase.examples.map((example) => (
                          <span
                            key={example}
                            className="px-3 py-1 bg-kliqt-secondary/10 text-kliqt-secondary text-sm rounded-full"
                          >
                            {example}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-xl text-gray-400">Real results from real businesses</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="kliqt-card text-center"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4"
                  />
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-400 mb-4 italic">"{testimonial.content}"</p>
                  
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-sm text-kliqt-secondary">{testimonial.company}</div>
                  </div>
                </motion.div>
              ))}
            </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KLIQT AI?</h2>
              <p className="text-xl text-gray-400">Built for performance, security, and scale</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Cpu,
                  title: "Advanced AI Models",
                  description: "Powered by the latest GPT and machine learning technologies"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-level encryption and compliance with industry standards"
                },
                {
                  icon: Globe,
                  title: "Global Infrastructure",
                  description: "Fast, reliable service with 99.9% uptime guarantee"
                },
                {
                  icon: Zap,
                  title: "Lightning Fast",
                  description: "Optimized for speed with sub-second response times"
                },
                {
                  icon: Settings,
                  title: "Easy Integration",
                  description: "Simple APIs and plugins for seamless workflow integration"
                },
                {
                  icon: Clock,
                  title: "24/7 Support",
                  description: "Round-the-clock assistance from our expert team"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-kliqt-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-kliqt-secondary" />
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
              <Bot className="h-16 w-16 text-kliqt-secondary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Automate Your Workflow?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Start your AI journey today with a free trial of our most popular tools.
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