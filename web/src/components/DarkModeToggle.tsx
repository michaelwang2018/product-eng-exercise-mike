import React from 'react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDarkMode, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`
        w-8 h-8 rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${isDarkMode ? 'bg-blue-600' : 'bg-gray-200'}
      `}
    >
        <span className="text-gray-700 dark:text-gray-300">
            {isDarkMode ? '☾' : '☀︎'}
        </span>
      <div
        className={`
          w-6 h-6 rounded-full transition-transform duration-200 ease
        `}
      />
    </button>
  );
};

export default DarkModeToggle;
