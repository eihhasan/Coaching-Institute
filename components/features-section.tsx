'use client';

import React, { useState, useEffect } from "react"
import {
  CheckCircle2,
  Star,
  Target,
  Shield,
  Zap,
  Award,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    title: "Expert Mentorship",
    description: "Learn from top-tier educators with decades of proven academic success and pedagogical expertise.",
    icon: Star,
    gradient: "from-amber-400 to-orange-400",
  },
  {
    title: "Precision Curriculum",
    description: "Meticulously structured modules designed to cover board exams and competitive entrances from the ground up.",
    icon: Target,
    gradient: "from-blue-400 to-cyan-400",
  },
  {
    title: "Smart Analytics",
    description: "Track your progress with elite performance metrics and personalized feedback loops.",
    icon: Zap,
    gradient: "from-purple-400 to-pink-400",
  },
  {
    title: "ISO Verification",
    description: "Our standards are ISO certified, ensuring the highest quality of education and student support.",
    icon: Shield,
    gradient: "from-green-400 to-emerald-400",
  },
  {
    title: "25-Year Legacy",
    description: "Join a 25-year tradition of excellence and a community of high-achieving alumni.",
    icon: Award,
    gradient: "from-slate-700 to-slate-500",
  },
  {
    title: "Quality Resources",
    description: "Gain access to exclusive study materials, live sessions, and a comprehensive digital library.",
    icon: CheckCircle2,
    gradient: "from-rose-400 to-red-400",
  },
];

export function FeaturesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const getCardStyle = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;

    if (diff === 0) return { transform: 'translateX(0%) scale(1)', opacity: 1, zIndex: 30 };
    if (diff === 1) return { transform: 'translateX(85%) scale(0.85)', opacity: 0.7, zIndex: 20 };
    if (diff === 2) return { transform: 'translateX(170%) scale(0.7)', opacity: 0.4, zIndex: 10 };
    if (diff === features.length - 1) return { transform: 'translateX(-85%) scale(0.85)', opacity: 0.7, zIndex: 20 };
    if (diff === features.length - 2) return { transform: 'translateX(-170%) scale(0.7)', opacity: 0.4, zIndex: 10 };

    return { transform: 'translateX(300%) scale(0.5)', opacity: 0, zIndex: 0 };
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Soft background blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-40"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <Badge className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-slate-800 border border-slate-200 inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            The Advantage
          </Badge>

          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900">
            Why Choose <span className="text-primary">Our Institute?</span>
          </h2>

          <p className="text-lg text-slate-600 leading-relaxed">
            Experience world-class coaching through our refined and proven academic framework.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-[500px]" style={{ perspective: '2000px' }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md transition-all duration-700"
                style={getCardStyle(index)}
              >
                <div className="relative bg-white p-10 rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all">
                  {/* Icon */}
                  <div className="flex justify-center mb-8">
                    <div className={`h-20 w-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                      <feature.icon className="h-10 w-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-4">
                    <h3 className="text-2xl font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button onClick={() => setCurrentIndex((i) => (i - 1 + features.length) % features.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white border border-slate-200 shadow hover:scale-110">
            <ChevronLeft />
          </button>

          <button onClick={() => setCurrentIndex((i) => (i + 1) % features.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white border border-slate-200 shadow hover:scale-110">
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}
