'use client';

import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { useMemo } from "react"
import { useAuth } from '@/app/auth-context';
import { AdminSidebar } from '@/components/admin-sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllUsers } from '@/lib/auth';
import { getStudentEnrollments, getAllCourses } from '@/lib/courses';
import { getUserPayments } from '@/lib/fees';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ChevronLeft, CheckCircle, AlertCircle } from 'lucide-react';
import Footer from '@/components/footer'; // Declare the Footer variable

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    if (!isLoading && user?.role !== 'admin') {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const allUsers = getAllUsers();
    const foundStudent = allUsers.find(u => u.id === params.id && u.role === 'student');
    const allCourses = getAllCourses();
    
    setStudent(foundStudent);
    setCourses(allCourses);
    
    if (foundStudent) {
      setEnrollments(getStudentEnrollments(foundStudent.id));
      setPayments(getUserPayments(foundStudent.id));
    }
  }, [params.id]);

  useEffect(() => {
    const revenue = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);
    setTotalRevenue(revenue);
  }, [payments]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user?.role !== 'admin') {
    return null;
  }

  if (!student) {
    return (
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 lg:ml-64 flex items-center justify-center min-h-screen">
          <Card className="p-8 text-center">
            <h1 className="text-xl font-bold mb-4">Student not found</h1>
            <Link href="/admin/students">
              <Button className="bg-primary text-primary-foreground">Back to Students</Button>
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  const totalFees = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const totalPending = totalFees - totalPaid;

  return (
    <div className="flex">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/students">
              <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                <ChevronLeft size={20} />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{student.name}</h1>
              <p className="text-muted-foreground mt-1">{student.email}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Member since {new Date(student.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Fee Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-l-primary">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Fees</p>
              <p className="text-4xl font-bold text-primary">₹{totalFees.toLocaleString()}</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-secondary">
              <p className="text-muted-foreground text-sm font-medium mb-2">Amount Paid</p>
              <p className="text-4xl font-bold text-secondary">₹{totalPaid.toLocaleString()}</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-orange-500">
              <p className="text-muted-foreground text-sm font-medium mb-2">Pending Payment</p>
              <p className="text-4xl font-bold text-orange-500">₹{totalPending.toLocaleString()}</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-accent">
              <p className="text-muted-foreground text-sm font-medium mb-2">Enrolled Courses</p>
              <p className="text-4xl font-bold text-accent">{enrollments.length}</p>
            </Card>
          </div>

          {/* Enrollments */}
          <Card className="mb-8 p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Enrolled Courses</h2>
            {enrollments.length > 0 ? (
              <div className="space-y-4">
                {enrollments.map((enrollment) => {
                  const course = courses.find(c => c.id === enrollment.courseId);
                  const coursePayments = payments.filter(p => p.courseId === enrollment.courseId);
                  const coursePaid = coursePayments
                    .filter(p => p.status === 'completed')
                    .reduce((sum, p) => sum + p.amount, 0);
                  const coursePending = coursePayments
                    .filter(p => p.status === 'pending')
                    .reduce((sum, p) => sum + p.amount, 0);

                  return (
                    <div key={enrollment.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{course?.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{course?.class} • {course?.instructor}</p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          enrollment.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : enrollment.status === 'active'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}>
                          {enrollment.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Fee</p>
                          <p className="font-bold text-foreground">₹{course?.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Paid</p>
                          <p className="font-bold text-secondary">₹{coursePaid.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Pending</p>
                          <p className="font-bold text-orange-500">₹{coursePending.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No course enrollments</p>
            )}
          </Card>

          {/* Payment Details */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Payment Details</h2>
            {payments.length > 0 ? (
              <div className="space-y-3">
                {payments.map((payment) => {
                  const course = courses.find(c => c.id === payment.courseId);
                  const isCompleted = payment.status === 'completed';
                  const isPending = payment.status === 'pending';

                  return (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100' : 'bg-orange-100'}`}>
                          {isCompleted ? (
                            <CheckCircle className="text-green-600" size={20} />
                          ) : (
                            <AlertCircle className="text-orange-600" size={20} />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{course?.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {isPending && 'Due: '}
                            {new Date(payment.dueDate).toLocaleDateString()}
                            {payment.paymentDate && ` • Paid: ${new Date(payment.paymentDate).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">₹{payment.amount.toLocaleString()}</p>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded mt-1 ${
                          isCompleted
                            ? 'bg-green-100 text-green-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No payment records</p>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}

function Navigation() {
  // Placeholder for Navigation component
  return <div>Navigation</div>;
}
