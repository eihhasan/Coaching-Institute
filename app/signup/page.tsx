'use client';

import React from "react"
import { useState } from 'react';
import { useAuth } from '@/app/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertCircle, GraduationCap, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, name);
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />

      <main className="grow flex items-center justify-center py-16 px-4 bg-muted/20">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">

          <div className="text-center mb-8 space-y-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg mb-2">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Create Account</h1>
            <p className="text-xs text-muted-foreground">Join our institute and start your academic journey today.</p>
          </div>

          <Card className="bg-card border-border/50 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="space-y-1 text-center pt-8 pb-4">
              <CardTitle className="text-xl font-bold">Sign Up</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0 pb-8 px-8">
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {error && (
                  <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 flex gap-2 animate-in slide-in-from-top-2">
                    <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="text-xs text-destructive font-semibold">{error}</p>
                  </div>
                )}

                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-xs font-bold text-foreground">FULL NAME</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="h-11 bg-background border-border rounded-lg text-sm focus:ring-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold text-foreground">EMAIL ADDRESS</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="h-11 bg-background border-border rounded-lg text-sm focus:ring-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-bold text-foreground">PASSWORD</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-11 bg-background border-border rounded-lg text-sm focus:ring-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="text-xs font-bold text-foreground">CONFIRM PASSWORD</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="h-11 bg-background border-border rounded-lg text-sm focus:ring-primary"
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full h-11 text-sm font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" disabled={isLoading}>
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </div>
              </form>

              <div className="text-center pt-2">
                <p className="text-xs text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login" className="font-bold text-primary hover:underline">
                    Log In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-8 text-center text-[10px] text-muted-foreground flex items-center justify-center gap-2">
            <ShieldCheck className="h-3 w-3 text-green-500" /> Secure SSL Encrypted Registration
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
