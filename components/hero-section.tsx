'use client';

import React from "react"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, GraduationCap, Building2, ArrowRight, Star, Play } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] lg:h-screen flex items-center justify-center overflow-hidden py-12 lg:py-20 bg-background">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-mesh"></div>
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-primary/8 via-transparent to-transparent blur-3xl"></div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 left-4 lg:left-10 w-16 lg:w-20 h-16 lg:h-20 rounded-full bg-primary/5 blur-2xl float" />
      <div className="absolute bottom-1/4 right-8 lg:right-20 w-24 lg:w-32 h-24 lg:h-32 rounded-full bg-primary/10 blur-2xl float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10 py-12 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

          {/* Left Content */}
          <div className="flex flex-col space-y-8 text-center lg:text-left">

            {/* Premium Badge */}
            <div className="animate-in fade-in slide-in-from-top-4 duration-700 flex justify-center lg:justify-start">
              <Badge className="px-4 py-1.5 text-[10px] sm:text-xs font-semibold rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary border border-primary/20 inline-flex items-center gap-2 shimmer">
                <Star className="h-3 w-3 fill-current" />
                Trusted by 5000+ Students Nationwide
              </Badge>
            </div>

            {/* Main Headline */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15] sm:leading-[1.1]">
                Elevate Your{' '}
                <span className="relative">
                  <span className="gradient-text">Academic Journey</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C50 4 100 4 150 6C200 8 250 4 298 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--primary)" />
                        <stop offset="100%" stopColor="var(--gold)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:max-w-none leading-relaxed">
                Master complex subjects with India's most prestigious coaching institute.
                Our programs in Mathematics, Physics, and Science are designed to transform ambition into excellence.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 justify-center lg:justify-start">
              <Link href="/courses" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 text-sm rounded-full bg-gradient-to-r from-primary via-primary to-primary/90 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105 group"
                >
                  Explore Courses
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-sm rounded-full border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 text-primary transition-all duration-300 group"
              >
                <Play className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Watch Video
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 animate-in fade-in zoom-in duration-700 delay-600">
              {[
                { label: 'Success Rate', value: '95%', icon: <TrendingUp className="h-4 w-4" /> },
                { label: 'Active Students', value: '5000+', icon: <Users className="h-4 w-4" /> },
                { label: 'Expert Mentors', value: '50+', icon: <GraduationCap className="h-4 w-4" /> },
                { label: 'Years Legacy', value: '25+', icon: <Building2 className="h-4 w-4" /> }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group bg-white/50 backdrop-blur-sm border border-border/50 rounded-2xl p-3 sm:p-4 text-center shadow-sm hover:shadow-lg hover:bg-white/80 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center h-8 sm:h-10 w-8 sm:w-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
                    {React.cloneElement(stat.icon as React.ReactElement<any>, { className: "h-3.5 sm:h-4 w-3.5 sm:w-4" })}
                  </div>
                  <div className="text-lg sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">{stat.value}</div>
                  <div className="text-[8px] sm:text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 delay-300 block">
            <div className="relative">

              {/* Glow */}
              <div className="absolute -top-10 -right-10 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-bl from-primary/15 via-primary/5 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-36 sm:w-72 h-36 sm:h-72 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl"></div>

              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm group">
                <div className="relative h-[40vh] sm:h-[50vh] lg:h-[70vh]">
                  <Image
                    src="/intro.jpg"
                    alt="Students learning in coaching class"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent opacity-60"></div>
                </div>

                {/* Achievement Card */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 glass rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-10 sm:h-12 w-10 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                      <GraduationCap className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs sm:text-sm font-bold text-foreground">Join Top Performers</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground text-nowrap truncate">Transform your academic future today</div>
                    </div>
                    <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5 text-primary shrink-0" />
                  </div>
                </div>
              </div>

              {/* Floating Badges */}
              <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xl flex items-center gap-1.5 sm:gap-2 float">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-bold text-foreground">4.9/5</span>
              </div>

              <div className="absolute -bottom-3 sm:-bottom-4 -right-3 sm:-right-4 glass px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-xl float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] sm:text-xs font-semibold text-foreground">2000+ Selections</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

  );
}