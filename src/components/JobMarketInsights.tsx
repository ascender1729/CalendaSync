import React from 'react';
import { LineChart as Chart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStore } from '../lib/store';
import { TrendingUp, DollarSign, Building } from 'lucide-react';

export function JobMarketInsights() {
  const insights = useStore((state) => state.jobMarketInsights);

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Job Market Insights</h3>
      
      <div className="space-y-6">
        {insights.map((insight) => (
          <div key={insight.skill_name} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-medium text-gray-900">{insight.skill_name}</h4>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <TrendingUp className="w-4 h-4 mr-1" />
                {insight.growth_rate}% Growth
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Average Salary</p>
                  <p className="text-lg font-medium">${insight.avg_salary.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Building className="w-5 h-5 text-gray-400 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Open Positions</p>
                  <p className="text-lg font-medium">{insight.job_count.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Top Companies</p>
              <div className="flex flex-wrap gap-2">
                {insight.top_companies.map((company) => (
                  <span
                    key={company}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={insights}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="skill_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="demand_score" stroke="#4F46E5" name="Demand Score" />
            <Line type="monotone" dataKey="growth_rate" stroke="#10B981" name="Growth Rate" />
          </Chart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}