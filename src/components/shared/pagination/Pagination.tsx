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

  return (
    <nav className="pagination-container" aria-label="Pagination">
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
    </nav>
  );
};

export default Pagination;