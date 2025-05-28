/**
 * Clients Page
 * Platform for clients to post projects and find talent
 */

'use client'

import { motion } from 'framer-motion'
import { 
  Bot, 
  Search, 
  Star, 
  Users, 
  Clock, 
  Shield,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
  Award,
  Globe,
  Briefcase,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'

const successStories = [
  {
    id: 1,
    company: "TechStart Solutions",
    project: "E-commerce Platform",
    result: "300% increase in online sales",
    testimonial: "KLIQT Media connected us with amazing developers who delivered beyond expectations.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    name: "David Chen",
    position: "CTO",
    rating: 5.0,
    budget: "£15,000",
    timeline: "8 weeks"
  },
  {
    id: 2,
    company: "FitLife App",
    project: "Mobile App Design",
    result: "50K+ downloads in first month",
    testimonial: "The UI/UX designer we found created an intuitive and beautiful app interface.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    name: "Sarah Johnson",
    position: "Product Manager",
    rating: 4.9,
    budget: "£8,500",
    timeline: "4 weeks"
  },
  {
    id: 3,
    company: "CustomerCare Pro",
    project: "AI Chatbot Development",
    result: "80% reduction in support tickets",
    testimonial: "The AI chatbot has revolutionized our customer service operations.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Michael Rodriguez",
    position: "Operations Director",
    rating: 5.0,
    budget: "£12,000",
    timeline: "6 weeks"
  }
]

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites, web apps, and e-commerce solutions",
    skills: ["React", "Node.js", "WordPress", "Shopify"],
    startingPrice: "£500"
  },
  {
    icon: Bot,
    title: "Mobile Development",
    description: "iOS and Android apps with modern UI/UX design",
    skills: ["React Native", "Flutter", "Swift", "Kotlin"],
    startingPrice: "£1,200"
  },
  {
    icon: Target,
    title: "AI & Machine Learning",
    description: "Intelligent solutions and automation systems",
    skills: ["Python", "TensorFlow", "OpenAI", "Computer Vision"],
    startingPrice: "£2,000"
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "SEO, social media, and growth marketing strategies",
    skills: ["SEO", "Google Ads", "Social Media", "Analytics"],
    startingPrice: "£300"
  },
  {
    icon: Award,
    title: "Design & Branding",
    description: "Logo design, branding, and visual identity",
    skills: ["Figma", "Adobe Creative", "Branding", "UI/UX"],
    startingPrice: "£400"
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description: "Security audits, penetration testing, and compliance",
    skills: ["Security Audit", "Penetration Testing", "GDPR", "ISO 27001"],
    startingPrice: "£800"
  }
]

export default function ClientsPage() {
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
              <Link href="/clients" className="text-kliqt-primary">Clients</Link>
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
                  <Bot className="h-16 w-16 text-kliqt-secondary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Find Top{' '}
                <span className="neon-text">Talent</span>{' '}
                for Your Project
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Connect with skilled freelancers and agencies on KLIQT Media. 
                From web development to AI solutions, find the perfect match for your project.
              </p>
              
              {/* Quick Start */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Link href="/portal" className="kliqt-btn-primary flex-1 text-lg py-4">
                  Post a Project
                </Link>
                <Link href="#services" className="kliqt-btn-secondary flex-1 text-lg py-4">
                  Browse Services
                </Link>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">500+</div>
                <div className="text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">2,000+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">98%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-secondary mb-2">24/7</div>
                <div className="text-gray-400">Support</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Services</h2>
              <p className="text-xl text-gray-400">Find the right expertise for your project</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="kliqt-card hover:border-kliqt-secondary/50 transition-all cursor-pointer group"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-kliqt-secondary/10 rounded-xl mr-4">
                      <service.icon className="h-8 w-8 text-kliqt-secondary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-kliqt-secondary transition-colors">
                        {service.title}
                      </h3>
                      <div className="text-sm text-kliqt-secondary font-medium">
                        Starting at {service.startingPrice}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full text-kliqt-secondary hover:text-kliqt-secondary/80 transition-colors font-medium">
                    Find Freelancers →
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
              <p className="text-xl text-gray-400">See how our clients achieved their goals</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <motion.div
                  key={story.id}
                  className="kliqt-card"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={story.avatar}
                      alt={story.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-medium">{story.name}</div>
                      <div className="text-sm text-gray-400">{story.position}</div>
                      <div className="text-sm font-medium text-kliqt-secondary">{story.company}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(story.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-400">({story.rating})</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2">{story.project}</h3>
                  <div className="text-kliqt-secondary font-medium mb-3">{story.result}</div>
                  
                  <p className="text-gray-400 mb-4 italic">"{story.testimonial}"</p>
                  
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Budget: {story.budget}</span>
                    <span>Timeline: {story.timeline}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-400">Get your project done in 4 simple steps</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "1",
                  icon: Briefcase,
                  title: "Post Your Project",
                  description: "Describe your project requirements and budget"
                },
                {
                  step: "2",
                  icon: Users,
                  title: "Review Proposals",
                  description: "Receive proposals from qualified freelancers"
                },
                {
                  step: "3",
                  icon: CheckCircle,
                  title: "Hire & Collaborate",
                  description: "Choose the best freelancer and start working"
                },
                {
                  step: "4",
                  icon: DollarSign,
                  title: "Pay Securely",
                  description: "Release payment when you're satisfied with the work"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-kliqt-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-10 w-10 text-kliqt-secondary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-kliqt-secondary text-black rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose KLIQT Media?</h2>
              <p className="text-xl text-gray-400">We make hiring freelancers safe and easy</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Secure Payments",
                  description: "Your money is protected with our escrow system until you're satisfied"
                },
                {
                  icon: Star,
                  title: "Quality Guarantee",
                  description: "All freelancers are vetted and rated by previous clients"
                },
                {
                  icon: Clock,
                  title: "24/7 Support",
                  description: "Get help whenever you need it with our dedicated support team"
                },
                {
                  icon: Users,
                  title: "Global Talent Pool",
                  description: "Access thousands of skilled professionals from around the world"
                },
                {
                  icon: Target,
                  title: "Project Management",
                  description: "Built-in tools to track progress and communicate effectively"
                },
                {
                  icon: TrendingUp,
                  title: "Scalable Solutions",
                  description: "From small tasks to large projects, we've got you covered"
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
              <Zap className="h-16 w-16 text-kliqt-secondary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Next Project?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of successful clients who trust KLIQT Media for their projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/portal" className="kliqt-btn-primary text-lg px-8 py-4">
                  Post Your Project
                </Link>
                <Link href="/freelancers" className="kliqt-btn-secondary text-lg px-8 py-4">
                  Browse Freelancers
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}