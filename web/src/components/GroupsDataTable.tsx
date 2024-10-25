import cx from "classnames";
import { useState, useMemo } from "react";
import { GroupSummary, FeedbackData } from "../hooks";
import { DataTable } from "./DataTable";

const importanceValue = {
  High: 2,
  Medium: 1,
  Low: 0,
} as const;

interface GroupsDataTableProps {
  data: GroupSummary[];
  allFeedback: FeedbackData;
}

export function GroupsDataTable({ data, allFeedback }: GroupsDataTableProps) {
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);

  const groupFeedback = useMemo(() => {
    const selectedGroup = data[selectedGroupIndex];
    return allFeedback.filter(feedback => selectedGroup.feedbackIds.includes(feedback.id));
  }, [selectedGroupIndex, data, allFeedback]);

  const handleGroupClick = (index: number) => {
    setSelectedGroupIndex(index);
  };

  return (
    <div className="hide-scroll-bar flex h-full w-full align-top">
      <div
        className="hide-scroll-bar h-full overflow-y-auto"
        style={{ width: 500 }}
      >
        {data.map((group, index) => (
          <div
            key={`grouped-feedback-${index}`}
            onClick={() => handleGroupClick(index)}
            className={cx("border-b px-6 py-4 hover:cursor-pointer", {
              "bg-primary-action-light": selectedGroupIndex === index,
              "hover:bg-hover-gray": selectedGroupIndex !== index,
            })}
          >
            <div className="mb-2 text-base font-semibold">{group.title}</div>
            <div className="text-sm">{group.body}</div>
          </div>
        ))}
      </div>
      <div className="bg-dusty-white w-full flex-1 p-4">
        <DataTable
          fullWidth
          data={groupFeedback
            .sort(
              (a, b) =>
                importanceValue[b.importance] - importanceValue[a.importance]
            )
            .map((feedback) => ({
              id: feedback.id,
              name: feedback.name,
              description: feedback.description,
              importance: feedback.importance,
              customerName: feedback.customer,
              date: feedback.date,
              type: feedback.type,
            }))}
          schema={[
            {
              headerName: "Description",
              cellRenderer: (row) => (
                <div className="py-3">
                  <div className="font-semibold">{row.name}</div>
                </div>
              ),
            },
            {
              headerName: "Priority",
              cellRenderer: (row) => (
                <div className="whitespace-nowrap text-sm">
                  {row.importance}
                </div>
              ),
            },
            {
              headerName: "Type",
              cellRenderer: (row) => (
                <div className="whitespace-nowrap text-sm">{row.type}</div>
              ),
            },
            {
              headerName: "Customer",
              cellRenderer: (row) => (
                <div className="whitespace-nowrap text-sm">
                  {row.customerName}
                </div>
              ),
            },
            {
              headerName: "Date",
              cellRenderer: (row) =>
                row.date ? (
                  <div className="whitespace-nowrap text-sm">
                    {new Date(row.date).toLocaleDateString()}
                  </div>
                ) : undefined,
            },
          ]}
        />
      </div>
    </div>
  );
}
