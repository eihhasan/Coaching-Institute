'use client';

import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useMemo } from "react"
import { useAuth } from '@/app/auth-context';
import { AdminSidebar } from '@/components/admin-sidebar';
import { Card } from '@/components/ui/card';
import { getAllUsers } from '@/lib/auth';
import { getAllCourses, getAllEnrollments } from '@/lib/courses';
import { getAllPayments } from '@/lib/fees';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminReportsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [reportData, setReportData] = useState({
    students: 0,
    courses: 0,
    enrollments: 0,
    totalRevenue: 0,
    completedPayments: 0,
    pendingPayments: 0,
    avgRevenuePerStudent: 0,
    completionRate: 0,
    courseMetrics: [] as any[],
    levelDistribution: {
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    },
  });

  useEffect(() => {
    if (!isLoading && user?.role !== 'admin') {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const users = getAllUsers();
    const courses = getAllCourses();
    const enrollments = getAllEnrollments();
    const payments = getAllPayments();

    const students = users.filter(u => u.role === 'student');
    const completed = payments.filter(p => p.status === 'completed');
    const pending = payments.filter(p => p.status === 'pending');
    const revenue = completed.reduce((sum, p) => sum + p.amount, 0);

    const beginnerCourses = courses.filter(course => course.level === 'beginner');
    const intermediateCourses = courses.filter(course => course.level === 'intermediate');
    const advancedCourses = courses.filter(course => course.level === 'advanced');

    const levelDistribution = {
      beginner: beginnerCourses.length,
      intermediate: intermediateCourses.length,
      advanced: advancedCourses.length,
    };

    const courseMetrics = courses.map(course => {
      const coursePayments = payments.filter(p => p.courseId === course.id);
      const courseCompleted = coursePayments.filter(p => p.status === 'completed');
      const coursePending = coursePayments.filter(p => p.status === 'pending');
      return {
        id: course.id,
        name: course.name,
        class: course.class,
        instructor: course.instructor,
        level: course.level,
        enrollments: enrollments.filter(e => e.courseId === course.id).length,
        revenue: courseCompleted.reduce((sum, p) => sum + p.amount, 0),
        completed: courseCompleted.length,
        pending: coursePending.length,
        completionRate: coursePayments.length > 0
          ? Math.round((courseCompleted.length / coursePayments.length) * 100)
          : 0,
      };
    });

    const paymentCompletionRate = payments.length > 0 ? Math.round((completed.length / payments.length) * 100) : 0;

    setReportData({
      students: students.length,
      courses: courses.length,
      enrollments: enrollments.length,
      totalRevenue: revenue,
      completedPayments: completed.length,
      pendingPayments: pending.length,
      avgRevenuePerStudent: students.length > 0 ? Math.round(revenue / students.length) : 0,
      completionRate: paymentCompletionRate,
      courseMetrics,
      levelDistribution,
    });
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user?.role !== 'admin') {
    return null;
  }

  const { levelDistribution, students, courses, enrollments, totalRevenue, completedPayments, pendingPayments, avgRevenuePerStudent, completionRate } = reportData;

  return (
    <div className="flex">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
            <p className="text-muted-foreground">Comprehensive insights and performance analytics.</p>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-l-primary">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Revenue</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-primary">₹{reportData.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">From {reportData.completedPayments} payments</p>
                </div>
                <TrendingUp className="text-primary/20" size={40} />
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-secondary">
              <p className="text-muted-foreground text-sm font-medium mb-2">Completion Rate</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-primary">{reportData.completionRate}%</p>
                  <p className="text-xs text-muted-foreground mt-1">{reportData.completedPayments} completed</p>
                </div>
                <CheckCircle className="text-secondary/20" size={40} />
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-orange-500">
              <p className="text-muted-foreground text-sm font-medium mb-2">Pending Payments</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-orange-500">{reportData.pendingPayments}</p>
                  <p className="text-xs text-muted-foreground mt-1">Awaiting collection</p>
                </div>
                <AlertCircle className="text-orange-500/20" size={40} />
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <p className="text-muted-foreground text-sm font-medium mb-2">Avg Per Student</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold text-accent">₹{reportData.avgRevenuePerStudent.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">{reportData.students} students</p>
                </div>
                <BarChart3 className="text-accent/20" size={40} />
              </div>
            </Card>
          </div>

          {/* Course Metrics */}
          <h2 className="text-2xl font-bold text-foreground mb-4">Course Performance</h2>
          <div className="space-y-4">
            {reportData.courseMetrics.length > 0 ? (
              reportData.courseMetrics.map((course, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-foreground text-lg">{course.name}</h3>
                          <p className="text-xs text-muted-foreground">{course.class} • {course.instructor}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary rounded-full uppercase tracking-wider">{course.level}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 pt-4 border-t border-border/50 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Enrollments</p>
                          <p className="font-bold text-foreground">{course.enrollments}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Revenue</p>
                          <p className="font-bold text-primary">₹{course.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Paid</p>
                          <p className="font-bold text-green-600">{course.completed}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Pending</p>
                          <p className="font-bold text-orange-500">{course.pending}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-medium uppercase tracking-tighter">Completion</p>
                          <p className="font-bold text-primary">{course.completionRate}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-4">
                <p className="text-center text-muted-foreground">No course data available</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
