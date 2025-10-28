import React from 'react';

interface StatusOptionsListProps {
  options: string[];
  onSelect: (status: string) => void;
  selectedStatus?: string;
  noResultsMessage?: string;
}

const StatusOptionsList: React.FC<StatusOptionsListProps> = ({
  options,
  onSelect,
  selectedStatus,
  noResultsMessage,
}) => {
  if (options.length === 0) {
    return (
      <div className="no-results">
        {noResultsMessage || 'No options available'}
      </div>
    );
  }

  return (
    <ul className="status-options-list">
      {options.map((option, index) => (
        <li
          key={index}
          className={`status-item ${selectedStatus === option ? 'selected' : ''}`}
          onClick={() => onSelect(option)}
          role="option"
          aria-selected={selectedStatus === option}
        >
          {option}
        </li>
      ))}
    </ul>
  );
};

export default StatusOptionsList;