"use client"
import Link from "next/link"
import React, { FormEventHandler, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'

interface Errors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const router = useRouter()

  const validateEmail = (email : string) => {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
    return re.test(email)
  }

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email format",
      }))
      setSubmitDisabled(true)
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }))
      setSubmitDisabled(false)
    }
  }

  const handlePasswordBlur = () => {
    if (password.length < 5) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 5 characters",
      }))
      setSubmitDisabled(true)
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }))
      setSubmitDisabled(false)
    }
  }

  const handleConfirmPasswordBlur = () => {
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }))
      setSubmitDisabled(true)
    } else {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "",
      }))
      setSubmitDisabled(false)
    }
  }

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!termsAccepted) {
      setErrors((prev) => ({
        ...prev,
        terms: "You must accept the terms and conditions",
      }))
      return
    } else {
      setErrors((prev) => ({
        ...prev,
        terms: "",
      }))
    }

    if (submitDisabled) {
      return
    }

    try {
      const response = await fetch("http://localhost:1337/api/Auth/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ UserName: email, Password: password }),
      })

      if (response.ok) {
        alert("Registration successful! Redirecting to login page...")
        setTimeout(() => {
          router.push('/login')
        }, 8000)
      } else {
        alert("Registration failed. Please try again.")
      }
    } catch (error) {
      alert("An error occurred. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
    <Card className="mx-auto max-w-sm mt-20 mb-20">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                required
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email}</p>
              )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePasswordBlur}
                required 
              />
              {errors.password && (
                <p className="text-red-600 text-sm">{errors.password}</p>
              )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onBlur={handleConfirmPasswordBlur}
                required
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">
                  {errors.confirmPassword}
                </p>
              )}
          </div>
            <div className="flex items-center space-x-2">
            <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </Label>
            </div>
            {errors.terms && (
              <p className="text-red-600 text-sm">{errors.terms}</p>
            )}

              <p className="text-sm text-muted-foreground">
                You agree to our&nbsp;
                <a
                  href="/legal/legal.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 underline"
                >
                  Terms of Service.
                </a>
              </p>
            <Button
              type="submit"
              className="w-full"
              disabled={submitDisabled || !termsAccepted}
            >
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
      </Card>
      </form>
  )
}
