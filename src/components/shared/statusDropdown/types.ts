export interface StatusDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
  statusOptions?: string[];
  onStatusSelect: (status: string) => void;
  onAddNewStatus?: () => void;
  selectedStatus?: string;
}

export interface StatusOption {
  label: string;
  value: string;
}

export interface PopoverPosition {
  top?: number;
  bottom?: number;
  left?: number;
  placement: 'top' | 'bottom';
}