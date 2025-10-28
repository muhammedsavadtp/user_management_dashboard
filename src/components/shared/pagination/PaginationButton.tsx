import React from 'react';
import type { PaginationButtonProps } from './types';

const PaginationButton: React.FC<PaginationButtonProps> = ({
  label,
  icon,
  direction,
  disabled,
  onClick,
}) => {
  const renderIcon = () => {
    if (icon === 'arrow-left') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      );
    }
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    );
  };

  return (
    <button
      className={`pagination-button ${direction}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      type="button"
    >
      {direction === 'prev' && renderIcon()}
      <span>{label}</span>
      {direction === 'next' && renderIcon()}
    </button>
  );
};

export default PaginationButton;