'use client';

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getAllCourses, getStudentEnrollments, enrollStudent } from '@/lib/courses';
import { createPayment } from '@/lib/fees';
import { useAuth } from '@/app/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, use } from 'react';
import { AlertCircle, CheckCircle, Clock, User, Award, BookOpen, GraduationCap, ArrowLeft, Star, Users, MapPin } from 'lucide-react';
import { CourseImage } from '@/components/ui/course-image';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const courses = getAllCourses();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <>
        <Navigation />
        <div className="min-h-[80vh] flex items-center justify-center bg-background">
          <div className="text-center space-y-6 max-w-md px-4">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Course not found</h1>
            <p className="text-muted-foreground">The course you are looking for might have been moved or deleted.</p>
            <Link href="/courses">
              <Button size="lg" className="rounded-full px-8">Back to Courses</Button>
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


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />

      <main className="grow">
        {/* Simple Professional Header Section */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-white border-b border-slate-100 overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-6 text-sm font-medium group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Back to all courses
              </Link>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="secondary" className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-100 border-none text-[10px] font-bold uppercase tracking-wider">
                  {course.level} Level
                </Badge>
                <Badge variant="secondary" className="px-3 py-1 rounded-md bg-primary/10 text-primary hover:bg-primary/10 border-none text-[10px] font-bold uppercase tracking-wider">
                  {course.class}
                </Badge>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-md text-[10px] font-bold uppercase tracking-wider border border-amber-100">
                  <Star className="h-3 w-3 fill-amber-500" />
                  4.9 Rating
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
                {course.name}
              </h1>

              <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mb-10 font-medium">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-8 py-8 border-y border-slate-100 mt-8">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Primary Faculty</div>
                    <div className="text-base font-bold text-slate-900">{course.instructor}</div>
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-200 hidden md:block" />

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Batch Duration</div>
                    <div className="text-base font-bold text-slate-900">{course.duration}</div>
                  </div>
                </div>

                <div className="h-6 w-px bg-slate-200 hidden md:block" />

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Program Type</div>
                    <div className="text-base font-bold text-slate-900">Premium Coaching</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              {/* Features */}
              <section className="space-y-10">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">What this course offers</h2>
                  <p className="text-slate-600 font-medium">
                    This program is designed to provide comprehensive support for your academic journey, combining expert teaching with modern learning tools.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: BookOpen, title: 'Study Material', desc: 'Detailed notes and resources updated for the latest board syllabus.' },
                    { icon: Users, title: 'Direct Access', desc: 'Small batch sizes to ensure personalized attention and doubt clearing.' },
                    { icon: Award, title: 'Weekly Tests', desc: 'Regular assessments to track progress and identify areas for improvement.' },
                    { icon: MapPin, title: 'Modern Campus', desc: course.location || 'Safe and accessible facility located at our central hub.' }
                  ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 transition-all duration-300">
                      <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                          <feature.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-slate-900">{feature.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 relative overflow-hidden group">
                  <div className="relative z-10 space-y-4">
                    <p className="text-slate-600 leading-relaxed font-medium italic">
                      &quot;Success in examinations depends on conceptual clarity and rigorous practice. This course is designed to provide both in a systematic manner.&quot;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-[10px] uppercase">RK</div>
                      <div>
                        <div className="font-bold text-sm text-slate-900">{course.instructor}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Head of Faculty</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="relative">
              <aside className="sticky top-28 space-y-6">
                <Card className="rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-8 space-y-8">
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Course Fee</div>
                      <div className="text-4xl font-bold text-slate-900">₹{course.price.toLocaleString()}</div>
                    </div>

                    {message && (
                      <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 flex gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-emerald-800">{message}</p>
                      </div>
                    )}

                    {error && (
                      <div className="rounded-xl bg-rose-50 border border-rose-100 p-4 flex gap-3">
                        <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-rose-800">{error}</p>
                      </div>
                    )}

                    <div className="space-y-4">
                      <Button
                        onClick={handleEnroll}
                        disabled={isEnrolling || isEnrolled}
                        className="w-full h-14 rounded-xl text-base font-bold bg-primary hover:bg-primary/95 shadow-lg shadow-primary/10 transition-all disabled:opacity-50"
                      >
                        {isEnrolling ? (
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4 animate-spin" />
                            Enrolling...
                          </span>
                        ) : isEnrolled ? (
                          'Already Enrolled'
                        ) : (
                          'Enroll in Course'
                        )}
                      </Button>
                      <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        Standard batch enrollment
                      </p>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-100">
                      <h4 className="font-bold text-slate-900 text-sm">Course includes:</h4>
                      <ul className="space-y-3">
                        {[
                          { icon: BookOpen, text: 'Physical Study Material' },
                          { icon: Users, text: 'Personal Mentoring' },
                          { icon: GraduationCap, text: 'Certificate of Completion' },
                          { icon: Clock, text: 'Lifetime access to notes' }
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                            <item.icon className="h-4 w-4 text-slate-400" />
                            {item.text}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                              <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="h-full w-full object-cover" />
                            </div>
                          ))}
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Join 120+ Students</div>
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-sm space-y-6">
                  <div>
                    <h4 className="text-lg font-bold mb-2">Need guidance?</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Speak with our academic advisors to find the perfect batch for your goals.
                    </p>
                  </div>
                  <Link href="/contact" className="block">
                    <Button variant="secondary" className="w-full h-12 rounded-xl border-none font-bold bg-white text-slate-900 hover:bg-slate-100 transition-all">
                      Contact Advisor
                    </Button>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

