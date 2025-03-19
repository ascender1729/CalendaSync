import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calendar } from '../components/Calendar';

// Mock the Supabase client
vi.mock('../lib/supabase', () => ({
  supabase: {
    channel: () => ({
      on: () => ({
        subscribe: () => {},
      }),
    }),
    removeChannel: () => {},
  },
}));

// Mock the event store
vi.mock('../lib/store', () => ({
  useEventStore: () => ({
    events: [],
    loading: false,
    fetchEvents: vi.fn(),
    createEvent: vi.fn(),
    updateEvent: vi.fn(),
    deleteEvent: vi.fn(),
  }),
}));

describe('Calendar Component', () => {
  beforeEach(() => {
    render(<Calendar />);
  });

  it('renders the calendar title', () => {
    expect(screen.getByText('CalendaSync')).toBeInTheDocument();
  });

  it('shows new event modal when clicking the New Event button', () => {
    fireEvent.click(screen.getByText('New Event'));
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('shows empty state message when no events exist', () => {
    expect(
      screen.getByText('No events yet. Create your first event!')
    ).toBeInTheDocument();
  });
});