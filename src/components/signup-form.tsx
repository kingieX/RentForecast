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

// Environment variable for the base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function SignUpForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full name is required"),
    phone_no: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm your password"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      fullname: "",
      phone_no: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true); // Set loading state to true
      try {
        // API request to register the user
        const response = await axios.post(`${BASE_URL}/user/register`, {
          fullname: values.fullname,
          phone_no: values.phone_no,
          email: values.email,
          password: values.password,
          role: "user", // Assume a default role for now
          is_active: true,
          provider: null,
          provider_id: null,
          avatar_url: null,
        });

        // Store user data in cookies (user_id and fullname)
        const { user_id, fullname } = response.data;
        Cookies.set("user_id", user_id);
        Cookies.set("fullname", fullname);

        // Set success message
        setSuccessMessage("Account created successfully!");

        // Redirect to another page after successful signup
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } catch (error: any) {
        console.error("Error signing up:", error);
        // Handle the error (e.g., show an error message)
        if (error.response && error.response.data) {
          setErrorMessage(
            error.response.data.message ||
              "Something went wrong, please try again."
          );
        } else {
          setErrorMessage("Something went wrong, please try again.");
        }
      } finally {
        setIsLoading(false); // Set loading state back to false
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
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
          <form onSubmit={formik.handleSubmit} className="grid gap-6">
            {/* Full Name Input */}
            <div className="grid gap-2">
              <Label htmlFor="fullname" className="text-sm font-semibold">
                Full Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Enter your fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-2 ${
                  formik.touched.fullname && formik.errors.fullname
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring focus:ring-blue-500 rounded-lg px-4 py-2`}
              />
              {formik.touched.fullname && formik.errors.fullname && (
                <p className="text-red-500 text-sm">{formik.errors.fullname}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="grid gap-2">
              <Label htmlFor="phone_no" className="text-sm font-semibold">
                Phone Number
              </Label>
              <Input
                id="phone_no"
                name="phone_no"
                type="tel"
                placeholder="+234 903-000-0000"
                value={formik.values.phone_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-2 ${
                  formik.touched.phone_no && formik.errors.phone_no
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring focus:ring-blue-500 rounded-lg px-4 py-2`}
              />
              {formik.touched.phone_no && formik.errors.phone_no && (
                <p className="text-red-500 text-sm">{formik.errors.phone_no}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring focus:ring-blue-500 rounded-lg px-4 py-2`}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="grid gap-2 relative">
              <Label htmlFor="password" className="text-sm font-semibold">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
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

            {/* Confirm Password Input */}
            <div className="grid gap-2 relative">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-semibold"
              >
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-2 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:ring focus:ring-blue-500 rounded-lg px-4 py-2`}
              />
              <div
                className="absolute top-9 right-4 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </div>
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              disabled={isLoading} // Disable button when loading
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded-lg py-3 font-semibold"
            >
              {isLoading ? "Signing Up..." : "Sign Up"}{" "}
              {/* Show loading text */}
            </Button>

            {/* Success and Error Messages */}
            {successMessage && (
              <p className="text-green-500 text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          </form>

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
