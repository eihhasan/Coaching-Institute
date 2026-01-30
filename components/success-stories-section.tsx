'use client';

import React from "react"
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Trophy, Star, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const successStories = [
    {
        name: 'Priya Sharma',
        photo: '/student2.jpg',
        rank: 'AIR 12',
        exam: 'JEE Advanced 2024',
        course: 'Mathematics & Physics',
        year: '2024',
        quote: 'The personalized attention and structured approach helped me achieve what I dreamed of.',
        gradient: 'from-amber-500 to-orange-500',
    },
    {
        name: 'Rahul Verma',
        photo: '/student3.jpg',
        rank: 'AIR 47',
        exam: 'NEET 2024',
        course: 'Biology & Chemistry',
        year: '2024',
        quote: 'Expert faculty and regular mock tests were the key to my success.',
        gradient: 'from-emerald-500 to-green-500',
    },
    {
        name: 'Ananya Gupta',
        photo: '/student.jpg',
        rank: 'AIR 89',
        exam: 'JEE Main 2024',
        course: 'Complete Science',
        year: '2024',
        quote: 'The study materials and doubt-solving sessions made complex topics easy to understand.',
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        name: 'Vikash Kumar',
        photo: '/student3.jpg',
        rank: '99.8%ile',
        exam: 'Board Exams 2024',
        course: 'Class 12 Science',
        year: '2024',
        quote: 'Consistent guidance and practice tests helped me score beyond my expectations.',
        gradient: 'from-purple-500 to-pink-500',
    },
];

export function SuccessStoriesSection() {
    return (
        <section className="relative py-24 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-mesh"></div>
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Premium Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
                    <div className="flex justify-center">
                        <Badge className="px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-600 border border-amber-500/20 inline-flex items-center gap-2">
                            <Trophy className="h-3 w-3" />
                            Success Stories
                        </Badge>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
                        Our <span className="gradient-text">Top Achievers</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Meet the students who transformed their dreams into reality with our guidance and mentorship.
                    </p>
                </div>

                {/* Success Stories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {successStories.map((story, index) => (
                        <div
                            key={index}
                            className="group relative bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                        >
                            {/* Hover Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${story.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                            {/* Photo Section */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={story.photo}
                                    alt={story.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent`}></div>

                                {/* Rank Badge */}
                                <div className="absolute top-4 right-4">
                                    <Badge className={`bg-gradient-to-r ${story.gradient} text-white text-sm font-bold px-3 py-1.5 shadow-lg flex items-center gap-1.5`}>
                                        <Trophy className="h-3.5 w-3.5" />
                                        {story.rank}
                                    </Badge>
                                </div>

                                {/* Name & Exam */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-lg font-bold text-white">{story.name}</h3>
                                    <p className="text-white/80 text-sm">{story.exam}</p>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5 space-y-4">
                                {/* Quote */}
                                <div className="relative">
                                    <Quote className="absolute -top-1 -left-1 h-6 w-6 text-primary/20" />
                                    <p className="text-sm text-muted-foreground leading-relaxed pl-4 italic">
                                        "{story.quote}"
                                    </p>
                                </div>

                                {/* Course Tag */}
                                <div className="flex items-center justify-between">
                                    <Badge variant="secondary" className="text-xs bg-primary/5 text-primary border-primary/10">
                                        {story.course}
                                    </Badge>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-3 w-3 text-amber-500 fill-amber-500" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All CTA */}
                <div className="text-center mt-12">
                    <Link href="/about">
                        <Button
                            variant="outline"
                            className="rounded-full px-8 py-3 border-2 border-primary/30 hover:border-primary hover:bg-primary/5 text-primary font-semibold group"
                        >
                            View All Success Stories
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
