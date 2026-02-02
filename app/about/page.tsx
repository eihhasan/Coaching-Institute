'use client';

import React from "react"
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Award, Star, Target, Zap, Clock, Users } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="grow">

        {/* Hero Section - Simple & Professional */}
        <section className="relative overflow-hidden py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="px-3 py-0.5 text-xs font-bold text-primary border-primary/10">
                Our Legacy
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
                Pioneering <span className="text-primary">Academic Excellence</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
                For over 25 years, we have been a trusted name in coaching, transforming thousands of ambitious minds into academic leaders.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section - Clean Layout */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
                  <Star className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Founded on a Vision of Success</h2>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    What started as a small classroom has grown into a prestigious institution. Our journey is defined by the thousands of success stories of students who topped board exams and cleared competitive entrances.
                  </p>
                  <blockquote className="border-l-4 border-primary pl-4 py-1 italic text-foreground font-medium text-sm">
                    "Excellence is not an act, but a habit. We instill a mindset of success that stays with our students for a lifetime."
                  </blockquote>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                    <div className="text-2xl font-bold text-primary mb-1">2000</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">ESTABLISHED</div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl border border-border/50">
                    <div className="text-2xl font-bold text-primary mb-1">Elite</div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">CURRICULUM</div>
                  </div>
                </div>
              </div>

              {/* Stats Grid - Simple Cards */}
              <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-700">
                {[
                  { icon: GraduationCap, label: 'Success Stories', value: '15k+', color: 'primary' },
                  { icon: Award, label: 'Certified Mentors', value: '50+', color: 'primary' },
                  { icon: Target, label: 'Rank Holders', value: '1200+', color: 'primary' },
                  { icon: Users, label: 'Active Students', value: '5k+', color: 'primary' },
                ].map((stat, i) => (
                  <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                        <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission CTA - Clean Banner */}
        <section className="py-12 md:py-20 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">Ready to start your journey?</h2>
              <p className="text-base text-muted-foreground leading-relaxed">
                Experience the difference that clinical coaching and expert mentorship makes. Your future deserves nothing less than excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/signup">
                  <Button size="lg" className="rounded-lg px-8 h-12 font-bold text-sm shadow-lg shadow-primary/20">
                    Join the Institute
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" size="lg" className="rounded-lg px-8 h-12 font-bold text-sm border-primary/20 hover:bg-white transition-colors">
                    Browse Courses
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
