'use client';

import { useAuth } from '@/app/auth-context';
import { AdminSidebar } from '@/components/admin-sidebar';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  BookOpen,
  CreditCard,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { getAllUsers } from '@/lib/auth';
import { getAllCourses, getAllEnrollments } from '@/lib/courses';
import { getAllPayments } from '@/lib/fees';
import Link from 'next/link';

interface DashboardStats {
  totalStudents: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  pendingPayments: number;
  completedPayments: number;
  recentEnrollments: any[];
}

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
    pendingPayments: 0,
    completedPayments: 0,
    recentEnrollments: [],
  });

  useEffect(() => {
    if (!isLoading && user?.role !== 'admin') {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const users = getAllUsers().filter(u => u.role === 'student');
    const courses = getAllCourses();
    const enrollments = getAllEnrollments();
    const payments = getAllPayments();

    const pending = payments.filter(p => p.status === 'pending');
    const completed = payments.filter(p => p.status === 'completed');

    setStats({
      totalStudents: users.length,
      totalCourses: courses.length,
      totalEnrollments: enrollments.length,
      totalRevenue: completed.reduce((sum, p) => sum + p.amount, 0),
      pendingPayments: pending.length,
      completedPayments: completed.length,
      recentEnrollments: enrollments.slice(0, 5).map(e => ({
        ...e,
        studentName: users.find(u => u.id === e.studentId)?.name || 'Unknown',
        courseName: courses.find(c => c.id === e.courseId)?.name || 'Unknown'
      })),
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex">
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your coaching institute overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Students Card */}
            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">Total Students</p>
                  <h3 className="text-4xl font-bold text-foreground">{stats.totalStudents}</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="text-primary" size={24} />
                </div>
              </div>
              <Link href="/admin/students">
                <Button variant="link" className="mt-4 p-0 text-primary">
                  View all students →
                </Button>
              </Link>
            </Card>

            {/* Courses Card */}
            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">Active Courses</p>
                  <h3 className="text-4xl font-bold text-foreground">{stats.totalCourses}</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BookOpen className="text-primary" size={24} />
                </div>
              </div>
              <Link href="/admin/courses">
                <Button variant="link" className="mt-4 p-0 text-primary">
                  Manage courses →
                </Button>
              </Link>
            </Card>

            {/* Enrollments Card */}
            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">Total Enrollments</p>
                  <h3 className="text-4xl font-bold text-foreground">{stats.totalEnrollments}</h3>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <TrendingUp className="text-accent" size={24} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Active course enrollments</p>
            </Card>

            {/* Revenue Card */}
            <Card className="p-6 border-l-4 border-l-primary md:col-span-2 lg:col-span-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">Total Revenue</p>
                  <h3 className="text-4xl font-bold text-foreground">₹{stats.totalRevenue.toLocaleString()}</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <CreditCard className="text-primary" size={24} />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">{stats.completedPayments} payments completed</p>
            </Card>

            {/* Pending Payments Card */}
            <Card className="p-6 border-l-4 border-l-primary md:col-span-2 lg:col-span-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm font-medium mb-2">Pending Payments</p>
                  <h3 className="text-4xl font-bold text-primary">{stats.pendingPayments}</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BarChart3 className="text-primary" size={24} />
                </div>
              </div>
              <Link href="/admin/payments">
                <Button variant="link" className="mt-4 p-0 text-primary">
                  View payments →
                </Button>
              </Link>
            </Card>
          </div>

          {/* Recent Activity & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recent Student Activity</h2>
              <div className="space-y-4">
                {stats.recentEnrollments.map((e, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-semibold text-foreground">{e.studentName}</p>
                      <p className="text-xs text-muted-foreground">Joined {e.courseName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{new Date(e.enrollmentDate).toLocaleDateString()}</p>
                      <span className="text-[10px] font-bold text-primary uppercase">New Enrollment</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/admin/students">
                <Button variant="link" className="mt-4 p-0 text-primary text-xs">View all students →</Button>
              </Link>
            </Card>

            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="flex flex-col gap-3">
                <Link href="/admin/students">
                  <Button className="w-full text-xs font-bold h-11">
                    Manage Students
                  </Button>
                </Link>
                <Link href="/admin/courses">
                  <Button variant="outline" className="w-full text-xs font-bold h-11 bg-transparent">
                    Manage Courses
                  </Button>
                </Link>
                <Link href="/admin/payments">
                  <Button variant="outline" className="w-full text-xs font-bold h-11 bg-transparent border-primary/20 text-primary">
                    View Payments
                  </Button>
                </Link>
                <Link href="/admin/reports">
                  <Button variant="ghost" className="w-full text-xs font-bold h-11 hover:bg-primary/5 text-primary">
                    Account Reports
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
