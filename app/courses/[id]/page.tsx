'use client';

import React, { use, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  ArrowLeft, Star, User, Clock, ShieldCheck,
  Users, BookOpen, Award, MapPin, AlertCircle, CheckCircle,
  GraduationCap, X
} from 'lucide-react';
import { getAllCourses, getStudentEnrollments, enrollStudent } from '@/lib/courses';
import { createPayment } from '@/lib/fees';
import { useAuth } from '@/app/auth-context';

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const router = useRouter();

  const [isEnrolling, setIsEnrolling] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isImageOpen, setIsImageOpen] = useState(false);

  const courses = getAllCourses();
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navigation />
        <div className="grow flex flex-col items-center justify-center space-y-4">
          <AlertCircle className="h-12 w-12 text-slate-300" />
          <h1 className="text-xl font-bold">Course Not Found</h1>
          <Link href="/courses">
            <Button variant="outline">Return to Catalog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isEnrolled = user ? getStudentEnrollments(user.id).some(e => e.courseId === course.id) : false;

  const handleEnroll = async () => {
    if (!user) { router.push('/login'); return; }
    setError(''); setMessage(''); setIsEnrolling(true);
    try {
      const result = enrollStudent(user.id, course.id);
      if (result.success) {
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);
        createPayment(user.id, course.id, course.price, dueDate.toISOString());
        setMessage('Successfully enrolled! Redirecting...');
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        setError(result.error || 'Enrollment failed');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />

      <main className="grow">
        {/* --- PROFESSIONAL HERO SECTION --- */}
        <section className="bg-slate-50 border-b border-slate-100">
          <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

              {/* Left Side: Top-Aligned Content */}
              <div className="lg:col-span-7 flex flex-col justify-start">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-[10px] font-bold uppercase tracking-widest mb-8"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to Course Catalog
                </Link>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-tighter">
                      Class {course.class}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      4.9 (Recent Batch)
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                    {course.name}
                  </h1>

                  <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-2xl border-l-4 border-primary/10 pl-6">
                    {course.description}
                  </p>
                </div>

                {/* Quick Info Bar */}
                <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Faculty Lead</p>
                      <p className="text-sm font-bold text-slate-900">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Duration</p>
                      <p className="text-sm font-bold text-slate-900">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white border border-slate-100 flex items-center justify-center">
                      <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Curriculum</p>
                      <p className="text-sm font-bold text-slate-900">Verified</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Professional Image Layout */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div
                  onClick={() => setIsImageOpen(true)}
                  className="relative w-full aspect-square max-w-[400px] bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-[10px] border-white group cursor-pointer"
                >
                  <Image
                    src={course.image || '/images/classroom.jpg'}
                    alt={course.name}
                    fill
                    className="object-contain transition-transform duration-700 group-hover:scale-105 p-4"
                    onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80')}
                  />

                  {/* Floating Price Badge */}
                  <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur-md text-white px-6 py-3 rounded-2xl shadow-xl border border-white/10">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Course Fee</p>
                    <p className="text-2xl font-black">₹{course.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Image Overlay */}
              {isImageOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
                  onClick={() => setIsImageOpen(false)}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsImageOpen(false); }}
                    className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/10"
                  >
                    <X className="h-6 w-6" />
                  </button>

                  <div
                    className="relative w-full max-w-5xl h-[80vh] rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] border-4 border-white/20 bg-white/5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={course.image || '/images/classroom.jpg'}
                      alt={course.name}
                      fill
                      className="object-contain"
                      onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80')}
                    />
                  </div>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* --- CONTENT & SIDEBAR SECTION --- */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Main Content Details */}
            <div className="lg:col-span-8 space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: BookOpen, title: 'Study Material', desc: 'Comprehensive printed notes and digital question banks.' },
                  { icon: Users, title: 'Batch Size', desc: 'Limited students per batch for individual focus.' },
                  { icon: Award, title: 'Mock Tests', desc: 'Weekly full-length papers following the board pattern.' },
                  { icon: MapPin, title: 'Campus', desc: course.location || 'Main Education Wing' }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-white hover:border-primary/20 transition-all group">
                    <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Course Quote/Highlight */}
              <div className="bg-slate-900 rounded-[2rem] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <GraduationCap className="h-32 w-32" />
                </div>
                <p className="text-xl md:text-2xl font-medium italic relative z-10 leading-relaxed mb-8">
                  "Excellence is not an act, but a habit. We build that habit through consistent concept mapping and rigorous practice."
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-white/20 border border-white/10 flex items-center justify-center font-bold">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold">{course.instructor}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Academy Director</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Enrollment Card */}
            <div className="lg:col-span-4">
              <aside className="sticky top-28">
                <Card className="rounded-[2.5rem] border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden">
                  <CardContent className="p-8 space-y-8">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Admission Status</p>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-sm font-bold text-slate-900">Enrolling for New Batch</span>
                      </div>
                    </div>

                    {message && (
                      <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex gap-3 text-emerald-800">
                        <CheckCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm font-bold">{message}</p>
                      </div>
                    )}

                    {error && (
                      <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl flex gap-3 text-rose-800">
                        <AlertCircle className="h-5 w-5 shrink-0" />
                        <p className="text-sm font-bold">{error}</p>
                      </div>
                    )}

                    <Button
                      onClick={handleEnroll}
                      disabled={isEnrolling || isEnrolled}
                      className="w-full h-14 rounded-xl text-base font-black uppercase tracking-tight shadow-xl shadow-primary/20 active:scale-[0.98] transition-transform"
                    >
                      {isEnrolling ? 'Processing...' : isEnrolled ? 'Successfully Enrolled' : 'Secure Admission Now'}
                    </Button>

                    <div className="space-y-4">
                      <p className="text-xs font-bold text-slate-900">This Admission Includes:</p>
                      <ul className="space-y-3">
                        {['Official ID Card', 'Welcome Academic Kit', 'Digital Portal Access'].map((txt, i) => (
                          <li key={i} className="flex items-center gap-3 text-[11px] text-slate-500 font-bold">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            {txt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </aside>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}