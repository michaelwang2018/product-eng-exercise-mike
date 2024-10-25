import React, { useState, useCallback, useEffect } from "react";
import { NavTabs, TabConfig } from "./components/NavTabs";
import { Feedback } from "./Feedback";
import { Groups } from "./Groups";
import Filter from './components/Filter';
import Header from './components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterState } from "./hooks";
import { ConfigProvider } from 'antd';
import { lightTheme, darkTheme } from './theme';

const queryClient = new QueryClient()

const TabsConfig: TabConfig = {
  feedback: { id: "feedback", name: "Feedback" },
  groups: { id: "groups", name: "Groups" },
};

const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("feedback");
  const [filters, setFilters] = useState<FilterState>({
    importance: [],
    type: [],
    customer: [],
    date: null,
  });
  const [filterKey, setFilterKey] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    setFilterKey(prevKey => prevKey + 1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      importance: [],
      type: [],
      customer: [],
      date: null,
    });
    setFilterKey(prevKey => prevKey + 1);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <div className={`w-screen h-screen flex flex-col ${isDarkMode ? 'dark' : ''} bg-white dark:bg-gray-800 text-black dark:text-white`}>
          <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
          <div className="flex-grow flex flex-col p-4">
            <div className="mb-4">
              <Filter 
                filters={filters} 
                onFilterChange={handleFilterChange} 
                onClearFilters={handleClearFilters}
                isDarkMode={isDarkMode}
              />
            </div>
            <NavTabs
              config={TabsConfig}
              tabOrder={["feedback", "groups"]}
              onTabClicked={(tabId) => {
                setSelectedTab(tabId);
              }}
              selectedTab={selectedTab}
              isDarkMode={isDarkMode}
            />
            <div className="flex-grow mt-4">
              {selectedTab === "feedback" ? (
                <Feedback key={filterKey} filters={filters} />
              ) : (
                <Groups key={filterKey} filters={filters} />
              )}
            </div>
          </div>
        </div>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
