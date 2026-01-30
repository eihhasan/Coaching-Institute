'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getAllCourses, getStudentEnrollments, enrollStudent } from '@/lib/courses';
import { createPayment } from '@/lib/fees';
import { useAuth } from '@/app/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const courses = getAllCourses();
  const course = courses.find(c => c.id === params.id);

  if (!course) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <Link href="/courses">
              <Button className="mt-4">Back to Courses</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const isEnrolled = user ? getStudentEnrollments(user.id).some(e => e.courseId === course.id) : false;

  const handleEnroll = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    setError('');
    setMessage('');
    setIsEnrolling(true);

    try {
      const result = enrollStudent(user.id, course.id);
      
      if (result.success) {
        // Create payment record
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);
        createPayment(user.id, course.id, course.price, dueDate.toISOString());
        
        setMessage('Successfully enrolled! Proceed to payment in your dashboard.');
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setError(result.error || 'Enrollment failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Enrollment failed');
    } finally {
      setIsEnrolling(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen flex flex-col">
        <div className="mx-auto max-w-4xl w-full px-4 py-12 sm:px-6">
          <Link href="/courses" className="text-primary hover:underline mb-6">← Back to Courses</Link>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-6">
                <Badge className={`${getLevelColor(course.level)}`}>
                  {course.level}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
              <p className="text-lg text-muted-foreground mb-8">{course.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{course.instructor}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Duration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{course.duration}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Video Lessons</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">{course.videoCount} Videos</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-bold text-primary text-lg">₹{course.price}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Course Content</h2>
                <p className="text-muted-foreground">
                  This comprehensive course includes {course.videoCount} high-quality video lessons covering all essential topics. 
                  You'll have lifetime access to all materials and can learn at your own pace.
                </p>
              </div>
            </div>

            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Enrollment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {message && (
                    <div className="rounded-lg bg-green-50 border border-green-200 p-3 flex gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-green-700">{message}</p>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 flex gap-2">
                      <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      {isEnrolled ? 'You are enrolled in this course' : 'Click below to enroll and start learning'}
                    </p>
                    <Button 
                      onClick={handleEnroll}
                      disabled={isEnrolling || isEnrolled}
                      className="w-full"
                    >
                      {isEnrolling ? 'Enrolling...' : isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
                    </Button>
                  </div>

                  <div className="border-t border-border pt-4 space-y-2 text-xs text-muted-foreground">
                    <p className="flex gap-2">
                      <span>✓</span>
                      <span>Lifetime access to course materials</span>
                    </p>
                    <p className="flex gap-2">
                      <span>✓</span>
                      <span>Download lecture notes</span>
                    </p>
                    <p className="flex gap-2">
                      <span>✓</span>
                      <span>Certificate of completion</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
