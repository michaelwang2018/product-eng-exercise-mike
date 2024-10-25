import React from 'react';
import DarkModeToggle from './DarkModeToggle';
import ClarityLogo from '../assets/ClarityLogo.svg';
import ClarityLogoDarkMode from '../assets/ClarityLogoDarkMode.svg';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="flex justify-between items-center mb-4 p-4 bg-gray-100 dark:bg-gray-700">
      <div className="flex items-center">
        <img src={isDarkMode ? ClarityLogoDarkMode : ClarityLogo} alt="Clarity Logo" className="h-8 w-auto mr-2" />
      </div>
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
    </header>
  );
};

export default Header;
