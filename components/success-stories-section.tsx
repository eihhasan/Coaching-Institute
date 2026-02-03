'use client';

import React from "react"
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Trophy, Star, Quote, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const successStories = [
    {
        name: 'Priya Sharma',
        photo: '/student2.jpg',
        rank: 'AIR 12',
        exam: 'JEE Advanced 2024',
        course: 'Mathematics & Physics',
        quote: 'The personalized attention and structured approach helped me achieve what I dreamed of.',
        gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    },
    {
        name: 'Rahul Verma',
        photo: '/student3.jpg',
        rank: 'AIR 47',
        exam: 'NEET 2024',
        course: 'Biology & Chemistry',
        quote: 'Expert faculty and regular mock tests were the key to my success.',
        gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    },
    {
        name: 'Ananya Gupta',
        photo: '/student.jpg',
        rank: 'AIR 89',
        exam: 'JEE Main 2024',
        course: 'Complete Science',
        quote: 'The study materials and doubt-solving sessions made complex topics easy.',
        gradient: 'from-blue-600 via-indigo-500 to-purple-500',
    },
    {
        name: 'Vikash Kumar',
        photo: '/student3.jpg',
        rank: '99.8%ile',
        exam: 'Board Exams 2024',
        course: 'Class 12 Science',
        quote: 'Consistent guidance and practice tests helped me score beyond my expectations.',
        gradient: 'from-fuchsia-500 via-purple-500 to-pink-500',
    },
];

export function SuccessStoriesSection() {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-amber-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col items-center text-center mb-20 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 text-white text-xs font-bold tracking-widest uppercase shadow-xl">
                        <Sparkles className="h-4 w-4 text-amber-400" />
                        The Hall of Excellence
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">
                        Our <span className="text-transparent bg-clip-text gradient-text">Top Achievers</span>
                    </h2>
                    <p className="max-w-xl text-slate-500 text-lg">
                        Meet the exceptional minds who defined success through dedication and our specialized mentorship.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[450px]">
                    {successStories.map((story, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-[2.5rem] overflow-hidden border border-slate-200 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] 
                                ${index === 0 ? 'md:col-span-7' : index === 1 ? 'md:col-span-5' : 'md:col-span-6'}`}
                        >
                            {/* Image Background with Overlay */}
                            <Image
                                src={story.photo}
                                alt={story.name}
                                fill
                                className="object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                            {/* Content Overlays */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                {/* Top: Rank Badge */}
                                <div className="flex justify-between items-start">
                                    <div className={`px-5 py-2 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 text-white font-bold text-lg shadow-2xl`}>
                                        {story.rank}
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                        <Trophy className="h-6 w-6" />
                                    </div>
                                </div>

                                {/* Bottom: Info */}
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <Badge className={`bg-gradient-to-r ${story.gradient} border-none text-white font-bold`}>
                                            {story.exam}
                                        </Badge>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                            {story.name}
                                        </h3>
                                    </div>

                                    <div className="relative overflow-hidden transition-all duration-500 max-h-0 group-hover:max-h-32 opacity-0 group-hover:opacity-100">
                                        <p className="text-slate-200 text-sm md:text-base italic leading-relaxed">
                                            <Quote className="inline-block h-4 w-4 mr-2 text-amber-400 fill-amber-400" />
                                            {story.quote}
                                        </p>
                                    </div>

                                    <div className="pt-4 flex items-center justify-between border-t border-white/10">
                                        <span className="text-white/70 text-sm font-medium">{story.course}</span>
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-3 w-3 text-amber-400 fill-amber-400" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Elegant CTA */}
                <div className="mt-20 flex flex-col items-center gap-6">
                    <p className="text-slate-400 font-medium text-sm">Join the ranks of our successful alumni today</p>
                    <Link href="/about">
                        <Button
                            size="lg"
                            className="h-14 px-10 rounded-full bg-slate-900 text-white hover:bg-primary transition-all duration-300 group shadow-2xl hover:shadow-primary/20"
                        >
                            Explore All Success Stories
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}