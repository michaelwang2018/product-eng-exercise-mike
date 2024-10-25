import React from 'react';
import DarkModeToggle from './DarkModeToggle';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="flex justify-between items-center mb-4 p-4 bg-gray-100 dark:bg-gray-700">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Feedback Dashboard</h1>
      <div className="flex items-center">
        <span className="mr-2 text-gray-700 dark:text-gray-300">
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </span>
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
      </div>
    </header>
  );
};

export default Header;