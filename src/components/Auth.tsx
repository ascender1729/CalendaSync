import React, { useState, useEffect } from 'react';
import { supabase, isKnownDevice } from '../lib/supabase';
import { CalendarDays, Loader2, AlertCircle, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';
import { userSchema } from '../lib/validation';

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [mode, setMode] = useState<'login' | 'signup' | 'reset' | 'verify'>('login');
  const [resetSent, setResetSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sessionData, setSessionData] = useState<{ email: string; password: string } | null>(null);

  useEffect(() => {
    // Reset attempts after 30 minutes
    const timer = setTimeout(() => {
      if (attempts > 0) setAttempts(0);
    }, 30 * 60 * 1000);

    return () => clearTimeout(timer);
  }, [attempts]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (attempts >= 5) {
      const remainingTime = Math.ceil((30 - (Date.now() % (30 * 60 * 1000)) / (60 * 1000)));
      toast.error(`Too many attempts. Please try again in ${remainingTime} minutes.`);
      return;
    }

    try {
      setLoading(true);

      // Validate input
      if (mode !== 'reset' && mode !== 'verify') {
        userSchema.parse({ email, password });
      }

      if (mode === 'login') {
        // Check if this is a known device
        const knownDevice = isKnownDevice();

        if (!knownDevice) {
          // Store credentials temporarily for verification
          setSessionData({ email, password });
          setMode('verify');
          // Send verification code via email
          await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: window.location.origin,
            },
          });
          toast.success('Please check your email for the verification code');
          return;
        }

        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setAttempts((prev) => prev + 1);
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Invalid email or password');
          }
          throw error;
        }

        toast.success('Welcome back!');
        setAttempts(0);
      } else if (mode === 'verify') {
        if (!sessionData) {
          throw new Error('Session data is missing');
        }

        // Verify the code and sign in
        const { error } = await supabase.auth.verifyOtp({
          email: sessionData.email,
          token: verificationCode,
          type: 'email',
        });

        if (error) throw error;

        // Now sign in with password
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: sessionData.email,
          password: sessionData.password,
        });

        if (signInError) throw signInError;

        toast.success('Device verified successfully!');
        setSessionData(null);
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
          },
        });

        if (error) {
          if (error.message.includes('already registered')) {
            throw new Error('Email already registered');
          }
          throw error;
        }

        toast.success('Welcome! Please check your email to confirm your account.');
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) throw error;

        setResetSent(true);
        toast.success('Password reset instructions sent to your email');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed';
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <CalendarDays className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">CalendaSync</h2>
          <p className="mt-2 text-sm text-gray-600">
            {mode === 'login' && 'Sign in to manage your events'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'reset' && 'Reset your password'}
            {mode === 'verify' && 'Verify your device'}
          </p>
        </div>

        {resetSent ? (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-green-600">
              <AlertCircle className="h-5 w-5" />
              <p>Check your email for reset instructions</p>
            </div>
            <button
              onClick={() => {
                setMode('login');
                setResetSent(false);
              }}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Return to login
            </button>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleAuth}>
            <div className="rounded-md shadow-sm space-y-4">
              {mode === 'verify' ? (
                <div>
                  <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <Smartphone className="h-5 w-5" />
                    <p className="text-sm">New device detected. Please verify your identity.</p>
                  </div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Verification Code
                  </label>
                  <input
                    id="code"
                    name="code"
                    type="text"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    disabled={loading}
                    placeholder="Enter the code from your email"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  {mode !== 'reset' && (
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                      />
                      {mode === 'signup' && (
                        <p className="mt-1 text-xs text-gray-500">
                          Password must be at least 8 characters with uppercase, lowercase, number, and special character
                        </p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : mode === 'login' ? (
                  'Sign in'
                ) : mode === 'signup' ? (
                  'Sign up'
                ) : mode === 'verify' ? (
                  'Verify Device'
                ) : (
                  'Send reset instructions'
                )}
              </button>

              <div className="text-sm text-center space-y-2">
                {mode === 'login' && (
                  <>
                    <button
                      type="button"
                      onClick={() => setMode('signup')}
                      className="text-indigo-600 hover:text-indigo-500"
                      disabled={loading}
                    >
                      Create an account
                    </button>
                    <span className="block">
                      <button
                        type="button"
                        onClick={() => setMode('reset')}
                        className="text-indigo-600 hover:text-indigo-500"
                        disabled={loading}
                      >
                        Forgot your password?
                      </button>
                    </span>
                  </>
                )}
                {(mode === 'signup' || mode === 'reset' || mode === 'verify') && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setSessionData(null);
                    }}
                    className="text-indigo-600 hover:text-indigo-500"
                    disabled={loading}
                  >
                    Back to login
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}