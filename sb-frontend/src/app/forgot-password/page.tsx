"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

type Props = {}

export default function ForgotPassword({ }: Props) {
    const [email, setEmail] = useState('');
    const [errorVisible, setErrorVisible] = useState(false);
    const [successVisible, setSuccessVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const validateEmail = (email: string) => {
        const re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
        return re.test(email);
      };
    
      const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
    
        if (!validateEmail(email)) {
          setErrorVisible(true);
          setLoading(false);
          return;
        }
    
        try {
          const response = await fetch('http://localhost:1337/api/Auth/PasswordRecovery', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserName: email }),
          });
    
          if (response.ok) {
            setSuccessVisible(true);
            setTimeout(() => {
              router.push('/login');
            }, 3000);
          } else {
            setErrorVisible(true);
          }
        } catch (error) {
          setErrorVisible(true);
        } finally {
          setLoading(false);
        }
      };
    
      return (
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm mx-auto max-w-sm mt-20 mb-20">
        <Card className="w-full max-w-sm p-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Forgot Password</CardTitle>
            <CardDescription className="text-sm text-gray-600 mt-1">
              Enter your email address to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-2 border rounded-md ${
                    errorVisible ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errorVisible && (
                  <p className="text-red-600 text-sm">Invalid email address.</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </CardContent>
          <div className="mt-4 text-center text-sm">
            <p className="text-gray-600">
              Remembered your password?{' '}
              <a href="/login" className="underline text-blue-600 hover:text-blue-700">
                Sign in
              </a>
            </p>
          </div>
              </Card>
        {successVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <p className="text-lg mb-4">Password reset link sent. Redirecting...</p>
              <button
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                onClick={() => setSuccessVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {errorVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg text-center">
              <p className="text-lg mb-4">An error occurred. Please try again.</p>
              <button
                className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300"
                onClick={() => setErrorVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      );
    };