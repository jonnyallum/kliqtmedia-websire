/**
 * Privacy Policy Page
 * KLIQT Media privacy policy and data protection information
 */

'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Database, Users, Globe, FileText, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    id: 'information-collection',
    title: 'Information We Collect',
    icon: Database,
    content: [
      {
        subtitle: 'Personal Information',
        text: 'We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include your name, email address, phone number, company information, and payment details.'
      },
      {
        subtitle: 'Usage Information',
        text: 'We automatically collect information about how you use our services, including your IP address, browser type, device information, pages visited, and interaction patterns.'
      },
      {
        subtitle: 'AI Training Data',
        text: 'When you use our AI tools, we may collect and analyze your inputs and outputs to improve our services, but we never use your proprietary content to train models for other users.'
      }
    ]
  },
  {
    id: 'information-use',
    title: 'How We Use Your Information',
    icon: Eye,
    content: [
      {
        subtitle: 'Service Provision',
        text: 'We use your information to provide, maintain, and improve our services, process transactions, and provide customer support.'
      },
      {
        subtitle: 'Communication',
        text: 'We may use your contact information to send you service-related notifications, updates, and marketing communications (with your consent).'
      },
      {
        subtitle: 'Analytics & Improvement',
        text: 'We analyze usage patterns to understand how our services are used and to develop new features and improvements.'
      }
    ]
  },
  {
    id: 'information-sharing',
    title: 'Information Sharing',
    icon: Users,
    content: [
      {
        subtitle: 'Service Providers',
        text: 'We may share your information with trusted third-party service providers who assist us in operating our services, such as payment processors and hosting providers.'
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information if required by law, regulation, or legal process, or to protect the rights, property, or safety of KLIQT Media or others.'
      },
      {
        subtitle: 'Business Transfers',
        text: 'In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.'
      }
    ]
  },
  {
    id: 'data-security',
    title: 'Data Security',
    icon: Lock,
    content: [
      {
        subtitle: 'Security Measures',
        text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
      },
      {
        subtitle: 'Encryption',
        text: 'All data transmission is encrypted using industry-standard SSL/TLS protocols. Sensitive data is encrypted at rest using AES-256 encryption.'
      },
      {
        subtitle: 'Access Controls',
        text: 'We maintain strict access controls and regularly audit our systems to ensure only authorized personnel can access your information.'
      }
    ]
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    icon: Shield,
    content: [
      {
        subtitle: 'Access & Portability',
        text: 'You have the right to access, update, or delete your personal information. You can also request a copy of your data in a portable format.'
      },
      {
        subtitle: 'Consent Withdrawal',
        text: 'You can withdraw your consent for marketing communications or certain data processing activities at any time.'
      },
      {
        subtitle: 'Data Retention',
        text: 'We retain your information only as long as necessary to provide our services or as required by law. You can request deletion of your account and associated data.'
      }
    ]
  }
]

export default function PrivacyPage() {
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-kliqt-secondary/10 rounded-2xl">
                  <Shield className="h-16 w-16 text-kliqt-secondary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Privacy{' '}
                <span className="neon-text">Policy</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Your privacy is important to us. This policy explains how we collect, 
                use, and protect your personal information.
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                <span>Last updated: January 2025</span>
                <span>•</span>
                <span>Effective: January 1, 2025</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="py-12 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="kliqt-card"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FileText className="h-6 w-6 text-kliqt-secondary mr-3" />
                Quick Navigation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center p-3 bg-gray-800/50 rounded-lg hover:bg-kliqt-secondary/10 transition-colors group"
                  >
                    <section.icon className="h-5 w-5 text-kliqt-secondary mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-sm group-hover:text-kliqt-secondary transition-colors">
                      {section.title}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  className="kliqt-card"
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-kliqt-secondary/10 rounded-xl mr-4">
                      <section.icon className="h-8 w-8 text-kliqt-secondary" />
                    </div>
                    <h2 className="text-3xl font-bold">{section.title}</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <h3 className="text-xl font-semibold mb-3 text-kliqt-secondary">
                          {item.subtitle}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                className="kliqt-card"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center mb-4">
                  <Globe className="h-6 w-6 text-kliqt-secondary mr-3" />
                  <h3 className="text-xl font-bold">International Transfers</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  Your information may be transferred to and processed in countries other than your own. 
                  We ensure appropriate safeguards are in place to protect your data.
                </p>
                <div className="text-sm text-gray-400">
                  <p>• GDPR compliance for EU users</p>
                  <p>• Standard contractual clauses</p>
                  <p>• Adequacy decisions where applicable</p>
                </div>
              </motion.div>

              <motion.div
                className="kliqt-card"
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-kliqt-secondary mr-3" />
                  <h3 className="text-xl font-bold">Data Breach Notification</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  In the unlikely event of a data breach that affects your personal information, 
                  we will notify you and relevant authorities as required by law.
                </p>
                <div className="text-sm text-gray-400">
                  <p>• 72-hour authority notification</p>
                  <p>• Direct user notification when required</p>
                  <p>• Transparent incident reporting</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="kliqt-card text-center"
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Questions About This Policy?</h2>
              <p className="text-gray-300 mb-8">
                If you have any questions about this Privacy Policy or how we handle your data, 
                please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="kliqt-btn-primary">
                  Contact Us
                </Link>
                <a 
                  href="mailto:privacy@kliqtmedia.co.uk" 
                  className="kliqt-btn-secondary"
                >
                  Email Privacy Team
                </a>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-800">
                <div className="text-sm text-gray-400 space-y-2">
                  <p><strong>Data Protection Officer:</strong> privacy@kliqtmedia.co.uk</p>
                  <p><strong>Address:</strong> 123 Tech Hub Lane, London, EC2A 4DP, United Kingdom</p>
                  <p><strong>Phone:</strong> +44 20 7946 0958</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Policy Updates */}
        <section className="py-20 kliqt-gradient-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FileText className="h-16 w-16 text-kliqt-secondary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Policy Updates
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                We may update this Privacy Policy from time to time. We'll notify you of any 
                significant changes via email or through our services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/terms" className="kliqt-btn-secondary">
                  View Terms of Service
                </Link>
                <Link href="/" className="kliqt-btn-primary">
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  )
}