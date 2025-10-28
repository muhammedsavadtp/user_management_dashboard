import React, { useEffect, useMemo } from "react";
import DataTableToolbar from "../components/table/tableToolbar/DataTableToolbar";
import UserTable from "../components/table/userTable/UserTable";
import Pagination from "../components/shared/pagination/Pagination";
import { useHomePageStore } from "../store";
import type { User } from "../components/table/userTable/types";

const HomePage: React.FC = () => {
  const {
    users,
    searchTerm,
    currentPage,
    pageSize,
    sortColumn,
    sortDirection,
    selectedUserIds,
    totalUsers,
    setSearchTerm,
    setCurrentPage,
    setPageSize,
    setSort,
    setSelectedUserIds,
    fetchUsers,
    updateUserStatus,
  } = useHomePageStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    let filtered = users;
    if (searchTerm) {
      filtered = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortColumn) {
      filtered = [...filtered].sort((a, b) => {
        let aValue: any = a[sortColumn as keyof User];
        let bValue: any = b[sortColumn as keyof User];

        // Handle specific sorting logic if needed
        if (sortColumn === 'name' || sortColumn === 'email' || sortColumn === 'username') {
          aValue = String(aValue).toLowerCase();
          bValue = String(bValue).toLowerCase();
        } else if (sortColumn === 'status') {
          // Assuming status is an array of strings, sort by the first status
          aValue = a.status[0]?.toLowerCase() || '';
          bValue = b.status[0]?.toLowerCase() || '';
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [users, searchTerm, sortColumn, sortDirection]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredUsers.slice(startIndex, endIndex);
  }, [filteredUsers, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
  };

  const handleSortTable = (column: string, direction: SortDirection) => {
    setSort(column, direction);
  };

  const handleSelectionChange = (ids: number[]) => {
    setSelectedUserIds(ids);
  };

  const handleStatusChange = (userId: number, newStatus: string) => {
    updateUserStatus(userId, newStatus);
  };

  return (
    <div>
      <div>
        <DataTableToolbar
          onSearch={handleSearch}
          onFilter={() => console.log("Filter clicked")} // Placeholder
          onSort={() => console.log("Sort clicked")} // Placeholder
          onImport={() => console.log("Import clicked")} // Placeholder
          onExport={() => console.log("Export clicked")} // Placeholder
          searchPlaceholder="Search team members..."
          searchTerm={searchTerm}
        />
        <UserTable
          users={paginatedUsers}
          onEdit={() => console.log("Edit clicked")} // Placeholder
          onDelete={() => console.log("Delete clicked")} // Placeholder
          onSelectionChange={handleSelectionChange}
          onSort={handleSortTable}
          onStatusChange={handleStatusChange}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          totalItems={filteredUsers.length}
        />
      </div>
    </div>
  );
};

export default HomePage;
