import React from 'react';
import PaginationButton from './PaginationButton';
import PageNumberList from './PageNumberList';
import type { PaginationProps } from './types';
import './Pagination.scss';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  pageSize, // New prop
  onPageSizeChange, // New prop
  totalItems, // New prop
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(e.target.value));
  };

  return (
    <nav className="pagination-container" aria-label="Pagination">
      <div className="pagination-info">
        Showing {Math.min(totalItems, (currentPage - 1) * pageSize + 1)} to {Math.min(totalItems, currentPage * pageSize)} of {totalItems} results
      </div>
      <div className="pagination-controls">
        <PaginationButton
          label="Previous"
          icon="arrow-left"
          direction="prev"
          disabled={currentPage === 1}
          onClick={handlePrevious}
        />

        <PageNumberList
          currentPage={currentPage}
          totalPages={totalPages}
          maxVisiblePages={maxVisiblePages}
          onPageClick={handlePageClick}
        />

        <PaginationButton
          label="Next"
          icon="arrow-right"
          direction="next"
          disabled={currentPage === totalPages}
          onClick={handleNext}
        />
      </div>
      <div className="page-size-selector">
        <label htmlFor="pageSize">Items per page:</label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </nav>
  );
};

export default Pagination;