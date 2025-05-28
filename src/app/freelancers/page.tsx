/**
 * Freelancers Page
 * Platform for freelancers to find projects and manage their work
 */

'use client'

import { motion } from 'framer-motion'
import { 
  Users, 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign,
  Filter,
  Briefcase,
  Award,
  TrendingUp,
  ArrowRight,
  CheckCircle,
  Zap
} from 'lucide-react'
import Link from 'next/link'

const featuredProjects = [
  {
    id: 1,
    title: "E-commerce Website Development",
    description: "Build a modern e-commerce platform with React and Node.js",
    budget: "£2,500 - £5,000",
    duration: "4-6 weeks",
    skills: ["React", "Node.js", "MongoDB", "Stripe"],
    client: "TechStart Ltd",
    rating: 4.9,
    location: "Remote",
    posted: "2 hours ago"
  },
  {
    id: 2,
    title: "Mobile App UI/UX Design",
    description: "Design a sleek mobile app interface for fitness tracking",
    budget: "£1,200 - £2,000",
    duration: "2-3 weeks",
    skills: ["Figma", "UI/UX", "Mobile Design", "Prototyping"],
    client: "FitLife App",
    rating: 4.8,
    location: "London, UK",
    posted: "5 hours ago"
  },
  {
    id: 3,
    title: "AI Chatbot Development",
    description: "Create an intelligent customer service chatbot using OpenAI",
    budget: "£3,000 - £6,000",
    duration: "6-8 weeks",
    skills: ["Python", "OpenAI", "NLP", "API Integration"],
    client: "CustomerCare Pro",
    rating: 5.0,
    location: "Remote",
    posted: "1 day ago"
  }
]

const topFreelancers = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Full-Stack Developer",
    rating: 4.9,
    reviews: 127,
    hourlyRate: "£45/hr",
    skills: ["React", "Node.js", "Python", "AWS"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    completedProjects: 89,
    location: "Manchester, UK"
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "UI/UX Designer",
    rating: 4.8,
    reviews: 94,
    hourlyRate: "£38/hr",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    completedProjects: 76,
    location: "London, UK"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "AI/ML Engineer",
    rating: 5.0,
    reviews: 52,
    hourlyRate: "£65/hr",
    skills: ["Python", "TensorFlow", "PyTorch", "OpenAI"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    completedProjects: 34,
    location: "Remote"
  }
]

export default function FreelancersPage() {
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
              <Link href="/freelancers" className="text-kliqt-primary">Freelancers</Link>
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
                  <Users className="h-16 w-16 text-kliqt-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Find Your Next{' '}
                <span className="neon-text">Dream Project</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join thousands of talented freelancers on KLIQT Media. Discover high-quality projects, 
                build your reputation, and grow your freelance career.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search projects, skills, or keywords..."
                      className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none text-lg"
                    />
                  </div>
                  <button className="kliqt-btn-primary px-8 py-4 text-lg">
                    Search Projects
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-primary mb-2">2,500+</div>
                <div className="text-gray-400">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-primary mb-2">15,000+</div>
                <div className="text-gray-400">Freelancers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-primary mb-2">£2.5M+</div>
                <div className="text-gray-400">Paid Out</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-kliqt-primary mb-2">4.9★</div>
                <div className="text-gray-400">Average Rating</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Projects */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-xl text-gray-400">High-quality projects from verified clients</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="kliqt-card hover:border-kliqt-primary/50 transition-all cursor-pointer group"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-400">{project.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">{project.posted}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-kliqt-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-4 w-4 text-green-400 mr-2" />
                      <span className="text-green-400 font-medium">{project.budget}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-blue-400 mr-2" />
                      <span className="text-gray-300">{project.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-gray-300">{project.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-kliqt-primary/10 text-kliqt-primary text-xs rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">by {project.client}</span>
                    <button className="text-kliqt-primary hover:text-kliqt-primary/80 transition-colors">
                      Apply Now →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/projects" className="kliqt-btn-primary inline-flex items-center">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Top Freelancers */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Top Freelancers</h2>
              <p className="text-xl text-gray-400">Connect with our highest-rated talent</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topFreelancers.map((freelancer, index) => (
                <motion.div
                  key={freelancer.id}
                  className="kliqt-card text-center hover:border-kliqt-primary/50 transition-all cursor-pointer group"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="relative mb-6">
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-kliqt-primary/30"
                    />
                    <div className="absolute -top-2 -right-2 bg-kliqt-primary text-black rounded-full p-1">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-kliqt-primary transition-colors">
                    {freelancer.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{freelancer.title}</p>
                  
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{freelancer.rating}</span>
                      <span className="text-xs text-gray-400 ml-1">({freelancer.reviews})</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {freelancer.location}
                    </div>
                  </div>
                  
                  <div className="text-center mb-4">
                    <div className="text-lg font-bold text-kliqt-primary">{freelancer.hourlyRate}</div>
                    <div className="text-sm text-gray-400">{freelancer.completedProjects} projects completed</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 justify-center mb-6">
                    {freelancer.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full kliqt-btn-primary">
                    View Profile
                  </button>
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
              <p className="text-xl text-gray-400">Start your freelance journey in 3 simple steps</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  icon: Search,
                  title: "Find Projects",
                  description: "Browse thousands of projects that match your skills and interests"
                },
                {
                  step: "2",
                  icon: Briefcase,
                  title: "Submit Proposals",
                  description: "Write compelling proposals and showcase your expertise to clients"
                },
                {
                  step: "3",
                  icon: Award,
                  title: "Get Paid",
                  description: "Complete projects, build your reputation, and receive secure payments"
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
                    <div className="w-20 h-20 bg-kliqt-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-10 w-10 text-kliqt-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-kliqt-primary text-black rounded-full flex items-center justify-center font-bold text-sm">
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
              <Zap className="h-16 w-16 text-kliqt-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Freelance Journey?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join KLIQT Media today and connect with clients who value quality work.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/portal" className="kliqt-btn-primary text-lg px-8 py-4">
                  Sign Up as Freelancer
                </Link>
                <Link href="/projects" className="kliqt-btn-secondary text-lg px-8 py-4">
                  Browse Projects
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}