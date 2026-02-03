'use client';

import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function LocationSection() {
    return (
        <section className="relative py-24 bg-white overflow-hidden border-t border-slate-100">
            {/* Modern Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/20 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Content: Contact Info */}
                    <div className="space-y-10 animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="space-y-4">
                            <Badge variant="secondary" className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-medium">
                                Our Campus
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                                Visit Us <span className="text-transparent bg-clip-text gradient-text">Today</span>
                            </h2>
                            <p className="text-lg text-slate-600 max-w-xl font-medium">
                                Our state-of-the-art campus is designed to provide an inspiring environment for learning and growth.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            {/* Address */}
                            <div className="group space-y-3">
                                <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-slate-900">Main Campus</h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    123 Academic Square, Elite Education Hub,<br />
                                    Sector 45, New Delhi - 110001
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="group space-y-3">
                                <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-slate-900">Reach Out</h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    +91 (11) 4567 8900<br />
                                    info@institute.com
                                </p>
                            </div>

                            {/* Email */}
                            <div className="group space-y-3">
                                <div className="h-12 w-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-slate-900">Admissions</h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    admission@institute.com<br />
                                    careers@institute.com
                                </p>
                            </div>

                            {/* Hours */}
                            <div className="group space-y-3">
                                <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-slate-900">Working Hours</h3>
                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                    Mon - Sat: 9:00 AM - 8:00 PM<br />
                                    Sun: Closed
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button size="lg" className="rounded-full bg-slate-900 text-white hover:bg-slate-800 px-8 h-14 font-semibold shadow-xl shadow-slate-200">
                                Get Directions
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Right Content: Modern Map */}
                    <div className="relative animate-in fade-in slide-in-from-right-8 duration-700">
                        {/* Map Frame Decor */}
                        <div className="absolute -inset-4 bg-linear-to-tr from-indigo-500/10 to-violet-500/10 blur-2xl -z-10 rounded-[40px]" />

                        <div className="relative aspect-4/3 w-full rounded-[32px] overflow-hidden border-8 border-white shadow-2xl shadow-indigo-500/10 bg-slate-100 group">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114827188884!2d77.20651718715822!3d28.6289201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b7496677%3A0xd54736245adcf18!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
                                className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps Location"
                            />

                            {/* Floating Map Label */}
                            <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-white/20 z-10 transition-transform group-hover:scale-105">
                                <div className="h-2 w-2 rounded-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Prime Location</span>
                            </div>
                        </div>

                        {/* Floating Image Shortcut */}
                        <div className="absolute -bottom-6 -right-6 hidden sm:block">
                            <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 space-y-2 animate-bounce duration-4000">
                                <div className="h-20 w-32 rounded-2xl bg-slate-200 overflow-hidden relative">
                                    {/* This would be an office image */}
                                    <div className="absolute inset-0 bg-linear-to-br from-indigo-500/20 to-violet-500/20" />
                                    <div className="h-full w-full flex items-center justify-center">
                                        <Building2 className="h-8 w-8 text-slate-400" />
                                    </div>
                                </div>
                                <p className="text-[10px] font-bold text-center text-slate-500 uppercase tracking-tighter">View Campus Photo</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
