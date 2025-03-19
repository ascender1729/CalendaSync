import { z } from 'zod';

// User validation schema
export const userSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required')
    .max(255, 'Email is too long'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password is too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

// OTP validation schema
export const otpSchema = z.object({
  otp: z.string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
});

// Event validation schema
export const eventSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .trim()
    .refine(value => value.length > 0, 'Title cannot be only whitespace'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .trim()
    .optional()
    .transform(val => val === '' ? undefined : val),
  start_time: z.string()
    .refine((date) => {
      const now = new Date();
      now.setSeconds(0, 0); // Reset seconds and milliseconds for fair comparison
      const startDate = new Date(date);
      return !isNaN(startDate.getTime()) && startDate >= now;
    }, {
      message: 'Start time must be a valid date in the future',
    }),
  end_time: z.string()
    .refine((date) => {
      const now = new Date();
      now.setSeconds(0, 0);
      const endDate = new Date(date);
      return !isNaN(endDate.getTime()) && endDate >= now;
    }, {
      message: 'End time must be a valid date in the future',
    }),
}).refine(
  (data) => {
    const start = new Date(data.start_time);
    const end = new Date(data.end_time);
    const duration = end.getTime() - start.getTime();
    const maxDuration = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
    
    return duration > 0 && duration <= maxDuration;
  },
  {
    message: 'Event must end after start time and cannot be longer than 7 days',
    path: ['end_time'],
  }
);

export type EventFormData = z.infer<typeof eventSchema>;
export type UserFormData = z.infer<typeof userSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;