"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { GitlabIcon, GithubIcon as Bitbucket, KeyRound, LockKeyhole } from "lucide-react"

export default function LoginForm() {
  const [isEmailFormVisible, setIsEmailFormVisible] = useState(false)

  const showEmailForm = () => {
    setIsEmailFormVisible(true)
  }

  return (
    <div className="space-y-4">
      {!isEmailFormVisible ? (
        <>
          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-gray-300">
            <GitHubLogoIcon className="h-5 w-5" />
            <span>Continue with GitHub</span>
          </Button>

          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-gray-300">
            <GitlabIcon className="h-5 w-5" />
            <span>Continue with GitLab</span>
          </Button>

          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-gray-300">
            <Bitbucket className="h-5 w-5" />
            <span>Continue with Bitbucket</span>
          </Button>

          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-gray-300">
            <LockKeyhole className="h-5 w-5" />
            <span>Continue with SAML SSO</span>
          </Button>

          <Button variant="outline" className="w-full py-6 flex items-center justify-center gap-2 border-gray-300">
            <KeyRound className="h-5 w-5" />
            <span>Login with Passkey</span>
          </Button>

          <div className="text-center mt-4">
            <button onClick={showEmailForm} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Continue with Email →
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <Button className="w-full">Log In</Button>
          <div className="text-center">
            <button
              onClick={() => setIsEmailFormVisible(false)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to all login options
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
