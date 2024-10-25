import React from 'react';

interface DataTableColumn<T> {
  headerName: string;
  cellRenderer: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  schema: DataTableColumn<T>[];
  fullWidth?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  data,
  schema,
  fullWidth,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${fullWidth ? 'w-full' : ''}`}>
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {schema.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
              >
                {column.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
              {schema.map((column, columnIndex) => (
                <td
                  key={columnIndex}
                  className="px-6 py-4 whitespace-nowrap text-sm text-black dark:text-gray-300"
                >
                  {column.cellRenderer(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
