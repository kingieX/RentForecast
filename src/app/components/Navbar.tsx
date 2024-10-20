"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for menu toggle
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter(); // Use useRouter for navigation
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignIn = () => {
    // redirect to sign up page
    router.push("/login"); // Use router.push instead of navigate
  };

  return (
    <nav className="fixed w-full z-50 bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* App Name */}
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">RentForecast</Link>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link
            href="/dashboard/rent-forecast"
            className="text-gray-700 hover:text-blue-600"
          >
            Forecast price
          </Link>
          <Link
            href="/property-listing"
            className="text-gray-700 hover:text-blue-600"
          >
            Property Listings
          </Link>
          <Link
            href="/help-support"
            className="text-gray-700 hover:text-blue-600"
          >
            Help & Support
          </Link>
        </div>

        {/* Sign In Button */}
        <div className="hidden md:block">
          <Button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:border border-blue-500 hover:text-blue-500 transition duration-300"
          >
            Sign In
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 py-4 space-y-4">
          <Link href="/" className="block text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link
            href="/dashboard/rent-forecast"
            className="block text-gray-700 hover:text-blue-600"
          >
            Forecast price
          </Link>
          <Link
            href="/property-listing"
            className="block text-gray-700 hover:text-blue-600"
          >
            Property Listings
          </Link>
          <Link
            href="/help-support"
            className="block text-gray-700 hover:text-blue-600"
          >
            Help & Support
          </Link>
          <Button
            onClick={handleSignIn}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
          >
            Sign In
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
