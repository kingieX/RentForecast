import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignUpForm() {
  return (
    <div className="min-h-screen  flex items-center justify-center pt-20">
      <Card className="mx-auto w-full max-w-md p-8 bg-white rounded-lg lg:shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-500 text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Create a new account by filling in your details below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {/* Full Name Input */}
            <div className="grid gap-2">
              <Label htmlFor="full-name" className="text-sm font-semibold">
                Full Name
              </Label>
              <Input
                id="full-name"
                type="text"
                placeholder="Enter your fullname"
                required
                className="border-2 border-gray-300 focus:ring focus:ring-blue-500 rounded-lg px-4 py-2"
              />
            </div>

            {/* Email Input */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="border-2 border-gray-300 focus:ring focus:ring-blue-500 rounded-lg px-4 py-2"
              />
            </div>

            {/* Password Input */}
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm font-semibold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="border-2 border-gray-300 focus:ring focus:ring-blue-500 rounded-lg px-4 py-2"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="grid gap-2">
              <Label
                htmlFor="confirm-password"
                className="text-sm font-semibold"
              >
                Confirm Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                required
                className="border-2 border-gray-300 focus:ring focus:ring-blue-500 rounded-lg px-4 py-2"
              />
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded-lg py-3 font-semibold"
            >
              Sign Up
            </Button>

            {/* Google Sign Up Button */}
            {/* <Button
              variant="outline"
              className="w-full bg-white text-blue-500 border-blue-500 hover:bg-blue-50 transition duration-300 rounded-lg py-3 font-semibold"
            >
              Sign Up with Google
            </Button> */}
          </div>

          {/* Log In Link */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
