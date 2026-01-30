// Simple authentication system using localStorage
import { MOCK_STUDENTS } from './mock-data';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'student' | 'guest';
  enrolledCourses?: string[];
  class?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const USERS_KEY = 'coaching_users';
const CURRENT_USER_KEY = 'coaching_current_user';

// Get all users from localStorage
export function getAllUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : getDefaultUsers();
}

// Get default users including all 50 mock students
function getDefaultUsers(): User[] {
  const admin = {
    id: '1',
    email: 'admin@coaching.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin' as const,
    createdAt: new Date().toISOString(),
  };

  return [admin, ...(MOCK_STUDENTS as User[])];
}

// Save users to localStorage
export function saveUsers(users: User[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Initialize default users if first time or if data is outdated
export function initializeUsers(): void {
  if (typeof window === 'undefined') return;
  const existingUsers = localStorage.getItem(USERS_KEY);

  let shouldRefresh = !existingUsers;
  if (existingUsers) {
    const users = JSON.parse(existingUsers);
    // Force update if we don't have enough students or if we have legacy 'Class 10' data
    if (users.length < 81 || users.some((u: any) => u.class === 'Class 10')) {
      shouldRefresh = true;
    }
  }

  if (shouldRefresh) {
    saveUsers(getDefaultUsers());
  }
}

// Register a new user
export function registerUser(
  email: string,
  password: string,
  name: string,
  role: 'student' | 'admin' = 'student'
): { success: boolean; error?: string; user?: User } {
  const users = getAllUsers();

  if (users.some(u => u.email === email)) {
    return { success: false, error: 'Email already registered' };
  }

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    name,
    role,
    enrolledCourses: [],
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  return { success: true, user: newUser };
}

// Login user
export function loginUser(
  email: string,
  password: string
): { success: boolean; error?: string; user?: User } {
  const users = getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  return { success: true, user };
}

// Get current logged-in user
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

// Logout user
export function logoutUser(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Update user
export function updateUser(userId: string, updates: Partial<User>): { success: boolean; user?: User } {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return { success: false };
  }

  const updatedUser = { ...users[userIndex], ...updates };
  users[userIndex] = updatedUser;
  saveUsers(users);

  const currentUser = getCurrentUser();
  if (currentUser?.id === userId) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    }
  }

  return { success: true, user: updatedUser };
}
