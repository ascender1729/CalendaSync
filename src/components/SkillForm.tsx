import React from 'react';
import { useForm } from 'react-hook-form';
import { PlusCircle } from 'lucide-react';
import { useStore, Skill } from '../lib/store';

interface SkillFormData {
  name: string;
  category: 'technical' | 'soft' | 'domain';
  proficiency: 'beginner' | 'intermediate' | 'advanced';
}

export function SkillForm() {
  const { register, handleSubmit, reset } = useForm<SkillFormData>();
  const addSkill = useStore((state) => state.addSkill);

  const onSubmit = (data: SkillFormData) => {
    const newSkill: Skill = {
      id: crypto.randomUUID(),
      ...data,
    };
    addSkill(newSkill);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Skill Name
        </label>
        <input
          type="text"
          id="name"
          {...register('name', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          {...register('category', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="technical">Technical</option>
          <option value="soft">Soft Skills</option>
          <option value="domain">Domain Knowledge</option>
        </select>
      </div>

      <div>
        <label htmlFor="proficiency" className="block text-sm font-medium text-gray-700">
          Proficiency Level
        </label>
        <select
          id="proficiency"
          {...register('proficiency', { required: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusCircle className="h-5 w-5 mr-2" />
        Add Skill
      </button>
    </form>
  );
}