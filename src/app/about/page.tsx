/**
 * About Page
 * Company story, mission, and team information
 */

'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Target, 
  Zap,
  Award,
  Globe,
  Heart,
  Lightbulb,
  Rocket,
  Shield,
  TrendingUp,
  Code,
  Palette,
  Bot,
  Star
} from 'lucide-react'
import Link from 'next/link'

const teamMembers = [
  {
    name: "Alex Thompson",
    role: "Founder & CEO",
    bio: "Former tech lead at major UK agencies. Passionate about AI automation and creative workflows.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    skills: ["Strategy", "AI", "Leadership"]
  },
  {
    name: "Sarah Chen",
    role: "Head of AI Development",
    bio: "Machine learning expert with 8+ years building intelligent systems for content and automation.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    skills: ["Machine Learning", "Python", "AI Architecture"]
  },
  {
    name: "Marcus Rodriguez",
    role: "Creative Director",
    bio: "Award-winning designer and content strategist. Leads our creative team and freelancer network.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    skills: ["Design", "Content Strategy", "Branding"]
  },
  {
    name: "Emma Wilson",
    role: "Head of Operations",
    bio: "Operations specialist ensuring seamless project delivery and client satisfaction across all services.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    skills: ["Operations", "Project Management", "Client Success"]
  }
]

const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We push boundaries with cutting-edge AI and creative solutions that deliver real results."
  },
  {
    icon: Heart,
    title: "Human-Centered",
    description: "Technology serves people. We build tools that enhance human creativity, not replace it."
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Clear communication, honest pricing, and reliable delivery on every project."
  },
  {
    icon: Rocket,
    title: "Growth Mindset",
    description: "We're constantly learning, evolving, and helping our clients scale to new heights."
  }
]

const milestones = [
  {
    year: "2023",
    title: "KLIQT Media Founded",
    description: "Started with a vision to democratize AI-powered content creation for UK businesses."
  },
  {
    year: "2024",
    title: "Freelancer Network Launch",
    description: "Built a curated network of 50+ creative professionals and developers."
  },
  {
    year: "2024",
    title: "AI Tools Platform",
    description: "Launched our suite of AI automation tools, serving 500+ projects."
  },
  {
    year: "2025",
    title: "Portal System",
    description: "Released comprehensive client portal with analytics, billing, and project management."
  }
]

export default function AboutPage() {
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
              <Link href="/about" className="text-kliqt-primary">About</Link>
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
                  <Users className="h-16 w-16 text-kliqt-secondary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                About{' '}
                <span className="neon-text">KLIQT Media</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                We're on a mission to democratize AI-powered content creation and automation 
                for businesses across the UK. Founded by creators, built for creators.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">500+</div>
                <div className="text-gray-400">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">50+</div>
                <div className="text-gray-400">Creative Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">99%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">24/7</div>
                <div className="text-gray-400">AI-Powered Support</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-6">
                  <Target className="h-8 w-8 text-kliqt-secondary mr-3" />
                  <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-300 mb-6">
                  We believe that every business deserves access to cutting-edge AI tools and 
                  world-class creative talent. Our platform bridges the gap between innovative 
                  technology and human creativity.
                </p>
                <p className="text-lg text-gray-300 mb-8">
                  By combining intelligent automation with a curated network of freelancers, 
                  we help businesses scale faster, create better content, and focus on what 
                  they do best.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-kliqt-secondary">
                    <Zap className="h-5 w-5 mr-2" />
                    <span>AI-Powered Automation</span>
                  </div>
                  <div className="flex items-center text-kliqt-secondary">
                    <Globe className="h-5 w-5 mr-2" />
                    <span>UK-Based Excellence</span>
                  </div>
                  <div className="flex items-center text-kliqt-secondary">
                    <Award className="h-5 w-5 mr-2" />
                    <span>Quality Guaranteed</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="kliqt-card p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <Code className="h-12 w-12 text-kliqt-primary mx-auto mb-4" />
                      <h3 className="font-bold mb-2">AI Development</h3>
                      <p className="text-sm text-gray-400">Custom automation solutions</p>
                    </div>
                    <div className="text-center">
                      <Palette className="h-12 w-12 text-kliqt-secondary mx-auto mb-4" />
                      <h3 className="font-bold mb-2">Creative Services</h3>
                      <p className="text-sm text-gray-400">Expert design & content</p>
                    </div>
                    <div className="text-center">
                      <Bot className="h-12 w-12 text-kliqt-primary mx-auto mb-4" />
                      <h3 className="font-bold mb-2">Smart Automation</h3>
                      <p className="text-sm text-gray-400">Workflow optimization</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-kliqt-secondary mx-auto mb-4" />
                      <h3 className="font-bold mb-2">Growth Analytics</h3>
                      <p className="text-sm text-gray-400">Data-driven insights</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-xl text-gray-400">The principles that guide everything we do</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className="kliqt-card text-center"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-kliqt-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-kliqt-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-xl text-gray-400">The creative minds behind KLIQT Media</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
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
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                  <div className="text-kliqt-secondary font-medium mb-4">{member.role}</div>
                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-kliqt-secondary/10 text-kliqt-secondary text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
              <p className="text-xl text-gray-400">Key milestones in our growth story</p>
            </motion.div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-6"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-kliqt-secondary/10 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-kliqt-secondary" />
                    </div>
                  </div>
                  <div className="kliqt-card flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{milestone.title}</h3>
                      <span className="text-kliqt-secondary font-bold">{milestone.year}</span>
                    </div>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
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
              <Rocket className="h-16 w-16 text-kliqt-secondary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Work With Us?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join hundreds of businesses already scaling with KLIQT Media's AI-powered solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="kliqt-btn-primary text-lg px-8 py-4">
                  Get In Touch
                </Link>
                <Link href="/portal" className="kliqt-btn-secondary text-lg px-8 py-4">
                  View Our Portal
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}