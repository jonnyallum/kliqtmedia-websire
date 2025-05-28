/**
 * Portal Profile Page
 * User profile management with editable forms
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Globe, 
  Save, 
  Camera,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { supabase } from '@/lib/supabase/client'

interface ProfileData {
  full_name: string
  role: 'freelancer' | 'client' | 'admin'
  phone: string
  company: string
  bio: string
  website: string
  avatar_url: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<ProfileData>({
    full_name: '',
    role: 'client',
    phone: '',
    company: '',
    bio: '',
    website: '',
    avatar_url: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          role: data.role || 'client',
          phone: data.phone || '',
          company: data.company || '',
          bio: data.bio || '',
          website: data.website || '',
          avatar_url: data.avatar_url || ''
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setMessage({ type: 'error', text: 'Failed to load profile data' })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          ...profile,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
    } catch (error) {
      console.error('Error updating profile:', error)
      setMessage({ type: 'error', text: 'Failed to update profile' })
    } finally {
      setSaving(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kliqt-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
        <p className="text-gray-400">Manage your account information and preferences.</p>
      </motion.div>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="kliqt-card"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Message */}
          {message && (
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/30' 
                : 'bg-red-500/10 border border-red-500/30'
            }`}>
              {message.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-400" />
              )}
              <span className={`text-sm ${
                message.type === 'success' ? 'text-green-400' : 'text-red-400'
              }`}>
                {message.text}
              </span>
            </div>
          )}

          {/* Avatar Section */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-kliqt-primary/20 flex items-center justify-center">
                {profile.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    className="h-20 w-20 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-kliqt-primary" />
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 h-6 w-6 bg-kliqt-primary rounded-full flex items-center justify-center hover:bg-kliqt-primary/80 transition-colors"
              >
                <Camera className="h-3 w-3 text-black" />
              </button>
            </div>
            <div>
              <h3 className="text-lg font-medium">Profile Photo</h3>
              <p className="text-sm text-gray-400">Upload a photo to personalize your account</p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="full_name"
                  value={profile.full_name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 cursor-not-allowed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <select
                name="role"
                value={profile.role}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
              >
                <option value="client">Client</option>
                <option value="freelancer">Freelancer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="company"
                  value={profile.company}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
                  placeholder="Enter your company name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="url"
                  name="website"
                  value={profile.website}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {profile.bio.length}/500 characters
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="kliqt-btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}