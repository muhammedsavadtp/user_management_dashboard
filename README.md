# React User Management Dashboard

This is a simple user management dashboard built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation


1. Navigate to the project directory:
   ```bash
   cd your-repository
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

To start the development server, run the following command:

```bash
npm run dev
```

This will start the application in development mode and open it in your default browser at `http://localhost:3000`.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
This is a React application built with Vite and TypeScript.

**State Management:**
The application uses Zustand for state management. The main store, `useHomePageStore`, manages the state for the user list, including pagination, searching, and sorting.

**Components:**
The application is built with a component-based architecture. Key components include:
- `PageLayout`: Provides the overall layout for the application's pages.
- `Header`: The main header of the application.
- `UserTable`: Displays a list of users with details like name, status, role, and email.
- `DataTableToolbar`: Provides tools for interacting with the user table, such as a search bar.
- `Pagination`: Allows users to navigate through pages of the user list.
- `StatusDropdown`: A dropdown menu for filtering users by status.

**Functionality:**
The application is a user management dashboard that displays a list of users in a table. It includes features for:
- Displaying user information in a paginated table.
- Searching for users.
- Sorting the user list by different columns.
- update status 
