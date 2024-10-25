import React, { useState, useRef } from 'react';
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
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const Filter: React.FC<FilterProps> = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState<FilterState>({
    importance: [],
    type: [],
    customer: [],
    date: null,
  });
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);

  const handleFilterChange = (filterType: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
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
    const clearedFilters = {
      importance: [],
      type: [],
      customer: [],
      date: null,
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
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
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <Popover
          content={content}
          title="Filter Options"
          trigger="click"
          visible={isPopoverVisible}
          onVisibleChange={setIsPopoverVisible}
          getPopupContainer={() => filterButtonRef.current || document.body}
        >
          <Button ref={filterButtonRef}>
            Filter
          </Button>
        </Popover>
        {Object.entries(filters).map(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            return value.map((v) => (
              <Tag key={`${key}-${v}`} closable onClose={() => handleRemoveFilter(key as keyof FilterState, v)}>
                {`${key}: ${v}`}
              </Tag>
            ));
          } else if (key === 'date' && value) {
            return (
              <Tag key={key} closable onClose={handleRemoveDate}>
                {`${key}: ${value}`}
              </Tag>
            );
          }
          return null;
        })}
      </div>
      <Button onClick={handleClearFilters}>Clear</Button>
    </div>
  );
};

export default Filter;
