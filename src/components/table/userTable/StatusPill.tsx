import React from 'react';

interface StatusPillProps {
  statusText: string;
  type: string;
}

const StatusPill: React.FC<StatusPillProps> = ({ statusText, type }) => {
  const getStatusColor = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      'Active': 'green',
      'Inactive': 'orange',
      'OnLeave': 'red',
      'Busy': 'yellow',
      'Terminated': 'red',
      'Away': 'yellow',
      'DoNotDisturb': 'red',
    };
    return statusMap[status] || 'gray';
  };

  const color = getStatusColor(type);

  return (
    <div className={`status-pill status-${color}`}>
      <span className="status-dot"></span>
      <span className="status-text">{statusText}</span>
    </div>
  );
};

export default StatusPill;