import React from 'react';

interface ToolbarButtonProps {
  label: string;
  icon: string;
  hasDropdown?: boolean;
  onClick: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  label,
  icon,
  hasDropdown = false,
  onClick,
}) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'filter':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        );
      case 'sort':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5h10M11 9h7M11 13h4" />
            <path d="m3 17 3 3 3-3M6 18V4" />
          </svg>
        );
      case 'import':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        );
      case 'export':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <button 
      className="toolbar-button" 
      onClick={onClick}
      aria-label={label}
      type="button"
    >
      {renderIcon(icon)}
      <span className="toolbar-button-label">{label}</span>
      {hasDropdown && (
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="dropdown-icon"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
    </button>
  );
};

export default ToolbarButton;