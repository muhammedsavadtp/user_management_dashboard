import React, { useState } from "react";
import DataTableToolbar from "../components/table/tableToolbar/DataTableToolbar";
import UserTable from "../components/table/userTable/UserTable";
import type { SortDirection, User } from "../components/table/userTable/types";
import { mockUsers } from "../lib/mock";
import Pagination from "../components/shared/pagination/Pagination";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    console.log("Search query:", query);
    setSearchQuery(query);
  };

  const handleFilter = () => {
    console.log("Filter clicked - Open filter dropdown");
    // Implement filter logic or show filter dropdown
  };

  const handleSort = () => {
    console.log("Sort clicked - Open sort dropdown");
    // Implement sort logic or show sort dropdown
  };

  const handleImport = () => {
    console.log("Import clicked");
    // Trigger file import dialog
  };

  const handleExport = () => {
    console.log("Export clicked");
    // Trigger data export
  };

    const [users, setUsers] = useState<User[]>(mockUsers);

  const handleEdit = (id: number) => {
    console.log('Edit user:', id);
    // Open edit modal/form
  };

  const handleDelete = (id: number) => {
    console.log('Delete user:', id);
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleSelectionChange = (selectedIds: number[]) => {
    console.log('Selected users:', selectedIds);
  };

  const handleSortTable = (key: string, direction: SortDirection) => {
    console.log('Sort by:', key, direction);
    
    if (!direction) {
      setUsers([...mockUsers]); // Reset to original order
      return;
    }

    const sortedUsers = [...users].sort((a, b) => {
      let aValue = a[key as keyof User];
      let bValue = b[key as keyof User];

      if (key === 'name') {
        aValue = (aValue as string).toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 20;

  const handlePageChange = (page: number) => {
    console.log('Changing to page:', page);
    setCurrentPage(page);
    // Fetch data for the new page
    // scrollToTop();
  };
  return (
    <div>
      <div>
        <DataTableToolbar
          onSearch={handleSearch}
          onFilter={handleFilter}
          onSort={handleSort}
          onImport={handleImport}
          onExport={handleExport}
          searchPlaceholder="Search team members..."
        />
         <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSelectionChange={handleSelectionChange}
          onSort={handleSortTable}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          maxVisiblePages={5}
        />
      </div>
    </div>
  );
};

export default HomePage;
