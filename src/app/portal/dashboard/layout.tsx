/**
 * Portal Dashboard Layout
 * Provides navigation and layout structure for authenticated users
 */

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  User, 
  ShoppingBag, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/context'

const navigation = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: Home },
  { name: 'Profile', href: '/portal/dashboard/profile', icon: User },
  { name: 'Orders', href: '/portal/dashboard/orders', icon: ShoppingBag },
  { name: 'Billing', href: '/portal/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/portal/dashboard/settings', icon: Settings },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-kliqt-dark border-r border-gray-800 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="https://i.ibb.co/B5NV5MR1/kliqtsvg.png"
                alt="KLIQT Media Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold neon-text">KLIQT Portal</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User info */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-kliqt-primary/20 flex items-center justify-center">
                <User className="h-5 w-5 text-kliqt-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.email}</p>
                <p className="text-xs text-gray-400">Welcome back!</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-kliqt-primary/20 text-kliqt-primary border border-kliqt-primary/30' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Sign out */}
          <div className="p-4 border-t border-gray-800">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-kliqt-dark border-b border-gray-800 h-16 flex items-center justify-between px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:border-kliqt-primary focus:outline-none"
              />
            </div>

            {/* Notifications */}
            <button className="p-2 rounded-lg hover:bg-gray-800 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-kliqt-secondary rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}