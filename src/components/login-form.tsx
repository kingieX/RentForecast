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

export function LoginForm() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto w-full max-w-md p-8 bg-white rounded-lg lg:shadow-lg lg:border border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-500 text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your email and password below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <Link href="#" className="text-sm text-blue-500 underline">
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="border-2 border-gray-300 focus:ring focus:ring-blue-500 rounded-lg px-4 py-2"
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded-lg py-3 font-semibold"
            >
              Login
            </Button>

            {/* Google Login Button */}
            {/* <Button
              variant="outline"
              className="w-full bg-white text-blue-500 border-blue-500 hover:bg-blue-50 transition duration-300 rounded-lg py-3 font-semibold"
            >
              Login with Google
            </Button> */}
          </div>

          {/* Sign-up Link */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
