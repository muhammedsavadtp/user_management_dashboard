import React from 'react';
import type { PageNumberListProps } from './types';

const PageNumberList: React.FC<PageNumberListProps> = ({
  currentPage,
  totalPages,
  maxVisiblePages,
  onPageClick,
}) => {
  const generatePageNumbers = (): (number | string)[] => {
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const sidePages = Math.floor((maxVisiblePages - 3) / 2); // Reserve space for first, last, and ellipsis

    // Always show first page
    pages.push(1);

    // Calculate range around current page
    let startPage = Math.max(2, currentPage - sidePages);
    let endPage = Math.min(totalPages - 1, currentPage + sidePages);

    // Adjust if we're near the start
    if (currentPage <= sidePages + 2) {
      startPage = 2;
      endPage = Math.min(maxVisiblePages - 1, totalPages - 1);
    }

    // Adjust if we're near the end
    if (currentPage >= totalPages - sidePages - 1) {
      startPage = Math.max(2, totalPages - maxVisiblePages + 2);
      endPage = totalPages - 1;
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('ellipsis-start');
    }

    // Add pages in range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    // Always show last page (if there's more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <ul className="page-number-list">
      {pages.map((page, index) => {
        if (typeof page === 'string') {
          // Render ellipsis
          return (
            <li key={`${page}-${index}`} className="page-number-item ellipsis">
              <span>...</span>
            </li>
          );
        }

        // Render page number
        return (
          <li
            key={page}
            className={`page-number-item ${currentPage === page ? 'active' : ''}`}
          >
            <button
              onClick={() => onPageClick(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              type="button"
            >
              {page}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default PageNumberList;