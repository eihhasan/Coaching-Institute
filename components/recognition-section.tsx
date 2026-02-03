'use client';

import React from "react"
import { Badge } from '@/components/ui/badge';
import { Award, ShieldCheck, Flame, Medal, Star, Quote, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const recognitions = [
  {
    title: 'ISO Certified',
    description: 'World-class quality management systems.',
    icon: ShieldCheck,
    color: 'from-blue-500 to-cyan-400'
  },
  {
    title: 'Edu-Award 2025',
    description: 'Most innovative institute in North India.',
    icon: Medal,
    color: 'from-amber-500 to-orange-400'
  },
  {
    title: '5-Star Rating',
    description: 'Rated 5 stars by major auditing agencies.',
    icon: Award,
    color: 'from-emerald-500 to-teal-400'
  },
  {
    title: 'Growth Leader',
    description: 'Fastest-growing education hub in the region.',
    icon: Flame,
    color: 'from-purple-500 to-pink-400'
  },
];

const testimonials = [
  {
    name: 'Arjun Mishra',
    course: 'JEE Main Advanced',
    score: 'AIR 245',
    feedback: 'The structured approach and dedication of the faculty helped me crack JEE Main. The doubt sessions were incredibly helpful!',
  },
  {
    name: 'Divya Gupta',
    course: 'Class 12 Boards',
    score: '96% Overall',
    feedback: 'Excellent teaching methodology and comprehensive study materials. Highly recommended for serious students!',
  },
  {
    name: 'Priya Verma',
    course: 'Class 10 Boards',
    score: '98% Aggregate',
    feedback: 'Teachers are very patient and explain concepts clearly. The regular tests helped me track my progress effectively.',
  },
];

export function RecognitionSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Background Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">

        {/* Awards/Recognitions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-32">

          {/* Left Side: Content */}
          <div className="lg:col-span-5 space-y-8 sticky top-24">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Trust & Excellence
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.1]">
                Proven <span className="text-transparent bg-clip-text gradient-text">Pedigree</span> of Quality
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
                Our commitment to academic precision is validated by prestigious global certifications and domestic honors.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">Authorized By</p>
              <div className="flex flex-wrap gap-3">
                {['CBSE APPROVED', 'NIOS PARTNER', 'ISO 9001:2015'].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-xs font-bold text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Recognition Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {recognitions.map((item, index) => (
              <div key={index} className="group p-8 rounded-[2rem] bg-card border border-border/60 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-[0.03] rounded-bl-full transition-all group-hover:scale-150`} />

                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${item.color} p-0.5 mb-6 transform group-hover:rotate-6 transition-transform duration-500 shadow-lg`}>
                  <div className="w-full h-full bg-card rounded-[calc(1rem-2px)] flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="relative">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-black text-foreground">What our <span className="gradient-text">Scholars</span> say</h2>
            <div className="h-1.5 w-24 bg-primary/20 rounded-full mx-auto overflow-hidden">
              <div className="h-full w-1/2 bg-primary rounded-full animate-shimmer" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="relative group">
                {/* Decorative background card effect */}
                <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] translate-y-4 translate-x-2 group-hover:translate-y-2 group-hover:translate-x-1 transition-transform duration-500" />

                <Card className="relative bg-card border border-border/50 rounded-[2.5rem] p-10 overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <Quote className="absolute -top-4 -right-4 h-24 w-24 text-primary/5 -rotate-12" />

                  <CardContent className="p-0 space-y-8 relative z-10">
                    <div className="flex gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                    </div>

                    <p className="text-base text-foreground/90 leading-relaxed font-medium italic">
                      “{t.feedback}”
                    </p>

                    <div className="flex items-center justify-between gap-4 pt-6 border-t border-border/50">
                      <div className="min-w-0">
                        <div className="font-black text-lg text-foreground truncate">{t.name}</div>
                        <div className="text-[10px] text-primary font-black uppercase tracking-[0.2em] mt-1">
                          {t.course}
                        </div>
                      </div>
                      <div className="shrink-0 bg-primary/10 text-primary px-3 py-1.5 rounded-lg text-xs font-black border border-primary/20 shadow-inner">
                        {t.score}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}