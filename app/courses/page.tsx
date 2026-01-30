'use client';

import React from "react"
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { getAllCourses } from '@/lib/courses';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMemo } from 'react';
import { Clock, User, MapPin, Calendar, Users, BookOpen, Sparkles, GraduationCap, Target, Award } from 'lucide-react';
import { CourseImage } from '@/components/ui/course-image';

export default function CoursesPage() {
  const courses = useMemo(() => getAllCourses(), []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="grow">

        {/* Premium Header Section */}
        <section className="relative py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-mesh"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-primary/8 to-transparent blur-3xl"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 inline-flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                Academic Programs
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                Master Your <span className="gradient-text">Subjects</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Explore our meticulously curated offline coaching programs designed by world-class educators to help you excel in board exams and beyond.
              </p>
            </div>
          </div>
        </section>

        {/* Premium Course Grid */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-grid opacity-30"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className="group relative bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Section */}
                  <div className="relative h-52 overflow-hidden">
                    <CourseImage
                      src={course.image}
                      alt={course.name}
                      courseName={course.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-bold px-3 py-1 shadow-lg">
                        {course.class}
                      </Badge>
                      <Badge className="bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1">
                        {course.level}
                      </Badge>
                    </div>

                    {/* Batch Badge */}
                    {course.batchType && (
                      <div className="absolute bottom-4 right-4">
                        <Badge className="bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold px-3 py-1 flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {course.batchType} Batch
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Course Details */}
                    <div className="space-y-3 py-4 border-y border-border/50">
                      {/* Instructor */}
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground">{course.instructor}</div>
                          <div className="text-xs text-muted-foreground">Expert Faculty</div>
                        </div>
                      </div>

                      {/* Duration, Location, Students */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 text-primary" />
                          <span>{course.duration}</span>
                        </div>
                        {course.location && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5 text-primary" />
                            <span className="truncate">{course.location}</span>
                          </div>
                        )}
                        {course.totalStudents && (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Users className="h-3.5 w-3.5 text-primary" />
                            <span>{course.totalStudents}+ joined</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          ₹{course.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {course.includesMaterials ? 'Includes materials' : 'Per year'}
                        </div>
                      </div>
                      <Link href={`/courses/${course.id}`}>
                        <Button className="rounded-full px-6 bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:scale-105">
                          Enroll Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Why Choose Section */}
        <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
          <div className="absolute inset-0 bg-mesh"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
              <Badge className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 inline-flex items-center gap-2">
                <Award className="h-3 w-3" />
                The Offline Advantage
              </Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
                Why Choose Our <span className="gradient-text">Offline Coaching</span>?
              </h2>
              <p className="text-lg text-muted-foreground">
                Experience the benefits of traditional classroom learning with modern teaching methodologies
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: 'Interactive Sessions',
                  description: 'Live doubt solving and personalized attention from expert faculty',
                  gradient: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: BookOpen,
                  title: 'Study Materials',
                  description: 'Comprehensive study materials and regular practice tests included',
                  gradient: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Target,
                  title: 'Regular Tests',
                  description: 'Weekly tests and mock exams to track your progress',
                  gradient: 'from-amber-500 to-orange-500',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center"
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                  <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>

                  <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}