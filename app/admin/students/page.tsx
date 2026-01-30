'use client';

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
import { ChevronRight } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
  class?: string;
}

interface StudentsByClass {
  [key: string]: Student[];
}

export default function AdminStudentsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [studentsByClass, setStudentsByClass] = useState<StudentsByClass>({});
  const [searchFilter, setSearchFilter] = useState('all');

  useEffect(() => {
    if (!isLoading && user?.role !== 'admin') {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const allUsers = getAllUsers();
    const studentsList = allUsers.filter(u => u.role === 'student');
    const courses = getAllCourses();
    setStudents(studentsList);

    // Group students by class
    const grouped: StudentsByClass = {
      'Class 11': [],
      'Class 12': [],
    };

    studentsList.forEach(student => {
      const enrollments = getStudentEnrollments(student.id);
      const studentCourses = enrollments
        .map(e => courses.find(c => c.id === e.courseId))
        .filter(Boolean);

      // Determine class based on property or courses
      const hasClass11 = student.class === 'Class 11' || studentCourses.some(c => c?.class === 'Class 11');
      const hasClass12 = student.class === 'Class 12' || studentCourses.some(c => c?.class === 'Class 12');

      if (hasClass11) {
        grouped['Class 11'].push(student);
      } else if (hasClass12) {
        grouped['Class 12'].push(student);
      }
    });

    setStudentsByClass(grouped);
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (user?.role !== 'admin') {
    return null;
  }

  const filteredClasses =
    searchFilter === 'all'
      ? Object.entries(studentsByClass)
      : Object.entries(studentsByClass).filter(([key]) => key === searchFilter);

  return (
    <div className="flex">
      <AdminSidebar />

      <main className="flex-1 lg:ml-64">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Students</h1>
            <p className="text-muted-foreground">Manage and view all students grouped by class.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <p className="text-muted-foreground text-sm font-medium mb-2">Total Students</p>
              <p className="text-4xl font-bold text-foreground">{students.length}</p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm font-medium mb-2">Class 11</p>
              <p className="text-4xl font-bold text-secondary">{studentsByClass['Class 11']?.length || 0}</p>
            </Card>
            <Card className="p-6">
              <p className="text-muted-foreground text-sm font-medium mb-2">Class 12</p>
              <p className="text-4xl font-bold text-primary">{studentsByClass['Class 12']?.length || 0}</p>
            </Card>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 border-b border-border pb-4">
            {['all', 'Class 11', 'Class 12'].map(filter => (
              <Button
                key={filter}
                variant={searchFilter === filter ? 'default' : 'outline'}
                onClick={() => setSearchFilter(filter)}
                className={searchFilter === filter ? 'bg-primary' : ''}
              >
                {filter === 'all' ? 'All Students' : filter}
              </Button>
            ))}
          </div>

          {/* Students by Class */}
          <div className="space-y-8">
            {filteredClasses.map(([className, classStudents]) => (
              <div key={className}>
                <h2 className="text-2xl font-bold text-foreground mb-4">{className}</h2>
                {classStudents.length > 0 ? (
                  <div className="grid gap-4">
                    {classStudents.map((student) => {
                      const enrollments = getStudentEnrollments(student.id);
                      const payments = getUserPayments(student.id);
                      const pendingPayments = payments.filter(p => p.status === 'pending');
                      const completedPayments = payments.filter(p => p.status === 'completed');

                      return (
                        <Card key={student.id} className="p-6 hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-foreground">{student.name}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{student.email}</p>
                              <div className="flex gap-6 mt-4">
                                <div>
                                  <p className="text-xs text-muted-foreground">Enrolled Courses</p>
                                  <p className="text-2xl font-bold text-primary">{enrollments.length}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Completed Payments</p>
                                  <p className="text-2xl font-bold text-primary">{completedPayments.length}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Pending Payments</p>
                                  <p className="text-2xl font-bold text-orange-500">{pendingPayments.length}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Member Since</p>
                                  <p className="font-semibold">
                                    {new Date(student.createdAt || Date.now()).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <Link href={`/admin/students/${student.id}`}>
                              <Button className="bg-primary text-primary-foreground">
                                <ChevronRight size={16} className="ml-2" />
                              </Button>
                            </Link>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <Card className="p-8">
                    <p className="text-center text-muted-foreground">No students in {className}</p>
                  </Card>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
