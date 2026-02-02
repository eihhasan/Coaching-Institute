'use client';

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllCourses } from '@/lib/courses';
import Link from 'next/link';
import { ArrowRight, User, Clock, MapPin, Calendar, Sparkles } from 'lucide-react';
import { CourseImage } from '@/components/ui/course-image';

export function CoursesGrid() {
  const courses = getAllCourses().slice(0, 3);

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <Badge className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              Elite Curriculum
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Featured <span className="gradient-text">Programs</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Expert-led offline coaching designed for academic excellence and competitive success.
            </p>
          </div>
          <Link href="/courses">
            <Button
              variant="outline"
              className="rounded-full px-6 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-primary font-semibold group"
            >
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Premium Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group relative bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
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

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white text-xs font-bold px-3 py-1 shadow-lg">
                    {course.class}
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
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center hover:bg-transparent">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{course.instructor}</div>
                      <div className="text-xs text-muted-foreground">Expert Faculty</div>
                    </div>
                  </div>

                  {/* Duration & Location */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{course.duration}</span>
                    </div>
                    {course.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="truncate">{course.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      ₹{course.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Per year</div>
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
  );
}