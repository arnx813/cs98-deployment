"use client"

import * as React from "react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Icons } from "../icons"



export function UserAuthForm({ className, ...props }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isGLoading, setIsGLoading] = React.useState(false)

  async function onSubmit(event) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  const handleGoogleLogin = () => {
    setIsGLoading(true); // Activate spinner

    // Simulate Google login process (e.g., redirect to OAuth, API call)
    setTimeout(() => {
      // Here, you would typically redirect to the Google login page or handle the login logic
      console.log('Redirecting to Google login...');
      // Example: window.location.href = 'https://accounts.google.com/signin';

      // Simulate login process completion
      setIsGLoading(false);
    }, 3000); // Simulate a 3-second delay
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label className="text-left" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGLoading}
              required
            />
          </div>
          <div className="grid gap-2">
              <Label className="text-left" htmlFor="password">
                Password
              </Label>
              <Input id="password" type="password" disabled={isGLoading || isLoading} required />
          </div>

          <Button className="hover:border-none" disabled={isGLoading}>
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or Sign-up with
          </span>
        </div>
      </div>
      <Button variant="outline" disabled={isGLoading || isLoading} className="hover:border-input " onClick={handleGoogleLogin}>
      {/* {isGLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)} */}
        {isGLoading ? (
          <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.Google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
}