import type { User } from "../components/table/userTable/types";

export const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    status: ['Active'],
    role: 'Product Designer',
    email: 'john.doe@company.com',
    teams: ['Design', 'Product'],
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    status: ['Active', 'Busy'],
    role: 'Frontend Developer',
    email: 'jane.smith@company.com',
    teams: ['Engineering', 'Design', 'Product', 'Marketing'],
  },
  {
    id: 3,
    name: 'Bob Johnson',
    username: 'bobjohnson',
    avatarUrl: '',
    status: ['OnLeave'],
    role: 'Marketing Manager',
    email: 'bob.johnson@company.com',
    teams: ['Marketing'],
  },
  {
    id: 4,
    name: 'Alice Williams',
    username: 'alicew',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    status: ['Away'],
    role: 'UX Researcher',
    email: 'alice.williams@company.com',
    teams: ['Design', 'Product'],
  },
];