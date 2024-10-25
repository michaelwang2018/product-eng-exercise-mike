import React from "react";
import cx from "classnames";

export interface TabConfig {
  [key: string]: {
    id: string;
    name: string;
  };
}

interface NavTabsProps {
  config: TabConfig;
  tabOrder: string[];
  selectedTab: string;
  onTabClicked: (tabId: string) => void;
  isDarkMode: boolean;
}

export function NavTabs({
  config,
  tabOrder,
  selectedTab,
  onTabClicked,
  isDarkMode,
}: NavTabsProps) {
  return (
    <nav className="flex space-x-4" aria-label="Tabs">
      {tabOrder.map((tabId) => (
        <button
          key={tabId}
          onClick={() => onTabClicked(tabId)}
          className={cx(
            selectedTab === tabId
              ? "bg-blue-600 text-white"
              : "text-gray-500 hover:text-gray-700",
            "px-3 py-2 font-medium text-sm rounded-md",
            isDarkMode && "dark:text-gray-300 dark:hover:text-white",
            selectedTab === tabId && isDarkMode && "dark:bg-blue-700"
          )}
        >
          {config[tabId].name}
        </button>
      ))}
    </nav>
  );
}
