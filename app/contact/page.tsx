'use client';

import React from "react"
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="grow">

        {/* Header Section */}
        <section className="relative py-12 md:py-20 bg-muted/30">
          <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
            <Badge variant="secondary" className="px-3 py-0.5 text-xs font-bold text-primary border-primary/10">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
              Have questions about our coaching programs? Our team is here to guide your academic journey.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

              {/* Contact Info Cards */}
              <div className="lg:col-span-1 space-y-4 animate-in fade-in slide-in-from-left-4 duration-700">
                {[
                  { icon: MapPin, title: 'Visit Us', detail: '123 Education Hub, Knowledge Park, New Delhi' },
                  { icon: Phone, title: 'Call Us', detail: '+91 98765 43210' },
                  { icon: Mail, title: 'Email Us', detail: 'info@coachinginstitute.com' },
                  { icon: Clock, title: 'Hours', detail: 'Mon - Sat: 8:00 AM - 8:00 PM' },
                ].map((item, i) => (
                  <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6 flex gap-4 items-start">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-foreground">{item.title}</div>
                        <div className="text-xs text-muted-foreground leading-relaxed">{item.detail}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 animate-in fade-in slide-in-from-right-4 duration-700">
                <Card className="h-full border-border/50 shadow-sm rounded-2xl p-6 sm:p-8 md:p-12">
                  <div className="space-y-8">
                    <div className="space-y-2 text-left">
                      <h2 className="text-2xl font-bold tracking-tight text-foreground">Send a Message</h2>
                      <p className="text-sm text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
                    </div>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-xs font-bold text-foreground">FIRST NAME</Label>
                          <Input id="firstName" placeholder="eg. Rohan" className="h-11 bg-background border-border focus:ring-primary rounded-lg text-sm" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-xs font-bold text-foreground">LAST NAME</Label>
                          <Input id="lastName" placeholder="eg. Sharma" className="h-11 bg-background border-border focus:ring-primary rounded-lg text-sm" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-xs font-bold text-foreground">EMAIL ADDRESS</Label>
                          <Input id="email" type="email" placeholder="rohan@example.com" className="h-11 bg-background border-border focus:ring-primary rounded-lg text-sm" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-xs font-bold text-foreground">PHONE NUMBER</Label>
                          <Input id="phone" type="tel" placeholder="+91 98765 43210" className="h-11 bg-background border-border focus:ring-primary rounded-lg text-sm" />
                        </div>
                      </div>

                      <div className="space-y-2 text-left">
                        <Label htmlFor="message" className="text-xs font-bold text-foreground">MESSAGE</Label>
                        <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px] bg-background border-border focus:ring-primary rounded-xl text-sm" />
                      </div>

                      <Button className="w-full h-12 text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2">
                        Send Message <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
