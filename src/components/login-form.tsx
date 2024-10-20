"use client";
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
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import qs from "qs";

// Environment variable for the base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function LoginForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        // Step 1: Authenticate user
        const authResponse = await axios.post(
          `${BASE_URL}/user/authenticate`,
          qs.stringify({
            grant_type: "password",
            username: values.username,
            password: values.password,
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const { user_id, access_token } = authResponse.data;
        Cookies.set("user_id", user_id);
        Cookies.set("access_token", access_token);

        // Step 2: Fetch user details using user_id
        const userDetailsResponse = await axios.get(
          `${BASE_URL}/user/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        // Store user details in cookies
        const { fullname, email } = userDetailsResponse.data;
        Cookies.set("fullname", fullname);
        Cookies.set("email", email);

        setSuccessMessage("Login successful!");

        // Step 3: Redirect to dashboard
        setTimeout(() => {
          router.push("/dashboard/rent-forecast");
        }, 2000);
      } catch (error: any) {
        console.error("Error logging in:", error);
        if (error.response && error.response.data) {
          setErrorMessage(
            error.response.data.message ||
              "Something went wrong, please try again."
          );
        } else {
          setErrorMessage("Something went wrong, please try again.");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="mx-auto w-full max-w-md p-8 bg-white rounded-lg lg:shadow-lg lg:border border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-500 text-center">
            Login to continue
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your email and password below to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="grid gap-6">
            {/* Username Input */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email
              </Label>
              <Input
                id="username"
                name="username"
                type="email"
                placeholder="m@example.com"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-2 ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring focus:ring-blue-500 rounded-lg px-4 py-2`}
              />
              {formik.touched.username && formik.errors.username && (
                <p className="text-red-500 text-sm">{formik.errors.username}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="grid gap-2 relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-500 underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring focus:ring-blue-500 rounded-lg px-4 py-2`}
              />
              <div
                className="absolute top-9 right-4 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded-lg py-3 font-semibold"
            >
              {isLoading ? "Logging In..." : "Login"}
            </Button>

            {/* Success and Error Messages */}
            {successMessage && (
              <p className="text-green-500 text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          </form>

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
