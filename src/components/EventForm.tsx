import React from 'react';
import { Loader2 } from 'lucide-react';
import { EventFormData } from '../lib/validation';

interface EventFormProps {
  currentEvent: Partial<EventFormData>;
  isEditing: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (field: keyof EventFormData, value: string) => void;
  onCancel: () => void;
}

export function EventForm({
  currentEvent,
  isEditing,
  loading,
  onSubmit,
  onChange,
  onCancel,
}: EventFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={currentEvent.title || ''}
          onChange={(e) => onChange('title', e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          required
          maxLength={100}
          disabled={loading}
          placeholder="Enter event title"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={currentEvent.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          rows={3}
          maxLength={500}
          disabled={loading}
          placeholder="Enter event description (optional)"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Time <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          value={currentEvent.start_time?.slice(0, 16) || ''}
          onChange={(e) => onChange('start_time', e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          required
          disabled={loading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Time <span className="text-red-500">*</span>
        </label>
        <input
          type="datetime-local"
          value={currentEvent.end_time?.slice(0, 16) || ''}
          onChange={(e) => onChange('end_time', e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          required
          disabled={loading}
        />
      </div>
      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : isEditing ? (
            'Update'
          ) : (
            'Create'
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}