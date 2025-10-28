export interface PaginationProps {
  currentPage: number;
  totalPages: number; // This will now be calculated in HomePage
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  pageSize: number; // Added
  onPageSizeChange: (size: number) => void; // Added
  totalItems: number; // Added
}

export interface PaginationButtonProps {
  label: string;
  icon: 'arrow-left' | 'arrow-right';
  direction: 'prev' | 'next';
  disabled: boolean;
  onClick: () => void;
}

export interface PageNumberListProps {
  currentPage: number;
  totalPages: number;
  maxVisiblePages: number;
  onPageClick: (page: number) => void;
}