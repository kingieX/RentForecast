/* eslint-disable */
"use client";
import { useEffect } from "react";
import {
  FaQuestionCircle,
  FaBook,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HelpSupport() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSignUp = () => {
    // redirect to sign up page
    router.push("/signup"); // Use router.push instead of navigate
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white">
      <div className="container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Help & Support
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We're here to help! Explore our guides, FAQs, or get in touch with
            our support team to resolve any issues.
          </p>
        </div>

        {/* Help & Support Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {/* Section 1: FAQs */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg text-center"
            data-aos="fade-right"
          >
            <FaQuestionCircle className="text-blue-500 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600 mt-4">
              Find answers to the most common questions about our rent forecast
              system.
            </p>
            <Button className="bg-blue-500 text-white mt-4 px-4 py-2 rounded-lg hover:border border-blue-500 hover:text-blue-500 transition duration-300">
              Browse FAQs
            </Button>
          </div>

          {/* Section 2: User Guides */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg text-center"
            data-aos="fade-up"
          >
            <FaBook className="text-blue-500 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800">
              User Guides
            </h3>
            <p className="text-gray-600 mt-4">
              Detailed guides to help you navigate and make the most out of our
              platform.
            </p>
            <Button className="bg-blue-500 text-white px-4 py-2 mt-8 rounded-lg hover:border border-blue-500 hover:text-blue-500 transition duration-300">
              View Guides
            </Button>
          </div>

          {/* Section 3: Customer Support */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg text-center"
            data-aos="fade-left"
          >
            <FaPhoneAlt className="text-blue-500 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Contact Customer Support
            </h3>
            <p className="text-gray-600 mt-4">
              Need more help? Reach out to our support team via phone or email
              for assistance.
            </p>
            <div className="mt-6">
              <div className="flex items-center justify-center mb-4">
                <FaPhoneAlt className="text-blue-500 mr-2" />
                <span className="text-gray-700">+234-800-123-4567</span>
              </div>
              <div className="flex items-center justify-center">
                <FaEnvelope className="text-blue-500 mr-2" />
                <span className="text-gray-700">support@rentforecast.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
          <p className="text-lg text-gray-300 mb-6">
            Feel free to get in touch with us anytime. We’re here to help you
            with your rental forecasting journey!
          </p>
          <Button
            className="bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 px-6 py-3 rounded-lg font-semibold"
            onClick={handleSignUp}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
