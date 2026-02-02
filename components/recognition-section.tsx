'use client';

import React from "react"
import { Badge } from '@/components/ui/badge';
import { Award, ShieldCheck, Flame, Medal, Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const recognitions = [
  {
    title: 'ISO Certified',
    description: 'International recognition for our world-class quality management systems.',
    icon: ShieldCheck,
  },
  {
    title: 'Edu-Award 2025',
    description: 'Recognized as the most innovative coaching institute in North India.',
    icon: Medal,
  },
  {
    title: '5-Star Rating',
    description: 'Consistently rated 5 stars by major educational auditing agencies.',
    icon: Award,
  },
  {
    title: 'Growth Leader',
    description: 'Acknowledged for being the fastest-growing education hub in the region.',
    icon: Flame,
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">

        {/* Awards/Recognitions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 pt-16 border-t border-border/50">
          <div className="space-y-6">
            <div className="flex">
              <Badge variant="secondary" className="px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary border-primary/10">
                Affiliations & Honors
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Recognized by <span className="text-primary">Excellence</span></h2>
            <p className="text-base text-muted-foreground leading-relaxed">Our commitment to academic precision is validated by prestigious global certifications and domestic honors. We maintain the highest standards of integrity and educational quality.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="text-sm sm:text-lg font-bold tracking-tight text-foreground/50 border border-border/50 rounded-lg p-2 text-center">CBSE APPROVED</div>
              <div className="text-sm sm:text-lg font-bold tracking-tight text-primary/50 border border-primary/20 bg-primary/5 rounded-lg p-2 text-center">NIOS PARTNER</div>
              <div className="text-sm sm:text-lg font-bold tracking-tight text-foreground/50 border border-border/50 rounded-lg p-2 text-center">ISO 9001:2015</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recognitions.map((item, index) => (
              <div key={index} className="bg-card p-6 rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 border border-primary/20">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <Badge variant="secondary" className="px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary border-primary/10">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Voices of <span className="text-primary">Success</span></h2>
            <p className="text-base text-muted-foreground">Read how our apprentices transformed their potential into prestigious results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="bg-card border border-border/50 rounded-2xl p-8 relative shadow-sm hover:shadow-md transition-shadow">
                <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/5" />
                <CardContent className="p-0 space-y-6">
                  <div className="flex gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed italic">{`"${t.feedback}"`}</p>
                  <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-base text-foreground">{t.name}</div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{t.course}</div>
                    </div>
                    <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-bold px-2 py-0.5 rounded-lg">
                      {t.score}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
