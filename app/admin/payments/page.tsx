'use client';

import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import Link from "next/link"
import { useAuth } from '@/app/auth-context';
import { AdminSidebar } from '@/components/admin-sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllUsers } from '@/lib/auth';
import { getAllPayments, completePayment } from '@/lib/fees';
import { getAllCourses } from '@/lib/courses';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Filter } from 'lucide-react';
import Footer from '@/components/footer'; // Import the Footer component

export default function AdminPaymentsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [payments, setPayments] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'completed'>('all');
  const [filterUpcoming, setFilterUpcoming] = useState(false);

  useEffect(() => {
    if (!isLoading && user?.role !== 'admin') {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      setPayments(getAllPayments());
    }
  }, [user]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user?.role !== 'admin') {
    return null;
  }

  const allUsers = getAllUsers();
  const courses = getAllCourses();

  const completedPayments = payments.filter(p => p.status === 'completed');
  const pendingPayments = payments.filter(p => p.status === 'pending');

  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0);
  const upcomingPayments = pendingPayments.filter(
    p => new Date(p.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  const handleCompletePayment = (paymentId: string) => {
    const result = completePayment(paymentId);
    if (result) {
      setPayments(getAllPayments());
    }
  };

  let filteredPayments = [...payments];

  if (filterStatus === 'pending') {
    filteredPayments = filteredPayments.filter(p => p.status === 'pending');
  } else if (filterStatus === 'completed') {
    filteredPayments = filteredPayments.filter(p => p.status === 'completed');
  }

  if (filterUpcoming) {
    filteredPayments = filteredPayments.filter(
      p => p.status === 'pending' && new Date(p.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );
  }

  filteredPayments.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());

  return (
    <div className="flex">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Payments</h1>
            <p className="text-muted-foreground">Track and manage all student fee payments.</p>
          </div>

          {/* Finance Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-l-secondary">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Revenue</p>
              <p className="text-4xl font-bold text-primary">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">{completedPayments.length} completed</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-orange-500">
              <p className="text-muted-foreground text-sm font-medium mb-2">Pending Amount</p>
              <p className="text-4xl font-bold text-orange-500">₹{pendingAmount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">{pendingPayments.length} pending</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-accent">
              <p className="text-muted-foreground text-sm font-medium mb-2">Upcoming (7 Days)</p>
              <p className="text-4xl font-bold text-accent">{upcomingPayments.length}</p>
              <p className="text-xs text-muted-foreground mt-2">Due soon</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-primary">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Transactions</p>
              <p className="text-4xl font-bold text-primary">{payments.length}</p>
              <p className="text-xs text-muted-foreground mt-2">All time</p>
            </Card>
          </div>

          {/* Filter Controls */}
          <div className="mb-6 flex gap-2 flex-wrap">
            <Button
              variant={filterStatus === 'all' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('all')}
              className={filterStatus === 'all' ? 'bg-primary' : ''}
            >
              All Payments
            </Button>
            <Button
              variant={filterStatus === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('pending')}
              className={filterStatus === 'pending' ? 'bg-orange-500' : ''}
            >
              Pending
            </Button>
            <Button
              variant={filterStatus === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilterStatus('completed')}
              className={filterStatus === 'completed' ? 'bg-secondary' : ''}
            >
              Completed
            </Button>
            <Button
              variant={filterUpcoming ? 'default' : 'outline'}
              onClick={() => setFilterUpcoming(!filterUpcoming)}
              className={`gap-2 ${filterUpcoming ? 'bg-primary' : ''}`}
            >
              <Filter size={16} />
              Upcoming Due
            </Button>
          </div>

          {/* Payments List */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Payment Details</h2>
            {filteredPayments.length > 0 ? (
              <div className="space-y-3">
                {filteredPayments.map((payment) => {
                  const student = allUsers.find(u => u.id === payment.userId);
                  const course = courses.find(c => c.id === payment.courseId);
                  const isCompleted = payment.status === 'completed';
                  const isPending = payment.status === 'pending';
                  const isUpcoming = isPending && new Date(payment.dueDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

                  return (
                    <div key={payment.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-2 rounded-lg shrink-0 ${isCompleted ? 'bg-green-100' : 'bg-orange-100'}`}>
                          {isCompleted ? (
                            <CheckCircle className="text-green-600" size={20} />
                          ) : (
                            <AlertCircle className={isUpcoming ? 'text-red-600' : 'text-orange-600'} size={20} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{student?.name || 'Unknown'}</p>
                          <p className="text-sm text-muted-foreground">{course?.name || 'Unknown'} • {course?.class}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {isPending && 'Due: '}
                            {new Date(payment.dueDate).toLocaleDateString()}
                            {payment.paymentDate && ` • Paid: ${new Date(payment.paymentDate).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">₹{payment.amount.toLocaleString()}</p>
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded mt-1 ${isCompleted
                            ? 'bg-green-100 text-green-700'
                            : isUpcoming
                              ? 'bg-red-100 text-red-700'
                              : 'bg-orange-100 text-orange-700'
                          }`}>
                          {isUpcoming ? 'Due Soon' : payment.status}
                        </span>
                        {isPending && !isUpcoming && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-2 w-full bg-transparent"
                            onClick={() => handleCompletePayment(payment.id)}
                          >
                            Mark Paid
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No payments found matching filters</p>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
