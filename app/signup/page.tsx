import Link from "next/link"
import { Triangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { GitlabIcon, GithubIcon as Bitbucket, Mail } from "lucide-react"

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Triangle className="h-5 w-5 fill-black" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
            Contact
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            Log In
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign Up for Roppita</h1>
            <p className="text-sm text-gray-600 mt-2">Create your account to get started</p>
          </div>

          <div className="space-y-4">
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
              <Mail className="h-5 w-5" />
              <span>Continue with Email</span>
            </Button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
