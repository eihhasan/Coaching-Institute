'use client';

import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { useMemo } from "react"
import { useAuth } from '@/app/auth-context';
import { AdminSidebar } from '@/components/admin-sidebar';
import { Card } from '@/components/ui/card';
import { getAllCourses, getAllEnrollments } from '@/lib/courses';
import { getAllPayments } from '@/lib/fees';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BookOpen, Users, TrendingUp } from 'lucide-react';

export default function AdminCoursesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [courseData, setCourseData] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  useEffect(() => {
    if (!isLoading && user?.role !== 'admin') {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getAllCourses();
      setCourses(coursesData);
    };

    const fetchEnrollments = async () => {
      const enrollmentsData = await getAllEnrollments();
      setEnrollments(enrollmentsData);
    };

    const fetchPayments = async () => {
      const paymentsData = await getAllPayments();
      setPayments(paymentsData);
    };

    fetchCourses();
    fetchEnrollments();
    fetchPayments();
  }, []);

  useEffect(() => {
    const stats = courses.map(course => {
      const courseEnrollments = enrollments.filter(e => e.courseId === course.id);
      const coursePayments = payments.filter(p => p.courseId === course.id);
      const completedPayments = coursePayments.filter(p => p.status === 'completed');

      return {
        ...course,
        enrollments: courseEnrollments.length,
        totalPayments: coursePayments.length,
        completedPayments: completedPayments.length,
        revenue: completedPayments.reduce((sum, p) => sum + p.amount, 0),
      };
    });

    setCourseData(stats);
  }, [courses, enrollments, payments]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="flex">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Courses</h1>
            <p className="text-muted-foreground">Manage and monitor all course performance metrics.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-l-primary">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Courses</p>
              <div className="flex items-center justify-between">
                <p className="text-4xl font-bold text-primary">{courseData.length}</p>
                <BookOpen className="text-primary/20" size={40} />
              </div>
            </Card>
            <Card className="p-6 border-l-4 border-l-primary">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Enrollments</p>
              <div className="flex items-center justify-between">
                <p className="text-4xl font-bold text-primary">{courseData.reduce((sum, c) => sum + c.enrollments, 0)}</p>
                <Users className="text-primary/20" size={40} />
              </div>
            </Card>
            <Card className="p-6 border-l-4 border-l-accent">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Revenue</p>
              <div className="flex items-center justify-between">
                <p className="text-4xl font-bold text-accent">₹{courseData.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}</p>
                <TrendingUp className="text-accent/20" size={40} />
              </div>
            </Card>
          </div>

          {/* Courses List */}
          <div className="space-y-4">
            {courseData.length > 0 ? (
              courseData.map((course) => (
                <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-foreground">{course.name}</h3>
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-primary/10 text-primary rounded-full uppercase tracking-wider">{course.level}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{course.class} • {course.instructor}</p>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{course.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-muted-foreground">Fee</p>
                      <p className="text-2xl font-bold text-primary">₹{course.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-border">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-medium">Enrolled</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{course.enrollments}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-medium">Completed</p>
                      <p className="text-2xl font-bold text-primary mt-1">{course.completedPayments}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-medium">Pending</p>
                      <p className="text-2xl font-bold text-orange-500 mt-1">{course.totalPayments - course.completedPayments}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-medium">Revenue</p>
                      <p className="text-2xl font-bold text-accent mt-1">₹{course.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-medium">Duration</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{course.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-medium">Lectures</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{course.videoCount || 0}</p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8">
                <p className="text-center text-muted-foreground">No courses available</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
