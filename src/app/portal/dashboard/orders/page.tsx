/**
 * Portal Orders Page
 * Order tracking and management interface
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Download,
  Calendar,
  DollarSign,
  Filter,
  Search
} from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { supabase } from '@/lib/supabase/client'

interface Order {
  id: string
  order_number: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  total_amount: number
  currency: string
  created_at: string
  updated_at: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
    label: 'Pending'
  },
  processing: {
    icon: Package,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30',
    label: 'Processing'
  },
  completed: {
    icon: CheckCircle,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/30',
    label: 'Completed'
  },
  cancelled: {
    icon: XCircle,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/30',
    label: 'Cancelled'
  }
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      // First get the customer record
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user?.id)
        .single()

      if (customerError) {
        console.error('Error fetching customer:', customerError)
        setLoading(false)
        return
      }

      // Then get orders for this customer
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false })

      if (error) throw error

      // Transform the data to match our interface
      const transformedOrders: Order[] = (data || []).map(order => ({
        id: order.id,
        order_number: order.order_number || `ORD-${order.id.slice(0, 8).toUpperCase()}`,
        status: order.status,
        total_amount: order.total_amount / 100, // Convert from cents
        currency: order.currency || 'GBP',
        created_at: order.created_at,
        updated_at: order.updated_at,
        items: order.items || []
      }))

      setOrders(transformedOrders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.order_number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kliqt-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Orders</h1>
        <p className="text-gray-400">Track your orders and download deliverables.</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="kliqt-card"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors appearance-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="kliqt-card text-center py-12"
          >
            <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No Orders Found</h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'No orders match your current filters.' 
                : 'You haven\'t placed any orders yet.'}
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
              }}
              className="kliqt-btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        ) : (
          filteredOrders.map((order, index) => {
            const StatusIcon = statusConfig[order.status].icon
            
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="kliqt-card hover:border-kliqt-primary/50 transition-colors cursor-pointer"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${statusConfig[order.status].bg} ${statusConfig[order.status].border} border`}>
                      <StatusIcon className={`h-6 w-6 ${statusConfig[order.status].color}`} />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg">{order.order_number}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(order.created_at)}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {formatCurrency(order.total_amount, order.currency)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].bg} ${statusConfig[order.status].color} ${statusConfig[order.status].border} border`}>
                      {statusConfig[order.status].label}
                    </span>
                    <Eye className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Order Number</label>
                  <p className="font-medium">{selectedOrder.order_number}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Status</label>
                  <div className="flex items-center mt-1">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusConfig[selectedOrder.status].bg} ${statusConfig[selectedOrder.status].color} ${statusConfig[selectedOrder.status].border} border`}>
                      {statusConfig[selectedOrder.status].label}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Order Date</label>
                  <p className="font-medium">{formatDate(selectedOrder.created_at)}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Total Amount</label>
                  <p className="font-medium">{formatCurrency(selectedOrder.total_amount, selectedOrder.currency)}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg font-medium mb-3">Order Items</h3>
                <div className="space-y-2">
                  {selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{formatCurrency(item.price, selectedOrder.currency)}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center py-4">No items available</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              {selectedOrder.status === 'completed' && (
                <div className="flex space-x-3">
                  <button className="kliqt-btn-primary flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Files
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}