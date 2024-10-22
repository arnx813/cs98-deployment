"use client"

import { Link, Navigate, useNavigate } from "react-router-dom"
import * as React from "react"


import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Icons } from "./icons"


export function LoginForm() {

  const [isLoading, setIsLoading] = React.useState(false)
  const [isGLoading, setIsGLoading] = React.useState(false)
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      navigate('/discover')
    }, 3000)
  }

  const handleGoogleLogin = () => {
    setIsGLoading(true);

    // Simulate Google login process (e.g., redirect to OAuth, API call)
    setTimeout(() => {
      console.log('Redirecting to Google login...');
      // Example: window.location.href = 'https://accounts.google.com/signin';

      // Simulate login process completion
      setIsGLoading(false);
    }, 3000); // Simulate a 3-second delay
  };

  return (
      <div>
      <form onSubmit={onSubmit}>

        <Card className="mx-auto max-w-sm ">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-left">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    disabled={isLoading || isGLoading}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link to="#" className="ml-auto inline-block text-sm underline text-foreground hover:text-card-foreground">
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" disabled={isGLoading || isLoading} type="password" required />
                </div>
                <Button type="submit" disabled={isGLoading || isLoading} className="w-full hover:border-input">
                  Login
                  {isLoading && (
                <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
                </Button>
                <Button type="button" disabled={isGLoading || isLoading} variant="outline" className="w-full hover:border-input" onClick={handleGoogleLogin}>
                  {isGLoading && (<Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />)}
                  
                  <Icons.Google className="mr-2 h-4 w-4" />
                 
                  Login with Google
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/" className="underline text-card-foreground hover:text-card-foreground">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    // </div>
  )
}