/**
 * Portal Dashboard - Main Overview Page
 * Shows user stats, recent orders, and quick actions
 */

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  ShoppingBag, 
  CreditCard, 
  Clock,
  ArrowRight,
  Plus,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/lib/auth/context'
import { supabase } from '@/lib/supabase/client'

interface DashboardStats {
  totalOrders: number
  activeProjects: number
  totalSpent: number
  pendingPayments: number
}

interface RecentOrder {
  id: string
  order_number: string
  service_type: string
  package_name: string
  amount_total: number
  status: string
  created_at: string
}

export default function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    activeProjects: 0,
    totalSpent: 0,
    pendingPayments: 0
  })
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // Fetch orders for stats
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })

      if (ordersError) throw ordersError

      // Calculate stats
      const totalOrders = orders?.length || 0
      const activeProjects = orders?.filter(order => 
        ['confirmed', 'in_progress'].includes(order.status)
      ).length || 0
      const totalSpent = orders?.reduce((sum, order) => sum + (order.amount_total || 0), 0) || 0
      const pendingPayments = orders?.filter(order => order.status === 'pending').length || 0

      setStats({
        totalOrders,
        activeProjects,
        totalSpent: totalSpent / 100, // Convert from pence to pounds
        pendingPayments
      })

      // Set recent orders (last 5)
      setRecentOrders(orders?.slice(0, 5) || [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'in_progress': return 'text-blue-400'
      case 'confirmed': return 'text-kliqt-primary'
      case 'pending': return 'text-yellow-400'
      case 'cancelled': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kliqt-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div {...fadeInUp}>
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, <span className="neon-text">{user?.email?.split('@')[0]}</span>!
        </h1>
        <p className="text-gray-400">Here's what's happening with your projects.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeInUp} className="kliqt-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-kliqt-primary">{stats.totalOrders}</p>
            </div>
            <ShoppingBag className="h-8 w-8 text-kliqt-primary" />
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="kliqt-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Projects</p>
              <p className="text-2xl font-bold text-blue-400">{stats.activeProjects}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-400" />
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="kliqt-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold text-green-400">£{stats.totalSpent.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-400" />
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="kliqt-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.pendingPayments}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-400" />
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="kliqt-card"
      >
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/pricing" 
            className="flex items-center p-4 bg-kliqt-primary/10 border border-kliqt-primary/30 rounded-lg hover:bg-kliqt-primary/20 transition-colors group"
          >
            <Plus className="h-5 w-5 text-kliqt-primary mr-3" />
            <div>
              <p className="font-medium text-kliqt-primary">New Project</p>
              <p className="text-sm text-gray-400">Start a new order</p>
            </div>
            <ArrowRight className="h-4 w-4 text-kliqt-primary ml-auto group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link 
            href="/portal/dashboard/orders" 
            className="flex items-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors group"
          >
            <ShoppingBag className="h-5 w-5 text-blue-400 mr-3" />
            <div>
              <p className="font-medium text-blue-400">View Orders</p>
              <p className="text-sm text-gray-400">Track your projects</p>
            </div>
            <ArrowRight className="h-4 w-4 text-blue-400 ml-auto group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link 
            href="/portal/dashboard/billing" 
            className="flex items-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors group"
          >
            <CreditCard className="h-5 w-5 text-green-400 mr-3" />
            <div>
              <p className="font-medium text-green-400">Billing</p>
              <p className="text-sm text-gray-400">Manage payments</p>
            </div>
            <ArrowRight className="h-4 w-4 text-green-400 ml-auto group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Recent Orders */}
      <motion.div 
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="kliqt-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Orders</h2>
          <Link 
            href="/portal/dashboard/orders" 
            className="text-kliqt-primary hover:text-kliqt-primary/80 text-sm font-medium flex items-center"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 mb-4">No orders yet</p>
            <Link href="/pricing" className="kliqt-btn-primary">
              Place Your First Order
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div 
                key={order.id}
                className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="font-medium">{order.order_number}</p>
                    <p className="text-sm text-gray-400">
                      {order.service_type} - {order.package_name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">£{(order.amount_total / 100).toFixed(2)}</p>
                  <p className={`text-sm capitalize ${getStatusColor(order.status)}`}>
                    {order.status.replace('_', ' ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}