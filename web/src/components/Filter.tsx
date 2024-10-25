import React, { useEffect, useRef } from 'react';
import { Select, Button, Tag, Space, DatePicker, Popover } from 'antd';
import moment from 'moment';

const { Option } = Select;

interface FilterState {
  importance: string[];
  type: string[];
  customer: string[];
  date: string | null;
}

const importanceOptions = ['High', 'Medium', 'Low'];
const typeOptions = ['Research', 'Customer', 'Sales'];
const customerOptions = ['Ramp', 'Brex', 'Vanta', 'Notion', 'Linear', 'OpenAI', 'Loom'];

interface FilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({ filters, onFilterChange, onClearFilters }) => {
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [filterType]: value };
    onFilterChange(newFilters);
  };

  const handleRemoveFilter = (filterType: keyof FilterState, value: string) => {
    const newValues = filters[filterType].filter((v) => v !== value);
    handleFilterChange(filterType, newValues);
  };

  const handleRemoveDate = () => {
    handleFilterChange('date', null);
  };

  const handleClearFilters = () => {
    onClearFilters();
  };

  const content = (
    <Space direction="vertical" style={{ width: '250px' }}>
      <Select
        style={{ width: '100%' }}
        placeholder="Select Importance"
        mode="multiple"
        value={filters.importance}
        onChange={(value) => handleFilterChange('importance', value)}
      >
        {importanceOptions.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>
      <Select
        style={{ width: '100%' }}
        placeholder="Select Type"
        mode="multiple"
        value={filters.type}
        onChange={(value) => handleFilterChange('type', value)}
      >
        {typeOptions.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>
      <Select
        style={{ width: '100%' }}
        placeholder="Select Customer"
        mode="multiple"
        value={filters.customer}
        onChange={(value) => handleFilterChange('customer', value)}
      >
        {customerOptions.map(option => (
          <Option key={option} value={option}>{option}</Option>
        ))}
      </Select>
      <DatePicker
        style={{ width: '100%' }}
        format="MM/DD/YYYY"
        value={filters.date ? moment(filters.date) : null}
        onChange={(date, dateString) => handleFilterChange('date', dateString)}
      />
    </Space>
  );

  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center flex-wrap gap-2">
        <Popover
          content={content}
          title="Filter Options"
          trigger="click"
          visible={isPopoverVisible}
          onVisibleChange={setIsPopoverVisible}
          getPopupContainer={() => filterButtonRef.current || document.body}
        >
          <Button ref={filterButtonRef} className="dark:bg-gray-700 dark:text-white">
            Filter
          </Button>
        </Popover>
        {Object.entries(filters).map(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            return value.map((v) => (
              <Tag key={`${key}-${v}`} closable onClose={() => handleRemoveFilter(key as keyof FilterState, v)} className="dark:bg-gray-600 dark:text-white">
                {`${key}: ${v}`}
              </Tag>
            ));
          } else if (key === 'date' && value) {
            return (
              <Tag key={key} closable onClose={handleRemoveDate} className="dark:bg-gray-600 dark:text-white">
                {`${key}: ${value}`}
              </Tag>
            );
          }
          return null;
        })}
      </div>
      <Button onClick={handleClearFilters} className="dark:bg-gray-700 dark:text-white">Clear</Button>
    </div>
  );
};

export default Filter;
