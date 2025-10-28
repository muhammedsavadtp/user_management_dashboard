import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  placeholder: string;
  onSearch: (query: string) => void;
  value?: string; // Added value prop
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch, value }) => { // Destructure value
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onSearch(newValue);
  };

  const handleClear = () => {
    onSearch('');
  };

  return (
    <div className="search-bar-container">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="search-icon"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value || ''} // Use value prop
        onChange={handleChange}
        aria-label="Search"
      />

      {value && ( // Check value instead of internal state
        <button
          type="button"
          className="search-clear"
          onClick={handleClear}
          aria-label="Clear search"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;