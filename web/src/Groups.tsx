import React, { useState, useCallback } from "react";
import { GroupsDataTable } from "./components/GroupsDataTable";
import { useGroupsQuery, useFeedbackQuery, FilterState } from "./hooks";

type Props = {
  filters: FilterState;
};

export function Groups({ filters }: Props) {
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const groupsReq = useGroupsQuery(filters);
  const feedbackReq = useFeedbackQuery(filters, selectedGroupId);

  const handleGroupSelect = useCallback((groupId: string) => {
    setSelectedGroupId(groupId);
  }, []);

  if (groupsReq.isLoading || feedbackReq.isLoading || !groupsReq.data || !feedbackReq.data) {
    return <div>Loading...</div>;
  }

  return (
    <GroupsDataTable 
      data={groupsReq.data.data} 
      allFeedback={feedbackReq.data.data} 
      onGroupSelect={handleGroupSelect}
      selectedGroupId={selectedGroupId}
    />
  );
}
