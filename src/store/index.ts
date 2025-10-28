import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, SortDirection } from '../components/table/userTable/types';

interface HomePageState {
  users: User[];
  searchTerm: string;
  currentPage: number;
  pageSize: number;
  sortColumn: string | null;
  sortDirection: SortDirection;
  selectedUserIds: number[];
  totalUsers: number;

  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSort: (column: string | null, direction: SortDirection) => void;
  setSelectedUserIds: (ids: number[]) => void;
  fetchUsers: () => Promise<void>;
  updateUserStatus: (userId: number, newStatus: string) => void;
}

export const useHomePageStore = create(
  persist<HomePageState>(
    (set, get) => ({
      users: [],
      searchTerm: '',
      currentPage: 1,
      pageSize: 10,
      sortColumn: null,
      sortDirection: null,
      selectedUserIds: [],
      totalUsers: 0,

      setSearchTerm: (term) => set({ searchTerm: term, currentPage: 1 }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setPageSize: (size) => set({ pageSize: size, currentPage: 1 }),
      setSort: (column, direction) => set({ sortColumn: column, sortDirection: direction }),
      setSelectedUserIds: (ids) => set({ selectedUserIds: ids }),

      fetchUsers: async () => {
        const storedState = localStorage.getItem('home-page-storage');
        if (storedState) {
          const { state } = JSON.parse(storedState);
          if (state.users && state.users.length > 0) {
            set({ users: state.users, totalUsers: state.users.length });
            return;
          }
        }

        const dummyUsers: User[] = [
          {
            id: 1,
            name: 'John Doe',
            username: 'john.doe',
            avatarUrl: 'https://i.pravatar.cc/150?img=1',
            status: ['Active'],
            role: 'Admin',
            email: 'john.doe@example.com',
            teams: ['Frontend', 'Backend'],
            isOnline: true,
          },
          {
            id: 2,
            name: 'Jane Smith',
            username: 'jane.smith',
            avatarUrl: 'https://i.pravatar.cc/150?img=2',
            status: ['Inactive'],
            role: 'Editor',
            email: 'jane.smith@example.com',
            teams: ['Design'],
            isOnline: false,
          },
          {
            id: 3,
            name: 'Peter Jones',
            username: 'peter.jones',
            avatarUrl: 'https://i.pravatar.cc/150?img=3',
            status: ['Busy'],
            role: 'Viewer',
            email: 'peter.jones@example.com',
            teams: ['QA'],
            isOnline: true,
          },
          {
            id: 4,
            name: 'Alice Brown',
            username: 'alice.brown',
            avatarUrl: 'https://i.pravatar.cc/150?img=4',
            status: ['Active'],
            role: 'Admin',
            email: 'alice.brown@example.com',
            teams: ['Frontend'],
            isOnline: false,
          },
          {
            id: 5,
            name: 'Bob White',
            username: 'bob.white',
            avatarUrl: 'https://i.pravatar.cc/150?img=5',
            status: ['Away'],
            role: 'Editor',
            email: 'bob.white@example.com',
            teams: ['Backend'],
            isOnline: true,
          },
          {
            id: 6,
            name: 'Charlie Green',
            username: 'charlie.green',
            avatarUrl: 'https://i.pravatar.cc/150?img=6',
            status: ['Active'],
            role: 'Viewer',
            email: 'charlie.green@example.com',
            teams: ['Design'],
            isOnline: false,
          },
          {
            id: 7,
            name: 'Diana Prince',
            username: 'diana.prince',
            avatarUrl: 'https://i.pravatar.cc/150?img=7',
            status: ['Inactive'],
            role: 'Admin',
            email: 'diana.prince@example.com',
            teams: ['QA'],
            isOnline: true,
          },
          {
            id: 8,
            name: 'Eve Adams',
            username: 'eve.adams',
            avatarUrl: 'https://i.pravatar.cc/150?img=8',
            status: ['Busy'],
            role: 'Editor',
            email: 'eve.adams@example.com',
            teams: ['Frontend'],
            isOnline: false,
          },
          {
            id: 9,
            name: 'Frank Black',
            username: 'frank.black',
            avatarUrl: 'https://i.pravatar.cc/150?img=9',
            status: ['Active'],
            role: 'Viewer',
            email: 'frank.black@example.com',
            teams: ['Backend'],
            isOnline: true,
          },
          {
            id: 10,
            name: 'Grace Kelly',
            username: 'grace.kelly',
            avatarUrl: 'https://i.pravatar.cc/150?img=10',
            status: ['Away'],
            role: 'Admin',
            email: 'grace.kelly@example.com',
            teams: ['Design'],
            isOnline: false,
          },
          {
            id: 11,
            name: 'Heidi Klum',
            username: 'heidi.klum',
            avatarUrl: 'https://i.pravatar.cc/150?img=11',
            status: ['Active'],
            role: 'Editor',
            email:'heidi.klum@example.com',
            teams: ['QA'],
            isOnline: true,
          },
          {
            id: 12,
            name: 'Ivan Drago',
            username: 'ivan.drago',
            avatarUrl: 'https://i.pravatar.cc/150?img=12',
            status: ['Inactive'],
            role: 'Viewer',
            email: 'ivan.drago@example.com',
            teams: ['Frontend'],
            isOnline: false,
          },
        ];
        set({ users: dummyUsers, totalUsers: dummyUsers.length });
      },

      updateUserStatus: (userId, newStatus) => {
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, status: [newStatus] } : user
          ),
        }));
      },
    }),
    {
      name: 'home-page-storage', 
    }
  )
);