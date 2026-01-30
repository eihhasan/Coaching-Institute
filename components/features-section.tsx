'use client';

import React from "react"
import { CheckCircle2, Star, Target, Shield, Zap, Award, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: "Expert Mentorship",
    description: "Learn from top-tier educators with decades of proven academic success and pedagogical expertise.",
    icon: Star,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Precision Curriculum",
    description: "Meticulously structured modules designed to cover board exams and competitive entrances from the ground up.",
    icon: Target,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Smart Analytics",
    description: "Track your progress with elite performance metrics and personalized feedback loops.",
    icon: Zap,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "ISO Verification",
    description: "Our standards are ISO certified, ensuring the highest quality of education and student support.",
    icon: Shield,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "25-Year Legacy",
    description: "Join a 25-year tradition of excellence and a community of high-achieving alumni.",
    icon: Award,
    gradient: "from-primary to-primary/70",
  },
  {
    title: "Quality Resources",
    description: "Gain access to exclusive study materials, live sessions, and a comprehensive digital library.",
    icon: CheckCircle2,
    gradient: "from-rose-500 to-red-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-muted/30 to-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Premium Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="flex justify-center">
            <Badge className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              The Advantage
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Why Choose <span className="gradient-text">Our Institute?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide world-class coaching for academic success through a refined, cutting-edge pedagogical framework.
          </p>
        </div>

        {/* Premium Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

              {/* Icon Container */}
              <div className={`relative h-14 w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Learn More Link */}
              <div className="mt-6 pt-4 border-t border-border/50">
                <span className="text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                  Learn More
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
