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
        w-12 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out
        ${isDarkMode ? 'bg-blue-600' : 'bg-gray-300'}
      `}
    >
      <div
        className={`
          w-4 h-4 rounded-full transition-transform duration-200 ease-in-out
          ${isDarkMode ? 'bg-white transform translate-x-6' : 'bg-white'}
        `}
      />
    </button>
  );
};

export default DarkModeToggle;