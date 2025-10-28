import React, { useRef, useState } from "react";
import AvatarNameCell from "./AvatarNameCell";
import StatusPill from "./StatusPill";
import TeamTag from "./TeamTag";
import ActionButtons from "./ActionButtons";
import type { SortDirection, UserTableProps } from "./types";
import "./UserTable.scss";
import StatusDropdown from "../../shared/statusDropdown/StatusDropdown";
import OnlineStatusIndicator from "./OnlineStatusIndicator";

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  onSelectionChange,
  onSort,
  onStatusChange,
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const triggerRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const columns = [
    { key: "name", label: "Name", sortable: true, width: "20%" },
    { key: "status", label: "Status", sortable: true, width: "15%" },
    { key: "role", label: "Role", sortable: false, width: "20%" },
    { key: "email", label: "Email address", sortable: false, width: "25%" },
    { key: "teams", label: "Teams", sortable: false, width: "15%" },
    { key: "actions", label: "", sortable: false, width: "5%" },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = users.map((user) => user.id);
      setSelectedIds(allIds);
      onSelectionChange?.(allIds);
    } else {
      setSelectedIds([]);
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (id: number, checked: boolean) => {
    let newSelectedIds: number[];
    if (checked) {
      newSelectedIds = [...selectedIds, id];
    } else {
      newSelectedIds = selectedIds.filter((selectedId) => selectedId !== id);
    }
    setSelectedIds(newSelectedIds);
    onSelectionChange?.(newSelectedIds);
  };

  const handleSort = (key: string) => {
    const column = columns.find((col) => col.key === key);
    if (!column?.sortable) return;

    let newDirection: SortDirection = "asc";

    if (sortColumn === key) {
      if (sortDirection === "asc") {
        newDirection = "desc";
      } else if (sortDirection === "desc") {
        newDirection = null;
      }
    }

    setSortColumn(newDirection ? key : null);
    setSortDirection(newDirection);
    onSort?.(key, newDirection);
  };

  const handleEdit = (id: number) => {
    onEdit?.(id);
  };

  const handleDelete = (id: number) => {
    onDelete?.(id);
  };

  const handleStatusPillClick = (userId: number) => {
    setOpenDropdownId(openDropdownId === userId ? null : userId);
  };

  const handleStatusSelect = (userId: number, newStatus: string) => {
    onStatusChange?.(userId, newStatus);
    setOpenDropdownId(null);
  };

  const isAllSelected = users.length > 0 && selectedIds.length === users.length;
  const isIndeterminate =
    selectedIds.length > 0 && selectedIds.length < users.length;

  const renderSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="sort-icon"
        >
          <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
        </svg>
      );
    }

    if (sortDirection === "asc") {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="sort-icon active"
        >
          <path d="M7 15l5 5 5-5" />
        </svg>
      );
    }

    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="sort-icon active"
      >
        <path d="M7 9l5-5 5 5" />
      </svg>
    );
  };

  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th style={{ width: "40px" }}>
              <input
                type="checkbox"
                checked={isAllSelected}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = isIndeterminate;
                  }
                }}
                onChange={(e) => handleSelectAll(e.target.checked)}
                aria-label="Select all users"
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className={column.sortable ? "sortable" : ""}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="header-content">
                  <span>{column.label}</span>
                  {column.sortable && renderSortIcon(column.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={selectedIds.includes(user.id) ? "selected" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(user.id)}
                  onChange={(e) => handleSelectRow(user.id, e.target.checked)}
                  aria-label={`Select ${user.name}`}
                />
              </td>
              <td>
                <AvatarNameCell
                  name={user.name}
                  username={user.username}
                  avatarUrl={user.avatarUrl}
                />
              </td>
              <td>
                <div className="status-container">
                  <button
                    ref={(el) => (triggerRefs.current[user.id] = el)}
                    onClick={() => handleStatusPillClick(user.id)}
                    className="status-pill-button"
                  >
                    {user.status.map((status, index) => (
                      <StatusPill
                        key={index}
                        statusText={status}
                        type={status}
                      />
                    ))}
                  </button>
                  <OnlineStatusIndicator isOnline={user.isOnline} />
                  {openDropdownId === user.id && (
                    <StatusDropdown
                      isOpen={true}
                      onClose={() => setOpenDropdownId(null)}
                      triggerRef={{ current: triggerRefs.current[user.id] }}
                      onStatusSelect={(newStatus) =>
                        handleStatusSelect(user.id, newStatus)
                      }
                      selectedStatus={user.status[0]} // Assuming single status for now
                    />
                  )}
                </div>
              </td>

              <td>
                <span className="role-text">{user.role}</span>
              </td>
              <td>
                <span className="email-text">{user.email}</span>
              </td>
              <td>
                <div className="teams-container">
                  {user.teams.slice(0, 3).map((team, index) => (
                    <TeamTag key={index} teamName={team} />
                  ))}
                  {user.teams.length > 3 && (
                    // <span className="extra-tag-.tsx",
                    <span className="extra-tag-count">
                      +{user.teams.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td>
                <ActionButtons
                  onEdit={() => handleEdit(user.id)}
                  onDelete={() => handleDelete(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="empty-state">
          <p>No users found</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;
