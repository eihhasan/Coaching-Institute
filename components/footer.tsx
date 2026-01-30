'use client';

import React from "react"
import Link from 'next/link';
import { Sparkles, Mail, Phone, MapPin, ArrowUp, Facebook, Twitter, Instagram, Linkedin, Youtube, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-foreground to-black text-white mt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">Coaching</span>
                <span className="text-xl font-bold tracking-tight text-primary ml-1">Institute</span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Empowering students through quality education, expert mentorship, and a structured learning approach since 2000.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="h-10 w-10 rounded-xl bg-white/5 hover:bg-primary text-white/60 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Programs</h4>
            <ul className="space-y-3">
              {['JEE Preparation', 'Medical Foundations', 'Board Excellence', 'Junior Science', 'Math Olympiad'].map((item) => (
                <li key={item}>
                  <Link
                    href="/courses"
                    className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary/50 group-hover:w-2 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {['Our Story', 'Faculty', 'Admissions', 'Careers', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link
                    href="/about"
                    className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="h-1 w-1 rounded-full bg-primary/50 group-hover:w-2 transition-all"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex gap-4 items-start group">
                <div className="h-10 w-10 rounded-xl bg-white/5 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/80 font-medium">Address</div>
                  <div className="text-sm text-white/50">123 Education Hub, New Delhi, India</div>
                </div>
              </div>
              <div className="flex gap-4 items-start group">
                <div className="h-10 w-10 rounded-xl bg-white/5 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/80 font-medium">Phone</div>
                  <div className="text-sm text-white/50">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex gap-4 items-start group">
                <div className="h-10 w-10 rounded-xl bg-white/5 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-sm text-white/80 font-medium">Email</div>
                  <div className="text-sm text-white/50">info@coachinginstitute.com</div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/50 flex items-center gap-1">
            © 2025 Coaching Institute. Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> in India
          </p>
          <div className="flex gap-8">
            <Link href="#" className="text-sm text-white/50 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-white/50 hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-110 transition-all duration-300 z-50"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
}

export default Footer;
