import React from 'react';
import { cn } from '@/lib/utils'; // Optional utility for conditional classNames

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, className, ...props }) => {
  return (
    <label className="inline-flex items-center space-x-2 cursor-pointer">
      <span className="relative inline-block w-5 h-5">
        <input
          type="checkbox"
          className={cn(
            'appearance-none peer w-full h-full border border-gray-300 rounded-md bg-white',
            'checked:bg-primary checked:border-primary checked:ring-2 checked:ring-primary/20',
            'focus:outline-none focus:ring-2 focus:ring-primary/40',
            'transition-all duration-200',
            className,
          )}
          {...props}
        />
        <svg
          className="absolute top-1 left-1 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
          viewBox="0 0 20 20"
          fill="none">
          <path
            d="M6 10l2 2 5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {label && <span className="text-sm select-none">{label}</span>}
    </label>
  );
};

export { Checkbox };
