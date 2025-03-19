import { create } from 'zustand';
import { supabase, checkEventConflicts, isEventExists } from './supabase';
import { EventFormData } from './validation';
import toast from 'react-hot-toast';

interface Event extends EventFormData {
  id: string;
  user_id: string;
}

interface EventStore {
  events: Event[];
  loading: boolean;
  error: string | null;
  fetchEvents: () => Promise<void>;
  createEvent: (event: EventFormData) => Promise<void>;
  updateEvent: (id: string, event: EventFormData) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  loading: false,
  error: null,

  fetchEvents: async () => {
    try {
      set({ loading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user.id)
        .order('start_time', { ascending: true });

      if (error) throw error;
      
      // Add client-side caching with timestamp
      const cachedEvents = {
        data: data || [],
        timestamp: Date.now()
      };
      localStorage.setItem('cached_events', JSON.stringify(cachedEvents));
      
      set({ events: data || [] });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch events';
      set({ error: message });
      
      // Try to load from cache if network request fails
      const cached = localStorage.getItem('cached_events');
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const cacheAge = Date.now() - timestamp;
        if (cacheAge < 5 * 60 * 1000) { // Cache valid for 5 minutes
          set({ events: data });
          toast.error(message + ' (showing cached data)');
          return;
        }
      }
      toast.error(message);
    } finally {
      set({ loading: false });
    }
  },

  createEvent: async (event: EventFormData) => {
    try {
      set({ loading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Check for scheduling conflicts
      const hasConflict = await checkEventConflicts(
        event.start_time,
        event.end_time,
        user.id
      );

      if (hasConflict) {
        throw new Error('This time slot conflicts with another event');
      }

      const eventWithUserId = {
        ...event,
        user_id: user.id
      };

      const { error } = await supabase
        .from('events')
        .insert([eventWithUserId]);

      if (error) throw error;
      toast.success('Event created successfully');
      await get().fetchEvents();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create event';
      set({ error: message });
      toast.error(message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateEvent: async (id: string, event: EventFormData) => {
    try {
      set({ loading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Check if event still exists
      const exists = await isEventExists(id, user.id);
      if (!exists) {
        throw new Error('Event no longer exists');
      }

      // Check for scheduling conflicts
      const hasConflict = await checkEventConflicts(
        event.start_time,
        event.end_time,
        user.id,
        id // Exclude current event from conflict check
      );

      if (hasConflict) {
        throw new Error('This time slot conflicts with another event');
      }

      const { error } = await supabase
        .from('events')
        .update(event)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      toast.success('Event updated successfully');
      await get().fetchEvents();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update event';
      set({ error: message });
      toast.error(message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteEvent: async (id: string) => {
    try {
      set({ loading: true, error: null });
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Check if event still exists
      const exists = await isEventExists(id, user.id);
      if (!exists) {
        throw new Error('Event already deleted');
      }

      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      toast.success('Event deleted successfully');
      await get().fetchEvents();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete event';
      set({ error: message });
      toast.error(message);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));