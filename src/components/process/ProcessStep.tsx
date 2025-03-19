import React from 'react';
import { Brain, LineChart, Rocket } from 'lucide-react';
import type { ProcessStep as ProcessStepType } from '../../data/process';

const icons = {
  brain: Brain,
  chart: LineChart,
  rocket: Rocket
};

interface ProcessStepProps extends ProcessStepType {
  index: number;
}

export function ProcessStep({ title, description, icon, index }: ProcessStepProps) {
  const Icon = icons[icon];
  
  return (
    <div className="relative">
      {/* Connector Line */}
      {index < 2 && (
        <div className="hidden md:block absolute top-24 left-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-600/20 to-indigo-600/20" />
      )}
      
      <div className="relative flex flex-col items-center p-6">
        {/* Step Number */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
          {index + 1}
        </div>
        
        {/* Icon */}
        <div className="mb-6 rounded-full bg-indigo-100 p-4">
          <Icon className="w-8 h-8 text-indigo-600" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-center">
          {description}
        </p>
      </div>
    </div>
  );
}