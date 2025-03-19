import React, { useEffect, useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { eventSchema, type EventFormData } from '../lib/validation';
import { useEventStore } from '../lib/store';
import { EventList } from './EventList';
import { EventForm } from './EventForm';

interface Event extends EventFormData {
  id: string;
  user_id: string;
}

export function Calendar() {
  const { events, loading, fetchEvents, createEvent, updateEvent, deleteEvent } =
    useEventStore();
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Partial<Event>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchEvents();
      } catch (error) {
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
            fetchData();
          }, Math.min(1000 * Math.pow(2, retryCount), 10000)); // Exponential backoff
        } else {
          toast.error('Failed to load events after multiple attempts');
        }
      }
    };

    fetchData();
  }, [fetchEvents, retryCount]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validatedData = eventSchema.parse(currentEvent);

      if (isEditing && currentEvent.id) {
        await updateEvent(currentEvent.id, validatedData);
        toast.success('Event updated successfully');
      } else {
        await createEvent(validatedData);
        toast.success('Event created successfully');
      }

      setShowModal(false);
      setCurrentEvent({});
      setIsEditing(false);
    } catch (error) {
      if (error.errors) {
        error.errors.forEach((err: any) => {
          toast.error(err.message);
        });
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Events</h2>
        <button
          onClick={() => {
            setCurrentEvent({});
            setIsEditing(false);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          disabled={loading}
        >
          <Plus className="h-5 w-5" />
          <span>New Event</span>
        </button>
      </div>

      <EventList
        events={events}
        loading={loading}
        onEdit={(event) => {
          setCurrentEvent(event);
          setIsEditing(true);
          setShowModal(true);
        }}
        onDelete={async (id) => {
          try {
            await deleteEvent(id);
            toast.success('Event deleted successfully');
          } catch (error) {
            toast.error('Failed to delete event');
          }
        }}
      />

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? 'Edit Event' : 'New Event'}
            </h2>
            <EventForm
              currentEvent={currentEvent}
              isEditing={isEditing}
              loading={loading}
              onSubmit={handleSubmit}
              onChange={(field, value) =>
                setCurrentEvent({ ...currentEvent, [field]: value })
              }
              onCancel={() => {
                setShowModal(false);
                setCurrentEvent({});
                setIsEditing(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}