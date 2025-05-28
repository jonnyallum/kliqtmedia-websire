/**
 * Agent-Powered Platforms Service Page
 * Showcases custom AI agents and automation platform solutions
 */

'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Bot, Cpu, Zap, Settings, CheckCircle, Code, Database } from 'lucide-react'
import Link from 'next/link'

export default function AgentPoweredPlatformsPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Chatbot & Content Agents",
      description: "Custom GPT-powered agents for customer service, content generation, and task automation"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Workflow Automation",
      description: "n8n + Supabase integration for complex business process automation"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "API Integrations",
      description: "Connect your existing tools and services with intelligent automation layers"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Full-Stack Agent Dashboards",
      description: "Complete management interfaces for monitoring and controlling your AI agents"
    }
  ]

  const platforms = [
    {
      title: "Customer Service Agents",
      description: "24/7 intelligent support with escalation to human agents",
      features: ["Multi-language support", "CRM integration", "Sentiment analysis", "Ticket routing"],
      pricing: "From £500/month"
    },
    {
      title: "Content Generation Platforms",
      description: "Automated content creation for blogs, social media, and marketing",
      features: ["Brand voice training", "SEO optimization", "Multi-platform publishing", "Performance tracking"],
      pricing: "From £750/month"
    },
    {
      title: "Business Process Automation",
      description: "End-to-end workflow automation for repetitive business tasks",
      features: ["Data processing", "Report generation", "Email automation", "Integration APIs"],
      pricing: "From £1000/month"
    },
    {
      title: "White-Label AI Solutions",
      description: "Complete AI platforms you can brand and resell to your clients",
      features: ["Custom branding", "Client management", "Usage analytics", "Revenue sharing"],
      pricing: "Custom pricing"
    }
  ]

  const techStack = [
    { name: "OpenAI GPT-4", description: "Advanced language models" },
    { name: "n8n", description: "Workflow automation" },
    { name: "Supabase", description: "Database & real-time sync" },
    { name: "Next.js", description: "Full-stack framework" },
    { name: "Tailwind CSS", description: "Responsive design" },
    { name: "Vercel", description: "Deployment & hosting" }
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
              <Cpu className="w-8 h-8 text-kliqt-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Agent-Powered <span className="neon-text">Platforms</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Custom-built GPT + automation agents tailored to your workflow. We design, deploy, and maintain
              white-label AI systems you can operate or resell.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing#agents" className="kliqt-btn-primary kliqt-hover-lift group">
                Request a Custom Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact" className="kliqt-btn-secondary kliqt-hover-lift">
                Schedule Consultation
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
              What We <span className="neon-text">Build</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive AI agent solutions for every business need
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

      {/* Platform Solutions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-kliqt-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Platform <span className="neon-text">Solutions</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Ready-to-deploy AI platforms for different business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="kliqt-card kliqt-hover-lift"
              >
                <h3 className="text-2xl font-bold mb-3 text-kliqt-primary">{platform.title}</h3>
                <p className="text-gray-300 mb-4">{platform.description}</p>
                <div className="space-y-2 mb-6">
                  {platform.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-kliqt-primary flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-kliqt-primary font-bold">{platform.pricing}</span>
                  <Link href="/contact" className="text-kliqt-primary hover:underline text-sm">
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="neon-text">Tech Stack</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built with cutting-edge technologies for maximum performance and scalability
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="kliqt-card kliqt-hover-lift"
              >
                <h3 className="text-lg font-bold mb-2 text-kliqt-primary">{tech.name}</h3>
                <p className="text-gray-400 text-sm">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-kliqt-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="neon-text">Process</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From concept to deployment, we handle every aspect of your AI platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery & Planning",
                description: "We analyze your business needs and design the perfect AI solution architecture."
              },
              {
                step: "02",
                title: "Development & Training",
                description: "Custom agent development with your specific data and business logic training."
              },
              {
                step: "03",
                title: "Testing & Optimization",
                description: "Rigorous testing and performance optimization before deployment."
              },
              {
                step: "04",
                title: "Deploy & Maintain",
                description: "Full deployment with ongoing monitoring, updates, and support."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-kliqt-primary/20 rounded-full mb-6">
                  <span className="text-2xl font-bold text-kliqt-primary">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
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
              Ready to Build Your <span className="neon-text">AI Platform</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Let's discuss your vision and create a custom AI solution that transforms your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing#agents" className="kliqt-btn-primary kliqt-hover-lift">
                Request Custom Quote
              </Link>
              <Link href="/contact" className="kliqt-btn-secondary kliqt-hover-lift">
                Schedule Strategy Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}