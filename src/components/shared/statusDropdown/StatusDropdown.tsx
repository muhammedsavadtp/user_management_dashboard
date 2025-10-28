import React, { useRef, useState, useEffect, useMemo } from 'react';
import SearchInput from './SearchInput';
import StatusOptionsList from './StatusOptionsList';
import AddNewAction from './AddNewAction';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { usePopoverPosition } from '../../../hooks/usePopoverPosition';
import type { StatusDropdownProps } from './types';
import './StatusDropdown.scss';

const StatusDropdown: React.FC<StatusDropdownProps> = ({
  isOpen,
  onClose,
  triggerRef,
  statusOptions = ['Active', 'Inactive', 'Busy', 'Away', 'Terminated'],
  onStatusSelect,
  onAddNewStatus,
  selectedStatus,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = useMemo(() => {
    if (searchQuery) {
      return statusOptions.filter(option =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return statusOptions;
  }, [searchQuery, statusOptions]);

  const position = usePopoverPosition(triggerRef, dropdownRef, isOpen);

  useClickOutside([dropdownRef, triggerRef], onClose, isOpen);

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleStatusSelect = (status: string) => {
    onStatusSelect(status);
    onClose();
  };

  const handleAddNewStatus = () => {
    onAddNewStatus?.();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`status-dropdown-popover ${position.placement}`}
      style={{
        top: position.top !== undefined ? `${position.top}px` : undefined,
        bottom: position.bottom !== undefined ? `${position.bottom}px` : undefined,
        left: position.left !== undefined ? `${position.left}px` : undefined,
      }}
    >
      <div className="popover-arrow" />

      <SearchInput
        placeholder="Find Status"
        value={searchQuery}
        onChange={handleSearch}
      />

      <StatusOptionsList
        options={filteredOptions}
        onSelect={handleStatusSelect}
        selectedStatus={selectedStatus}
        noResultsMessage={searchQuery ? 'No status found' : undefined}
      />

      <AddNewAction
        label="Add New Status"
        onClick={handleAddNewStatus}
      />
    </div>
  );
};

export default StatusDropdown;