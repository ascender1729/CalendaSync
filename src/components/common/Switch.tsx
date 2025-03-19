import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export function Switch({ checked, onChange, className = '' }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`${className} ${
        checked ? 'bg-indigo-600' : 'bg-gray-200'
      } transition-colors duration-200 ease-in-out`}
    >
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out`}
      />
    </button>
  );
}