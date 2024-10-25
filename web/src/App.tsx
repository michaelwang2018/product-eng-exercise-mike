import React, { useState, useCallback, useEffect } from "react";
import { NavTabs, TabConfig } from "./components/NavTabs";
import { Feedback } from "./Feedback";
import { Groups } from "./Groups";
import Filter from './components/Filter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { FilterState } from "./hooks";

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

  useEffect(() => {
    console.log("Filters changed:", filters);
  }, [filters]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen flex flex-col p-4">
        <div className="mb-4">
          <Filter 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onClearFilters={handleClearFilters} 
          />
        </div>
        <div className="flex-grow flex flex-col">
          <NavTabs
            config={TabsConfig}
            tabOrder={["feedback", "groups"]}
            onTabClicked={(tabId) => {
              setSelectedTab(tabId);
            }}
            selectedTab={selectedTab}
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
    </QueryClientProvider>
  );
}

export default App;
