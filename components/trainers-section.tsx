'use client';

import React from "react"
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { GraduationCap, Award, User, Linkedin, Twitter, BookOpen } from 'lucide-react';

const trainers = [
  {
    name: 'Dr. Vikram Sethi',
    role: 'Head of Mathematics',
    experience: '20+ Years',
    specialization: 'Calculus & Algebra',
    achievements: 'Author of 5 Textbooks',
    image: '/images/dummy1.jpg',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Mrs. Anjali Rao',
    role: 'Senior Physics Faculty',
    experience: '15+ Years',
    specialization: 'Quantum Mechanics',
    achievements: 'Gold Medalist - IIT Delhi',
    image: '/images/dummy2.jpg',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Mr. Rajesh Khanna',
    role: 'Chemistry Specialist',
    experience: '18+ Years',
    specialization: 'Organic Chemistry',
    achievements: 'Mentor to AIR 1-100',
    image: '/images/dummy3.jpg',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export function TrainersSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header - Kept exactly as requested */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="flex justify-center">
            <Badge className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 inline-flex items-center gap-2">
              <GraduationCap className="h-3 w-3" />
              Expert Faculty
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Meet Our <span className="gradient-text">Experts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn from academic pioneers dedicated to your academic success and cognitive evolution.
          </p>
        </div>

        {/* Redesigned Trainer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
            >
              {/* Top Image Section */}
              <div className="relative h-64 w-full bg-muted">
                {trainer.image ? (
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground/20" />
                  </div>
                )}

                {/* Subtle Overlay for Name contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-5">
                  <h3 className="text-xl font-bold text-white">{trainer.name}</h3>
                  <p className="text-white/80 text-xs font-medium uppercase tracking-wider">{trainer.role}</p>
                </div>

                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 border-none text-[10px] font-bold px-2 py-1 shadow-sm">
                    {trainer.experience}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {/* Specialization */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Expertise</p>
                      <p className="text-sm font-semibold text-foreground leading-tight">{trainer.specialization}</p>
                    </div>
                  </div>

                  {/* Achievement */}
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber-500/10 text-amber-600">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">Achievement</p>
                      <p className="text-sm font-semibold text-foreground leading-tight">{trainer.achievements}</p>
                    </div>
                  </div>
                </div>

                {/* Footer / Socials */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex gap-3">
                    <Linkedin className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                    <Twitter className="h-4 w-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                  </div>
                  <button className="text-[11px] font-bold text-primary hover:underline">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}