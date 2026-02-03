'use client';

import React, { useEffect, useState, useRef } from "react"
import { Badge } from '@/components/ui/badge';
import { Trophy, Users, BookOpen, Star, Award, TrendingUp } from 'lucide-react';

const achievements = [
  {
    label: 'Top 100 AIRs',
    value: 500,
    suffix: '+',
    icon: Trophy,
    description: 'Students who secured All India Ranks in competitive exams.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    label: 'Board Excellence',
    value: 98,
    suffix: '%',
    icon: Star,
    description: 'Average score of our students in final board examinations.',
    gradient: 'from-primary to-primary/70',
  },
  {
    label: 'Elite Alumni',
    value: 10,
    suffix: 'k+',
    icon: Users,
    description: 'A global network of high-achievers and leaders.',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    label: 'Success Stories',
    value: 50,
    suffix: '+',
    icon: Award,
    description: 'Published success stories and testimonials.',
    gradient: 'from-purple-500 to-pink-500',
  },
];

// Animated Counter Component
function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-foreground">
      {count}{suffix}
    </div>
  );
}

export function AchievementsSection() {
  return (
    <section className="relative py-24  overflow-hidden">
      {/* Background Effects */}
      {/* <div className="absolute inset-0 bg-mesh"></div> */}

      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="flex justify-center">
            <Badge className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 inline-flex items-center gap-2">
              <TrendingUp className="h-3 w-3" />
              Provenance of Success
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Our <span className="gradient-text">Legacy</span> in Numbers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Two decades of relentless pursuit of academic perfection and record-breaking student achievements.
          </p>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center"
            >
              {/* Hover Glow */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Animated Counter */}
              <AnimatedCounter value={item.value} suffix={item.suffix} />

              {/* Label */}
              <div className="text-primary font-bold text-xs tracking-widest uppercase mt-2 mb-4">
                {item.label}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
