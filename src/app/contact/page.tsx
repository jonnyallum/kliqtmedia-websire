/**
 * Contact Page
 * Contact form, company information, and support options
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Zap,
  CheckCircle,
  AlertCircle,
  Globe,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react'
import Link from 'next/link'

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email for detailed inquiries",
    contact: "hello@kliqtmedia.co.uk",
    action: "mailto:hello@kliqtmedia.co.uk"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    contact: "+44 20 7946 0958",
    action: "tel:+442079460958"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Instant support via our AI-powered chat",
    contact: "Available 24/7",
    action: "#chat"
  },
  {
    icon: Headphones,
    title: "Support Portal",
    description: "Access our comprehensive help center",
    contact: "Self-service options",
    action: "/portal"
  }
]

const officeInfo = {
  address: "123 Tech Hub Lane, London, EC2A 4DP",
  hours: "Monday - Friday: 9:00 AM - 6:00 PM GMT",
  timezone: "London, United Kingdom (GMT+0)"
}

const socialLinks = [
  { icon: Linkedin, href: "https://linkedin.com/company/kliqt-media", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/kliqtmedia", label: "Twitter" },
  { icon: Github, href: "https://github.com/kliqt-media", label: "GitHub" }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    service: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        service: 'general'
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
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
              <Link href="/about" className="hover:text-kliqt-primary transition-colors">About</Link>
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
                  <Mail className="h-16 w-16 text-kliqt-secondary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Get In{' '}
                <span className="neon-text">Touch</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Ready to transform your business with AI-powered solutions? 
                Let's discuss your project and explore how we can help you scale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods */}
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Can We Help?</h2>
              <p className="text-xl text-gray-400">Choose the best way to reach our team</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  className="kliqt-card text-center hover:border-kliqt-secondary/50 transition-all cursor-pointer group"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => {
                    if (method.action.startsWith('http') || method.action.startsWith('mailto') || method.action.startsWith('tel')) {
                      window.open(method.action, '_blank')
                    }
                  }}
                >
                  <div className="w-16 h-16 bg-kliqt-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-kliqt-secondary/20 transition-colors">
                    <method.icon className="h-8 w-8 text-kliqt-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-kliqt-secondary transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{method.description}</p>
                  <div className="text-kliqt-secondary font-medium">{method.contact}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="kliqt-card">
                  <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                  
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-green-400">Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
                      <span className="text-red-400">Failed to send message. Please try again.</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors"
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors"
                          placeholder="Your company name"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium mb-2">
                          Service Interest
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="ai-content">AI Content & SEO</option>
                          <option value="freelancers">Freelancer Network</option>
                          <option value="ai-tools">AI Tools & Automation</option>
                          <option value="custom">Custom Development</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors"
                        placeholder="Brief description of your inquiry"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-kliqt-secondary focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us about your project, goals, and how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full kliqt-btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                className="space-y-8"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Office Info */}
                <div className="kliqt-card">
                  <h3 className="text-2xl font-bold mb-6">Visit Our Office</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-kliqt-secondary mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">Address</div>
                        <div className="text-gray-400">{officeInfo.address}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-kliqt-secondary mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">Business Hours</div>
                        <div className="text-gray-400">{officeInfo.hours}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Globe className="h-6 w-6 text-kliqt-secondary mt-1 flex-shrink-0" />
                      <div>
                        <div className="font-medium mb-1">Timezone</div>
                        <div className="text-gray-400">{officeInfo.timezone}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Response */}
                <div className="kliqt-card">
                  <h3 className="text-2xl font-bold mb-6">Quick Response Times</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Email Inquiries</span>
                      <span className="text-kliqt-secondary font-medium">&lt; 2 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Project Quotes</span>
                      <span className="text-kliqt-secondary font-medium">&lt; 24 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Support Tickets</span>
                      <span className="text-kliqt-secondary font-medium">&lt; 1 hour</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Emergency Support</span>
                      <span className="text-kliqt-secondary font-medium">&lt; 15 minutes</span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="kliqt-card">
                  <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-kliqt-secondary/10 rounded-full flex items-center justify-center hover:bg-kliqt-secondary/20 transition-colors group"
                        aria-label={social.label}
                      >
                        <social.icon className="h-6 w-6 text-kliqt-secondary group-hover:scale-110 transition-transform" />
                      </a>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    Stay updated with our latest projects, insights, and industry news.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-400">Quick answers to common questions</p>
            </motion.div>

            <div className="space-y-6">
              {[
                {
                  question: "How quickly can you start my project?",
                  answer: "Most projects can begin within 48 hours of contract signing. Rush projects are available with 24-hour turnaround for an additional fee."
                },
                {
                  question: "Do you offer ongoing support and maintenance?",
                  answer: "Yes! We provide comprehensive support packages including 24/7 monitoring, regular updates, and dedicated account management."
                },
                {
                  question: "Can you work with my existing team?",
                  answer: "Absolutely. We integrate seamlessly with your existing workflows and can work alongside your internal team or other contractors."
                },
                {
                  question: "What's included in your AI automation services?",
                  answer: "Our AI services include custom automation development, workflow optimization, API integrations, and ongoing performance monitoring and optimization."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="kliqt-card"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-bold mb-3 text-kliqt-secondary">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
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
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join hundreds of businesses already scaling with KLIQT Media's solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing" className="kliqt-btn-primary text-lg px-8 py-4">
                  View Pricing
                </Link>
                <Link href="/portal" className="kliqt-btn-secondary text-lg px-8 py-4">
                  Access Portal
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}