import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with auto refresh and persistence
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

// Session management utilities
export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

export const refreshSession = async () => {
  const { data: { session }, error } = await supabase.auth.refreshSession();
  if (error) throw error;
  return session;
};

// Password reset utilities
export const sendPasswordResetEmail = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
};

export const verifyOTP = async (email: string, token: string) => {
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'recovery',
  });
  if (error) throw error;
};

export const updatePassword = async (newPassword: string) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
};

// Event management utilities
export async function checkEventConflicts(
  startTime: string,
  endTime: string,
  userId: string,
  excludeEventId?: string
): Promise<boolean> {
  try {
    let query = supabase
      .from('events')
      .select('id')
      .eq('user_id', userId)
      .overlaps('start_time', 'end_time', startTime, endTime);

    if (excludeEventId) {
      query = query.neq('id', excludeEventId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return (data?.length ?? 0) > 0;
  } catch (error) {
    console.error('Error checking event conflicts:', error);
    throw new Error('Failed to check event conflicts');
  }
}

export async function isEventExists(eventId: string, userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('events')
      .select('id')
      .eq('id', eventId)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return false; // Not found
      throw error;
    }

    return !!data;
  } catch (error) {
    console.error('Error checking event existence:', error);
    throw new Error('Failed to check event existence');
  }
}

// Device management
const KNOWN_DEVICES_KEY = 'known_devices';

export const isKnownDevice = () => {
  const deviceId = getDeviceId();
  const knownDevices = getKnownDevices();
  return knownDevices.includes(deviceId);
};

export const registerDevice = () => {
  const deviceId = getDeviceId();
  const knownDevices = getKnownDevices();
  if (!knownDevices.includes(deviceId)) {
    knownDevices.push(deviceId);
    localStorage.setItem(KNOWN_DEVICES_KEY, JSON.stringify(knownDevices));
  }
};

// Helper functions
function getDeviceId(): string {
  const key = 'device_id';
  let deviceId = localStorage.getItem(key);
  
  if (!deviceId) {
    deviceId = crypto.randomUUID();
    localStorage.setItem(key, deviceId);
  }
  
  return deviceId;
}

function getKnownDevices(): string[] {
  const devices = localStorage.getItem(KNOWN_DEVICES_KEY);
  return devices ? JSON.parse(devices) : [];
}

// Rate limiting for password reset
const RESET_ATTEMPTS_KEY = 'password_reset_attempts';
const MAX_RESET_ATTEMPTS = 3;
const RESET_TIMEOUT = 5 * 60 * 1000; // 5 minutes

export const checkResetAttempts = () => {
  const attempts = localStorage.getItem(RESET_ATTEMPTS_KEY);
  if (!attempts) return true;

  const { count, timestamp } = JSON.parse(attempts);
  const elapsed = Date.now() - timestamp;

  if (elapsed > RESET_TIMEOUT) {
    localStorage.removeItem(RESET_ATTEMPTS_KEY);
    return true;
  }

  return count < MAX_RESET_ATTEMPTS;
};

export const incrementResetAttempts = () => {
  const attempts = localStorage.getItem(RESET_ATTEMPTS_KEY);
  const current = attempts ? JSON.parse(attempts) : { count: 0, timestamp: Date.now() };

  current.count += 1;
  localStorage.setItem(RESET_ATTEMPTS_KEY, JSON.stringify(current));
};

// Handle token refresh and sign in
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed successfully');
  } else if (event === 'SIGNED_IN') {
    registerDevice();
  }
});