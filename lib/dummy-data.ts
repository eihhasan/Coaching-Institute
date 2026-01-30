// Initialize comprehensive dummy data for the application

import { getAllPayments, createPayment, completePayment } from './fees';
import { getAllEnrollments, enrollStudent } from './courses';
import { getAllUsers, initializeUsers } from './auth';

const ENROLLMENTS_KEY = 'enrollments';
const PAYMENTS_KEY = 'payments';

export function initializeDummyData() {
  if (typeof window === 'undefined') return;
  
  // Initialize users first
  initializeUsers();
  const users = getAllUsers();
  const studentCount = users.filter(u => u.role === 'student').length;
  
  // Only initialize if no students exist
  if (studentCount < 10) {
    return;
  }

  // Initialize enrollments
  const enrollments = getAllEnrollments();
  if (enrollments.length === 0) {
    // Class 10 enrollments
    enrollStudent('101', '1');
    enrollStudent('101', '2');
    enrollStudent('102', '1');
    enrollStudent('102', '3');
    enrollStudent('103', '2');
    enrollStudent('103', '3');
    enrollStudent('104', '1');
    enrollStudent('105', '1');
    enrollStudent('105', '2');
    enrollStudent('105', '3');
    
    // Class 12 enrollments
    enrollStudent('201', '4');
    enrollStudent('201', '5');
    enrollStudent('201', '6');
    enrollStudent('202', '4');
    enrollStudent('202', '6');
    enrollStudent('203', '5');
    enrollStudent('203', '6');
    enrollStudent('204', '4');
    enrollStudent('204', '5');
    enrollStudent('204', '6');
    enrollStudent('205', '6');
  }

  // Initialize payments
  const payments = getAllPayments();
  if (payments.length === 0) {
    const today = new Date();
    
    const paymentData = [
      ['101', '1', 8999, 30, true],
      ['101', '2', 9999, -15, false],
      ['102', '1', 8999, 20, true],
      ['102', '3', 7999, -25, false],
      ['103', '2', 9999, 45, true],
      ['103', '3', 7999, 10, true],
      ['104', '1', 8999, 10, true],
      ['105', '1', 8999, 60, true],
      ['105', '2', 9999, 50, true],
      ['105', '3', 7999, -20, false],
      ['201', '4', 11999, 35, true],
      ['201', '5', 11999, 25, true],
      ['201', '6', 12999, -5, false],
      ['202', '4', 11999, 28, true],
      ['202', '6', 12999, -12, false],
      ['203', '5', 11999, 15, true],
      ['203', '6', 12999, -22, false],
      ['204', '4', 11999, 40, true],
      ['204', '5', 11999, 30, true],
      ['204', '6', 12999, 5, true],
      ['205', '6', 12999, -18, false],
    ] as [string, string, number, number, boolean][];

    paymentData.forEach(([userId, courseId, amount, daysAgo, completed]) => {
      const dueDate = new Date(today.getTime() + daysAgo * 24 * 60 * 60 * 1000);
      const payment = createPayment(userId, courseId, amount, dueDate.toISOString());
      if (completed) {
        completePayment(payment.id);
      }
    });
  }
}
