import React, { useState } from 'react';
import SearchBar from './SearchBar';
import ToolbarButton from './ToolbarButton';
import './DataTableToolbar.scss';

interface DataTableToolbarProps {
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onSort?: () => void;
  onImport?: () => void;
  onExport?: () => void;
  searchPlaceholder?: string;
  searchTerm?: string; // Added searchTerm prop
}

const DataTableToolbar: React.FC<DataTableToolbarProps> = ({
  onSearch,
  onFilter,
  onSort,
  onImport,
  onExport,
  searchPlaceholder = 'Search...',
  searchTerm, // Destructure searchTerm
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    onSearch?.(query);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="data-table-toolbar">
      <div className="toolbar-left">
        <button
          className="toolbar-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle toolbar options"
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span>Options</span>
        </button>
      </div>

      <div className={`toolbar-right ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <SearchBar
          placeholder={searchPlaceholder}
          onSearch={handleSearch}
          value={searchTerm} // Pass searchTerm as value
        />

        <div className="toolbar-actions">
          <ToolbarButton
            label="Filter"
            icon="filter"
            hasDropdown={true}
            onClick={() => onFilter?.()}
          />

          <ToolbarButton
            label="Sort"
            icon="sort"
            hasDropdown={true}
            onClick={() => onSort?.()}
          />

          <ToolbarButton
            label="Import"
            icon="import"
            onClick={() => onImport?.()}
          />

          <ToolbarButton
            label="Export"
            icon="export"
            onClick={() => onExport?.()}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTableToolbar;