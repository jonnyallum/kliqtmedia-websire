/**
 * Portal Billing Page
 * Payment history and invoice management
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  Download, 
  Calendar,
  DollarSign,
  Receipt,
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  FileText,
  ExternalLink
} from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { supabase } from '@/lib/supabase/client'

interface Payment {
  id: string
  amount: number
  currency: string
  status: 'succeeded' | 'pending' | 'failed'
  created_at: string
  stripe_payment_intent_id: string
  order_id?: string
  description?: string
}

interface Invoice {
  id: string
  invoice_number: string
  amount: number
  currency: string
  status: 'paid' | 'pending' | 'overdue'
  created_at: string
  due_date: string
  download_url?: string
}

const paymentStatusConfig = {
  succeeded: {
    icon: CheckCircle,
    color: 'text-green-400',
    bg: 'bg-green-400/10',
    border: 'border-green-400/30',
    label: 'Paid'
  },
  pending: {
    icon: Clock,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
    label: 'Pending'
  },
  failed: {
    icon: AlertCircle,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/30',
    label: 'Failed'
  }
}

export default function BillingPage() {
  const { user } = useAuth()
  const [payments, setPayments] = useState<Payment[]>([])
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'payments' | 'invoices'>('payments')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    if (user) {
      fetchBillingData()
    }
  }, [user])

  const fetchBillingData = async () => {
    try {
      // Get customer record
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

      // Fetch payments
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('customer_id', customer.id)
        .order('created_at', { ascending: false })

      let transformedPayments: Payment[] = []
      
      if (paymentsError) {
        console.error('Error fetching payments:', paymentsError)
      } else {
        transformedPayments = (paymentsData || []).map(payment => ({
          id: payment.id,
          amount: payment.amount / 100, // Convert from cents
          currency: payment.currency || 'GBP',
          status: payment.status,
          created_at: payment.created_at,
          stripe_payment_intent_id: payment.stripe_payment_intent_id,
          order_id: payment.order_id,
          description: payment.description
        }))
        setPayments(transformedPayments)
      }

      // For now, create mock invoices since we don't have an invoices table
      // In a real app, you'd fetch from an invoices table
      const mockInvoices: Invoice[] = transformedPayments
        .filter((p: Payment) => p.status === 'succeeded')
        .map((payment: Payment, index: number) => ({
          id: `inv-${payment.id}`,
          invoice_number: `INV-${String(index + 1).padStart(4, '0')}`,
          amount: payment.amount,
          currency: payment.currency,
          status: 'paid' as const,
          created_at: payment.created_at,
          due_date: payment.created_at,
          download_url: `/api/invoices/${payment.id}/download`
        }))

      setInvoices(mockInvoices)
    } catch (error) {
      console.error('Error fetching billing data:', error)
    } finally {
      setLoading(false)
    }
  }

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

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.stripe_payment_intent_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (payment.description && payment.description.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPaid = payments
    .filter(p => p.status === 'succeeded')
    .reduce((sum, p) => sum + p.amount, 0)

  const totalPending = payments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

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
        <h1 className="text-3xl font-bold mb-2">Billing & Payments</h1>
        <p className="text-gray-400">Manage your payment history and download invoices.</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="kliqt-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Paid</p>
              <p className="text-2xl font-bold text-green-400">
                {formatCurrency(totalPaid, 'GBP')}
              </p>
            </div>
            <div className="p-3 bg-green-400/10 rounded-xl">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        <div className="kliqt-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">
                {formatCurrency(totalPending, 'GBP')}
              </p>
            </div>
            <div className="p-3 bg-yellow-400/10 rounded-xl">
              <Clock className="h-6 w-6 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="kliqt-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Transactions</p>
              <p className="text-2xl font-bold">{payments.length}</p>
            </div>
            <div className="p-3 bg-kliqt-primary/10 rounded-xl">
              <Receipt className="h-6 w-6 text-kliqt-primary" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="kliqt-card"
      >
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'payments'
                ? 'bg-kliqt-primary text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Payment History
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'invoices'
                ? 'bg-kliqt-primary text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Invoices
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="md:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors appearance-none"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                {activeTab === 'payments' ? (
                  <>
                    <option value="succeeded">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </>
                ) : (
                  <>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'payments' ? (
            filteredPayments.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Payments Found</h3>
                <p className="text-gray-400">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'No payments match your current filters.' 
                    : 'You haven\'t made any payments yet.'}
                </p>
              </div>
            ) : (
              filteredPayments.map((payment, index) => {
                const StatusIcon = paymentStatusConfig[payment.status].icon
                
                return (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.05 * index }}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded-lg ${paymentStatusConfig[payment.status].bg}`}>
                        <StatusIcon className={`h-5 w-5 ${paymentStatusConfig[payment.status].color}`} />
                      </div>
                      
                      <div>
                        <p className="font-medium">
                          {payment.description || `Payment ${payment.stripe_payment_intent_id.slice(-8)}`}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(payment.created_at)}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {formatCurrency(payment.amount, payment.currency)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatusConfig[payment.status].bg} ${paymentStatusConfig[payment.status].color} ${paymentStatusConfig[payment.status].border} border`}>
                        {paymentStatusConfig[payment.status].label}
                      </span>
                      {payment.status === 'succeeded' && (
                        <button
                          className="text-gray-400 hover:text-kliqt-primary transition-colors"
                          title="View receipt"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )
              })
            )
          ) : (
            filteredInvoices.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Invoices Found</h3>
                <p className="text-gray-400">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'No invoices match your current filters.' 
                    : 'You don\'t have any invoices yet.'}
                </p>
              </div>
            ) : (
              filteredInvoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-kliqt-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-kliqt-primary" />
                    </div>
                    
                    <div>
                      <p className="font-medium">{invoice.invoice_number}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(invoice.created_at)}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {formatCurrency(invoice.amount, invoice.currency)}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/30">
                      Paid
                    </span>
                    <button
                      className="text-gray-400 hover:text-kliqt-primary transition-colors"
                      title="Download invoice"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )
          )}
        </div>
      </motion.div>
    </div>
  )
}