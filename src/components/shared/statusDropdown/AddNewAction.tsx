import React from 'react';

interface AddNewActionProps {
  label: string;
  onClick: () => void;
}

const AddNewAction: React.FC<AddNewActionProps> = ({ label, onClick }) => {
  return (
    <button className="add-new-action" onClick={onClick} type="button">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="plus-icon"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      <span>{label}</span>
    </button>
  );
};

export default AddNewAction;