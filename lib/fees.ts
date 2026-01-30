// Fee management utilities
import { MOCK_PAYMENTS } from './mock-data';

export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentDate?: string;
  dueDate: string;
  transactionId?: string;
}

const PAYMENTS_KEY = 'coaching_payments';

// Get all payments
export function getAllPayments(): Payment[] {
  if (typeof window === 'undefined') return [];
  const payments = localStorage.getItem(PAYMENTS_KEY);
  if (payments) {
    return JSON.parse(payments);
  }
  // Load mock payments on first load
  savePayments(MOCK_PAYMENTS);
  return MOCK_PAYMENTS;
}

// Save payments
function savePayments(payments: Payment[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PAYMENTS_KEY, JSON.stringify(payments));
}

// Create payment record
export function createPayment(
  userId: string,
  courseId: string,
  amount: number,
  dueDate: string
): Payment {
  const payment: Payment = {
    id: Date.now().toString(),
    userId,
    courseId,
    amount,
    dueDate,
    status: 'pending',
  };

  const payments = getAllPayments();
  payments.push(payment);
  savePayments(payments);
  return payment;
}

// Mark payment as completed
export function completePayment(paymentId: string, transactionId?: string): Payment | null {
  const payments = getAllPayments();
  const paymentIndex = payments.findIndex(p => p.id === paymentId);

  if (paymentIndex === -1) return null;

  payments[paymentIndex] = {
    ...payments[paymentIndex],
    status: 'completed',
    paymentDate: new Date().toISOString(),
    transactionId: transactionId || `TXN${Date.now()}`,
  };

  savePayments(payments);
  return payments[paymentIndex];
}

// Get user payments
export function getUserPayments(userId: string): Payment[] {
  const payments = getAllPayments();
  return payments.filter(p => p.userId === userId);
}

// Get pending payments for user
export function getPendingPayments(userId: string): Payment[] {
  const payments = getUserPayments(userId);
  return payments.filter(p => p.status === 'pending');
}

// Get course payments
export function getCoursePayments(courseId: string): Payment[] {
  const payments = getAllPayments();
  return payments.filter(p => p.courseId === courseId);
}

// Calculate total fee for user
export function calculateTotalFees(userId: string, courseId?: string): number {
  let payments = getUserPayments(userId);
  if (courseId) {
    payments = payments.filter(p => p.courseId === courseId);
  }
  return payments.reduce((total, p) => total + p.amount, 0);
}

// Calculate paid amount
export function calculatePaidAmount(userId: string, courseId?: string): number {
  let payments = getUserPayments(userId);
  if (courseId) {
    payments = payments.filter(p => p.courseId === courseId);
  }
  return payments
    .filter(p => p.status === 'completed')
    .reduce((total, p) => total + p.amount, 0);
}

// Calculate pending amount
export function calculatePendingAmount(userId: string, courseId?: string): number {
  return calculateTotalFees(userId, courseId) - calculatePaidAmount(userId, courseId);
}
