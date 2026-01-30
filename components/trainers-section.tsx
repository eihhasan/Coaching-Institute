'use client';

import React from "react"
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { GraduationCap, Award, Star, User, Linkedin, Twitter, BookOpen } from 'lucide-react';

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
        {/* Premium Header */}
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

        {/* Premium Trainer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative h-80 overflow-hidden">
                {trainer.image ? (
                  <Image
                    src={trainer.image}
                    alt={trainer.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <User className="h-20 w-20 text-primary/30" />
                  </div>
                )}

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent`}></div>

                {/* Experience Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`bg-gradient-to-r ${trainer.gradient} text-white text-xs px-3 py-1 font-bold shadow-lg`}>
                    {trainer.experience}
                  </Badge>
                </div>

                {/* Name Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
                  <p className="text-white/80 text-sm font-medium">{trainer.role}</p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                {/* Specialization */}
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                  <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${trainer.gradient} flex items-center justify-center`}>
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium">Specialization</div>
                    <div className="text-sm font-semibold text-foreground">{trainer.specialization}</div>
                  </div>
                </div>

                {/* Achievement */}
                <div className="flex items-center gap-3 p-3 bg-amber-500/5 rounded-xl">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-medium">Achievement</div>
                    <div className="text-sm font-semibold text-foreground">{trainer.achievements}</div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex gap-2 pt-2">
                  <button className="h-9 w-9 rounded-lg bg-primary/5 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-300">
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button className="h-9 w-9 rounded-lg bg-primary/5 hover:bg-primary hover:text-white text-primary flex items-center justify-center transition-all duration-300">
                    <Twitter className="h-4 w-4" />
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
