/**
 * Freelancer Network Service Page
 * Showcases the curated freelancer marketplace and talent ecosystem
 */

'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users, Star, Shield, Clock, CheckCircle, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function FreelancerNetworkPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Pre-Vetted Talent",
      description: "Designers, developers, editors, and copywriters thoroughly screened for quality"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Real-Time Collaboration",
      description: "Live chat, project management tools, and seamless communication"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Transparent Reviews",
      description: "Honest feedback system with completion scores and client testimonials"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Turnaround",
      description: "Quick matching and project delivery with guaranteed timelines"
    }
  ]

  const talentCategories = [
    {
      title: "Creative Design",
      skills: ["UI/UX Design", "Graphic Design", "Brand Identity", "Illustration"],
      count: "50+ Designers"
    },
    {
      title: "Development",
      skills: ["React/Next.js", "Node.js", "Python", "Mobile Apps"],
      count: "30+ Developers"
    },
    {
      title: "Content Creation",
      skills: ["Video Editing", "Copywriting", "Social Media", "Photography"],
      count: "40+ Creators"
    },
    {
      title: "Marketing",
      skills: ["SEO", "PPC", "Social Strategy", "Analytics"],
      count: "25+ Marketers"
    }
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
              <Users className="w-8 h-8 text-kliqt-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Freelancer <span className="neon-text">Network</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join our curated marketplace of specialists. Whether you're launching a product or editing reels,
              KLIQT freelancers deliver on time and on brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portal" className="kliqt-btn-primary kliqt-hover-lift group">
                Explore the Talent Portal
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/jobs" className="kliqt-btn-secondary kliqt-hover-lift">
                Browse Job Board
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
              Why Choose <span className="neon-text">KLIQT</span> Freelancers?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Quality-guaranteed, project-ready talent with transparent processes
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

      {/* Talent Categories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-kliqt-dark">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="neon-text">Talent Pool</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Specialists across every discipline you need to grow your business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {talentCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="kliqt-card kliqt-hover-lift"
              >
                <h3 className="text-xl font-bold mb-3 text-kliqt-primary">{category.title}</h3>
                <div className="space-y-2 mb-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-kliqt-primary flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm text-kliqt-primary font-semibold">{category.count}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="neon-text">Works</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple process from project posting to completion
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Post Your Project",
                description: "Describe your needs, timeline, and budget. Our system matches you with relevant freelancers."
              },
              {
                step: "02",
                title: "Review & Select",
                description: "Browse proposals, check portfolios and reviews. Interview candidates and make your choice."
              },
              {
                step: "03",
                title: "Collaborate & Deliver",
                description: "Work together using our collaboration tools. Track progress and receive your completed project."
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

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-kliqt-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "150+", label: "Active Freelancers" },
              { number: "98%", label: "Client Satisfaction" },
              { number: "24h", label: "Average Response Time" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-kliqt-primary mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
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
              Ready to Find Your <span className="neon-text">Perfect</span> Freelancer?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join hundreds of businesses who trust KLIQT's freelancer network for their projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portal" className="kliqt-btn-primary kliqt-hover-lift">
                Start Your Project
              </Link>
              <Link href="/jobs" className="kliqt-btn-secondary kliqt-hover-lift">
                Browse Available Talent
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}