import React from 'react';
import { format } from 'date-fns';
import { Edit2, Trash2, Loader2, Calendar } from 'lucide-react';
import { EventFormData } from '../lib/validation';

interface Event extends EventFormData {
  id: string;
  user_id: string;
}

interface EventListProps {
  events: Event[];
  loading: boolean;
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

export function EventList({ events, loading, onEdit, onDelete }: EventListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">
          No events yet. Create your first event!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-4"
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate">{event.title}</h3>
            {event.description && (
              <p className="text-gray-600 mt-1 line-clamp-2">{event.description}</p>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(event.start_time), 'PPp')}
              </span>
              <span className="hidden sm:inline">-</span>
              <span>{format(new Date(event.end_time), 'PPp')}</span>
            </div>
          </div>
          <div className="flex gap-2 self-end sm:self-center">
            <button
              onClick={() => onEdit(event)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Edit event"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this event?')) {
                  onDelete(event.id);
                }
              }}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Delete event"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}