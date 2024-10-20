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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

// Environment variable for the base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function ChangePassword() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    new_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("new_password"), undefined], "Passwords must match")
      .required("Confirm your new password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      new_password: "",
      confirmNewPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/user/change-password`, {
          email: values.email,
          new_password: values.new_password,
        });

        setSuccessMessage("Password changed successfully!");
        setTimeout(() => {
          router.push("/login"); // Redirect to login page or another page
        }, 2000);
      } catch (error: any) {
        console.error("Error changing password:", error);
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
    <div className="min-h-screen flex items-center justify-center pt-20">
      <Card className="mx-auto w-full max-w-md p-8 bg-white rounded-lg lg:shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-blue-500 text-center">
            Change Password
          </CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your email and new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="grid gap-6">
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

            {/* New Password Input */}
            <div className="grid gap-2 relative">
              <Label htmlFor="newPassword" className="text-sm font-semibold">
                New Password
              </Label>
              <Input
                id="new_password"
                name="new_password"
                type={showPassword ? "text" : "password"}
                value={formik.values.new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-2 ${
                  formik.touched.new_password && formik.errors.new_password
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
              {formik.touched.new_password && formik.errors.new_password && (
                <p className="text-red-500 text-sm">
                  {formik.errors.new_password}
                </p>
              )}
            </div>

            {/* Confirm New Password Input */}
            <div className="grid gap-2 relative">
              <Label
                htmlFor="confirmNewPassword"
                className="text-sm font-semibold"
              >
                Confirm New Password
              </Label>
              <Input
                id="confirmNewPassword"
                name="confirmNewPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formik.values.confirmNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`border-2 ${
                  formik.touched.confirmNewPassword &&
                  formik.errors.confirmNewPassword
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
              {formik.touched.confirmNewPassword &&
                formik.errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm">
                    {formik.errors.confirmNewPassword}
                  </p>
                )}
            </div>

            {/* Change Password Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded-lg py-3 font-semibold"
            >
              {isLoading ? "Changing Password..." : "Change Password"}
            </Button>

            {/* Success and Error Messages */}
            {successMessage && (
              <p className="text-green-500 text-center">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            Remembered your password?{" "}
            <Link href="/login" className="text-blue-500 underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ChangePassword;
