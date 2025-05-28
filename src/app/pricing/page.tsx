'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Star, Zap, Users, Bot, ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { getStripe } from '@/lib/stripe/client'

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [loadingCheckout, setLoadingCheckout] = useState<string | null>(null)

  const handleCheckout = async (priceId: string, packageName: string) => {
    setLoadingCheckout(priceId)
    
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          metadata: {
            package_name: packageName,
            source: 'pricing_page',
          },
        }),
      })

      const { url, error } = await response.json()

      if (error) {
        console.error('Checkout error:', error)
        alert('Failed to create checkout session. Please try again.')
        return
      }

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Failed to create checkout session. Please try again.')
    } finally {
      setLoadingCheckout(null)
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const services = [
    {
      category: "Website Design & Hosting",
      icon: <Zap className="h-6 w-6" />,
      packages: [
        {
          name: "Starter",
          price: "£400",
          description: "1–3 pages, mobile-first, contact form, basic SEO",
          features: ["Mobile-responsive design", "Contact form integration", "Basic SEO optimization", "SSL certificate", "1 month support"]
        },
        {
          name: "Business",
          price: "£1,250",
          description: "5–8 pages, custom branding, blog, Google indexing",
          features: ["Custom branding package", "Blog/CMS integration", "Google Analytics setup", "Social media integration", "3 months support", "SEO optimization"]
        },
        {
          name: "Pro+",
          price: "£3,950+",
          description: "CMS, bookings, animations, team training",
          features: ["Advanced CMS", "Booking system", "Custom animations", "Team training included", "6 months support", "Performance optimization", "Advanced integrations"]
        }
      ],
      hosting: {
        name: "Hosting",
        price: "£12–40/mo",
        description: "Secure, SSL, backups, email options"
      }
    },
    {
      category: "Mobile App Development",
      icon: <Bot className="h-6 w-6" />,
      packages: [
        {
          name: "MVP / PWA",
          price: "£7,950–£11,950",
          description: "Fast, lightweight apps",
          features: ["Progressive Web App", "Cross-platform compatibility", "Basic user authentication", "Core functionality", "App store deployment", "3 months support"]
        },
        {
          name: "Business App",
          price: "£24,000–£48,000",
          description: "Login, APIs, dashboard",
          features: ["User management system", "API integrations", "Admin dashboard", "Push notifications", "Analytics integration", "6 months support", "Custom features"]
        },
        {
          name: "Premium",
          price: "£48,000+",
          description: "Full stack, custom UI, scalable",
          features: ["Custom UI/UX design", "Scalable architecture", "Advanced integrations", "Real-time features", "Performance optimization", "12 months support", "Ongoing maintenance"]
        }
      ],
      maintenance: {
        name: "Maintenance",
        price: "£79–159/mo",
        description: "Updates, monitoring"
      }
    },
    {
      category: "AI Automation & Integration",
      icon: <Users className="h-6 w-6" />,
      packages: [
        {
          name: "Chatbots",
          price: "from £399",
          description: "GPT-integrated assistants",
          features: ["GPT-4 integration", "Custom training data", "Multi-platform deployment", "Analytics dashboard", "Basic customization", "Setup & training"]
        },
        {
          name: "Automations",
          price: "from £795",
          description: "Zapier/n8n flows",
          features: ["Workflow automation", "Multi-app integrations", "Custom triggers", "Error handling", "Performance monitoring", "Documentation"]
        },
        {
          name: "AI Agents",
          price: "from £3,950",
          description: "Smart automation, APIs, logic",
          features: ["Custom AI agent development", "Advanced logic systems", "API integrations", "Learning capabilities", "Scalable architecture", "Ongoing optimization"]
        }
      ],
      training: {
        name: "Training",
        price: "£39/hr",
        description: "1-on-1 support or team onboarding"
      }
    },
    {
      category: "Graphic Design & Branding",
      icon: <Star className="h-6 w-6" />,
      packages: [
        {
          name: "Logo Design",
          price: "£120–£240",
          description: "Vector files, variants",
          features: ["Multiple logo concepts", "Vector file formats", "Color variations", "Usage guidelines", "Social media versions", "2 revision rounds"]
        },
        {
          name: "Brand Pack",
          price: "from £399",
          description: "Logo, colours, font kit, social assets",
          features: ["Complete logo suite", "Brand color palette", "Typography selection", "Social media templates", "Business card design", "Brand guidelines"]
        },
        {
          name: "Pitch Decks / PDFs",
          price: "£75–£199",
          description: "Styled, ready-to-send",
          features: ["Professional design", "Custom layouts", "Infographic elements", "Print-ready files", "Editable templates", "Quick turnaround"]
        }
      ]
    },
    {
      category: "Social Media Marketing",
      icon: <Users className="h-6 w-6" />,
      packages: [
        {
          name: "Monthly Management",
          price: "from £199/mo",
          description: "Content, growth, reporting",
          features: ["Content creation", "Posting schedule", "Community management", "Growth strategies", "Monthly reports", "Platform optimization"]
        },
        {
          name: "Reels & Shorts",
          price: "£40–£120",
          description: "Fast edits, AI captions",
          features: ["Professional editing", "AI-generated captions", "Trending audio", "Custom graphics", "Platform optimization", "Quick delivery"]
        },
        {
          name: "Strategy",
          price: "from £595",
          description: "Visual + content roadmap",
          features: ["Comprehensive audit", "Content strategy", "Visual brand guide", "Posting calendar", "Growth tactics", "Performance metrics"]
        }
      ]
    },
    {
      category: "LinkedIn & Portfolio Builds",
      icon: <Bot className="h-6 w-6" />,
      packages: [
        {
          name: "LinkedIn Refresh",
          price: "£120–£399",
          description: "Banner, SEO, bio revamp",
          features: ["Profile optimization", "Custom banner design", "SEO-optimized bio", "Content strategy", "Connection tactics", "Performance tracking"]
        },
        {
          name: "Portfolio Website",
          price: "£399–£1,600",
          description: "Custom site, CV, case studies",
          features: ["Custom portfolio design", "Case study layouts", "CV/resume integration", "Contact forms", "SEO optimization", "Mobile responsive"]
        },
        {
          name: "Monthly Mgmt",
          price: "from £199/mo",
          description: "Posting + inbox + outreach",
          features: ["Content posting", "Inbox management", "Outreach campaigns", "Network building", "Performance analytics", "Strategy optimization"]
        }
      ]
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
              <Link href="/#services" className="hover:text-kliqt-primary transition-colors">Services</Link>
              <Link href="/pricing" className="text-kliqt-primary">Pricing</Link>
              <Link href="/#about" className="hover:text-kliqt-primary transition-colors">About</Link>
              <Link href="/portal" className="kliqt-btn-primary">Portal</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-16 kliqt-gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <img
                src="https://i.ibb.co/B5NV5MR1/kliqtsvg.png"
                alt="KLIQT Media Logo"
                className="h-20 md:h-24 w-auto kliqt-glow"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              KLIQT Media – <span className="neon-text">2025 Price List</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Transparent pricing for world-class digital services. No hidden fees, just results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-kliqt-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, serviceIndex) => (
            <motion.div
              key={service.category}
              className="mb-16"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
            >
              <div className="flex items-center mb-8">
                <div className="text-kliqt-secondary mr-3">
                  {service.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-kliqt-secondary">
                  {service.category}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {service.packages.map((pkg, pkgIndex) => (
                  <motion.div
                    key={pkg.name}
                    className="kliqt-card kliqt-hover-lift"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: pkgIndex * 0.1 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-kliqt-primary mb-2">{pkg.name}</h3>
                      <div className="text-2xl font-bold mb-2">{pkg.price}</div>
                      <p className="text-gray-400 text-sm">{pkg.description}</p>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-kliqt-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handleCheckout(`price_${pkg.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`, pkg.name)}
                      disabled={loadingCheckout === `price_${pkg.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`}
                      className="w-full kliqt-btn-primary group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingCheckout === `price_${pkg.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}` ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Additional Services */}
              {(service.hosting || service.maintenance || service.training) && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {service.hosting && (
                    <div className="kliqt-card bg-kliqt-primary/10 border-kliqt-primary/30">
                      <h4 className="font-bold text-kliqt-primary mb-2">{service.hosting.name}</h4>
                      <div className="text-lg font-semibold mb-1">{service.hosting.price}</div>
                      <p className="text-gray-400 text-sm">{service.hosting.description}</p>
                    </div>
                  )}
                  {service.maintenance && (
                    <div className="kliqt-card bg-kliqt-secondary/10 border-kliqt-secondary/30">
                      <h4 className="font-bold text-kliqt-secondary mb-2">{service.maintenance.name}</h4>
                      <div className="text-lg font-semibold mb-1">{service.maintenance.price}</div>
                      <p className="text-gray-400 text-sm">{service.maintenance.description}</p>
                    </div>
                  )}
                  {service.training && (
                    <div className="kliqt-card bg-kliqt-primary/10 border-kliqt-primary/30">
                      <h4 className="font-bold text-kliqt-primary mb-2">{service.training.name}</h4>
                      <div className="text-lg font-semibold mb-1">{service.training.price}</div>
                      <p className="text-gray-400 text-sm">{service.training.description}</p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-kliqt-primary/10 to-kliqt-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Get <span className="neon-text">Started</span>?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Contact us today for a free consultation and custom quote for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="kliqt-btn-primary kliqt-hover-lift">
                Get Free Quote
              </Link>
              <Link href="/portal" className="kliqt-btn-secondary kliqt-hover-lift">
                Access Portal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img
                  src="https://i.ibb.co/B5NV5MR1/kliqtsvg.png"
                  alt="KLIQT Media Logo"
                  className="h-8 w-auto"
                />
                <span className="text-2xl font-bold neon-text">KLIQT Media</span>
              </div>
              <p className="text-gray-400">
                AI-powered content and freelancer platform for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-kliqt-primary transition-colors">AI Content</Link></li>
                <li><Link href="#" className="hover:text-kliqt-primary transition-colors">Freelancers</Link></li>
                <li><Link href="#" className="hover:text-kliqt-primary transition-colors">Automation</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-kliqt-primary transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-kliqt-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-kliqt-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-kliqt-primary transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-kliqt-primary transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-kliqt-primary transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 KLIQT Media. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}