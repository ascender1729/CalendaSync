import React from 'react';
import { useStore } from '../lib/store';
import { BookOpen } from 'lucide-react';

export function ProjectRecommendations() {
  const projects = useStore((state) => state.projects);

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-gray-900">Recommended Projects</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col rounded-lg border border-gray-300 bg-white overflow-hidden"
          >
            <div className="px-6 py-4">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                <h3 className="ml-2 text-lg font-medium text-gray-900">{project.title}</h3>
              </div>
              <p className="mt-3 text-sm text-gray-500">{project.description}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Difficulty: {project.difficulty}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}