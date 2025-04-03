import React from 'react';
import { TableCell } from './TableCell';

interface ScheduleGridProps {
  cells: {
    [key: string]: {
      name: string;
      roles: string[];
      cellId?: string;
      props: {
        enabled: boolean;
        color?: string;
        icon?: string;
        employeeDetails?: {
          name: string;
          timeSlot: string;
          comments?: string;
          [key: string]: any;
        };
      };
    };
  };
}

export const ScheduleGrid: React.FC<ScheduleGridProps> = ({ cells }) => {
  const dates = ['09/03/2015', '10/03/2015', '11/03/2015', '12/03/2015'];
  const employees = ['Alok', 'Rakesh', 'Ram', 'Prem', 'Anurag'];

  return (
    <div style={{ padding: '20px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#1a1a1a', color: '#fff' }}>
        <thead>
          <tr>
            <th style={headerStyle}>Employee</th>
            {dates.map(date => (
              <th key={date} style={headerStyle}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee}>
              <td style={cellStyle}>{employee}</td>
              {dates.map(date => {
                const cellKey = `${employee}-${date}`;
                const cellData = cells[cellKey];
                return (
                  <td key={date} style={cellStyle}>
                    {cellData ? (
                      <TableCell
                        cellId={cellKey}
                        color={cellData.props.color}
                        icon={cellData.props.icon}
                        enabled={cellData.props.enabled}
                        employeeDetails={cellData.props.employeeDetails}
                      />
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const headerStyle: React.CSSProperties = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #333',
  borderRight: '1px solid #333',
  backgroundColor: '#262626'
};

const cellStyle: React.CSSProperties = {
  padding: '8px',
  borderBottom: '1px solid #333',
  borderRight: '1px solid #333',
  minWidth: '150px',
  height: '100px',
  verticalAlign: 'top'
};
