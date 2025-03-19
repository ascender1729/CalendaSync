import React from 'react';
import { useStore } from '../lib/store';
import { TrendingUp, Clock, DollarSign } from 'lucide-react';

export function CareerPathRecommendations() {
  const careerPaths = useStore((state) => state.careerPaths);

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Career Paths</h3>
      <div className="space-y-4">
        {careerPaths.map((path) => (
          <div
            key={path.id}
            className="border border-gray-200 rounded-lg p-6 hover:border-indigo-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-xl font-semibold text-gray-900">{path.title}</h4>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <TrendingUp className="w-4 h-4 mr-1" />
                High Demand
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{path.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Estimated Time</p>
                  <p className="text-lg font-medium">{path.estimated_time_months} months</p>
                </div>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Average Salary</p>
                  <p className="text-lg font-medium">${path.avg_salary.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Required Skills</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {path.required_skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              View Career Path
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}