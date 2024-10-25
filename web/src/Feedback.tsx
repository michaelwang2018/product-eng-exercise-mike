import { FeedbackDataTable } from "./components/FeedbackDataTable";
import { useFeedbackQuery, FilterState } from "./hooks";

type Props = {
  filters: FilterState;
};

export function Feedback({ filters }: Props) {
  const { data, isLoading, isError, error } = useFeedbackQuery(filters);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return <FeedbackDataTable data={data.data} />;
}
