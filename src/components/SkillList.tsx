import React from 'react';
import { X } from 'lucide-react';
import { useStore } from '../lib/store';

export function SkillList() {
  const { skills, removeSkill } = useStore();

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900">Your Skills</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900">{skill.name}</p>
              <p className="truncate text-sm text-gray-500">
                {skill.category} • {skill.proficiency}
              </p>
            </div>
            <button
              onClick={() => removeSkill(skill.id)}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}