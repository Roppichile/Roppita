import Link from "next/link"
import { Triangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Triangle className="h-5 w-5 fill-black" />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            Log In
          </Link>
          <Link href="/signup" className="text-sm text-gray-600 hover:text-gray-900">
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Contact Us</h1>
            <p className="text-sm text-gray-600 mt-2">We'd love to hear from you</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>
              <Input id="name" placeholder="Your name" />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="Your email" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea id="message" placeholder="Your message" rows={5} />
            </div>

            <Button className="w-full">Send Message</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
