export interface User {
  id: number;
  name: string;
  username: string;
  avatarUrl: string;
  status: string[];
  role: string;
  email: string;
  teams: string[];
  isOnline: boolean;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface TableColumn {
  key: string;
  label: string;
  sortable: boolean;
  width: string;
}

export interface UserTableProps {
  users: User[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onSelectionChange?: (selectedIds: number[]) => void;
  onSort?: (key: string, direction: SortDirection) => void;
  onStatusChange?: (userId: number, newStatus: string) => void;
}