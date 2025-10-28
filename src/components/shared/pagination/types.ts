export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
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