/**
 * Portal Settings Page
 * Account preferences and configuration
 */

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Key,
  Trash2,
  Save,
  AlertTriangle,
  CheckCircle,
  Moon,
  Sun,
  Monitor,
  Mail,
  MessageSquare,
  Smartphone
} from 'lucide-react'
import { useAuth } from '@/lib/auth/context'
import { supabase } from '@/lib/supabase/client'

interface UserSettings {
  notifications: {
    email_marketing: boolean
    email_orders: boolean
    email_security: boolean
    push_notifications: boolean
    sms_notifications: boolean
  }
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: string
    timezone: string
    currency: string
  }
  privacy: {
    profile_visibility: 'public' | 'private'
    data_sharing: boolean
    analytics: boolean
  }
}

const defaultSettings: UserSettings = {
  notifications: {
    email_marketing: false,
    email_orders: true,
    email_security: true,
    push_notifications: true,
    sms_notifications: false
  },
  preferences: {
    theme: 'dark',
    language: 'en',
    timezone: 'Europe/London',
    currency: 'GBP'
  },
  privacy: {
    profile_visibility: 'private',
    data_sharing: false,
    analytics: true
  }
}

export default function SettingsPage() {
  const { user, signOut } = useAuth()
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (user) {
      fetchSettings()
    }
  }, [user])

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        throw error
      }

      if (data) {
        setSettings({
          notifications: data.notifications || defaultSettings.notifications,
          preferences: data.preferences || defaultSettings.preferences,
          privacy: data.privacy || defaultSettings.privacy
        })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user?.id,
          notifications: settings.notifications,
          preferences: settings.preferences,
          privacy: settings.privacy,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      setMessage({ type: 'success', text: 'Settings saved successfully!' })
    } catch (error) {
      console.error('Error saving settings:', error)
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      // In a real app, you'd have a proper account deletion flow
      // This would involve deleting user data, canceling subscriptions, etc.
      await signOut()
      setMessage({ type: 'success', text: 'Account deletion initiated' })
    } catch (error) {
      console.error('Error deleting account:', error)
      setMessage({ type: 'error', text: 'Failed to delete account' })
    }
  }

  const updateNotificationSetting = (key: keyof UserSettings['notifications'], value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }))
  }

  const updatePreferenceSetting = (key: keyof UserSettings['preferences'], value: string) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value
      }
    }))
  }

  const updatePrivacySetting = (key: keyof UserSettings['privacy'], value: boolean | string) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value
      }
    }))
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
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences and privacy settings.</p>
      </motion.div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center space-x-2 p-3 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/30' 
              : 'bg-red-500/10 border border-red-500/30'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-red-400" />
          )}
          <span className={`text-sm ${
            message.type === 'success' ? 'text-green-400' : 'text-red-400'
          }`}>
            {message.text}
          </span>
        </motion.div>
      )}

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="kliqt-card"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-kliqt-primary/10 rounded-lg">
            <Bell className="h-5 w-5 text-kliqt-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Notifications</h2>
            <p className="text-gray-400">Choose how you want to be notified</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-gray-400">Receive updates about new features and offers</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email_marketing}
                onChange={(e) => updateNotificationSetting('email_marketing', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kliqt-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">Order Updates</p>
                <p className="text-sm text-gray-400">Get notified about order status changes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email_orders}
                onChange={(e) => updateNotificationSetting('email_orders', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kliqt-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">Security Alerts</p>
                <p className="text-sm text-gray-400">Important security and account notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.email_security}
                onChange={(e) => updateNotificationSetting('email_security', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kliqt-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-400">Receive push notifications in your browser</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.push_notifications}
                onChange={(e) => updateNotificationSetting('push_notifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kliqt-primary"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="kliqt-card"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-kliqt-primary/10 rounded-lg">
            <Palette className="h-5 w-5 text-kliqt-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Preferences</h2>
            <p className="text-gray-400">Customize your experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'light', icon: Sun, label: 'Light' },
                { value: 'dark', icon: Moon, label: 'Dark' },
                { value: 'system', icon: Monitor, label: 'System' }
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => updatePreferenceSetting('theme', value)}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-colors ${
                    settings.preferences.theme === value
                      ? 'border-kliqt-primary bg-kliqt-primary/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              value={settings.preferences.language}
              onChange={(e) => updatePreferenceSetting('language', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Timezone</label>
            <select
              value={settings.preferences.timezone}
              onChange={(e) => updatePreferenceSetting('timezone', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
            >
              <option value="Europe/London">London (GMT)</option>
              <option value="America/New_York">New York (EST)</option>
              <option value="America/Los_Angeles">Los Angeles (PST)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Currency</label>
            <select
              value={settings.preferences.currency}
              onChange={(e) => updatePreferenceSetting('currency', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
            >
              <option value="GBP">GBP (£)</option>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="kliqt-card"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-kliqt-primary/10 rounded-lg">
            <Shield className="h-5 w-5 text-kliqt-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Privacy & Security</h2>
            <p className="text-gray-400">Control your privacy settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Profile Visibility</label>
            <select
              value={settings.privacy.profile_visibility}
              onChange={(e) => updatePrivacySetting('profile_visibility', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:border-kliqt-primary focus:outline-none transition-colors"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Sharing</p>
              <p className="text-sm text-gray-400">Allow sharing anonymized data for service improvement</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.data_sharing}
                onChange={(e) => updatePrivacySetting('data_sharing', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kliqt-primary"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Analytics</p>
              <p className="text-sm text-gray-400">Help us improve by sharing usage analytics</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.privacy.analytics}
                onChange={(e) => updatePrivacySetting('analytics', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kliqt-primary"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <button
          onClick={handleSave}
          disabled={saving}
          className="kliqt-btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </button>

        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Account
        </button>
      </motion.div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold">Delete Account</h3>
            </div>
            
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete your account? This action cannot be undone and will permanently remove all your data.
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete Account
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}