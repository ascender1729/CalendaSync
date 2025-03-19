import React, { useState, useEffect } from 'react';
import { User, Settings as SettingsIcon, Mail, Lock, Sun, Moon } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { userSchema } from '../lib/validation';
import toast from 'react-hot-toast';

export function Settings() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  async function fetchUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setFormData(prev => ({ ...prev, email: user.email || '' }));
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error('Failed to load user data');
    }
  }

  async function handleEmailUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.email || formData.email === user?.email) return;

    try {
      setLoading(true);

      // Validate email
      userSchema.shape.email.parse(formData.email);

      const { error } = await supabase.auth.updateUser({ 
        email: formData.email 
      });

      if (error) throw error;

      toast.success('Email update initiated. Please check your inbox for verification.');
    } catch (error: any) {
      console.error('Error updating email:', error);
      toast.error(error.message || 'Failed to update email');
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      setLoading(true);

      // Validate new password
      userSchema.shape.password.parse(newPassword);

      // First verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });

      if (error) throw error;

      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));

      toast.success('Password updated successfully');
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast.error(error.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <SettingsIcon className="h-8 w-8 text-gray-600" />
          <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        </div>

        {/* Dark Mode Toggle */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="h-5 w-5 text-gray-600" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600" />
              )}
              <span className="text-sm font-medium text-gray-900">Dark Mode</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                darkMode ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Email Settings</h3>
          </div>
          <form onSubmit={handleEmailUpdate} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || formData.email === user?.email}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Email'}
            </button>
          </form>
        </div>

        {/* Password Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Password Settings</h3>
          </div>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={formData.newPassword}
                onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
          </div>
          <div className="text-sm text-gray-500">
            <p>Account ID: {user?.id}</p>
            <p>Last Sign In: {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Never'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}