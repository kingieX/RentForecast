"use client";
import { useEffect } from "react";
import {
  FaSearchLocation,
  FaChartLine,
  FaHome,
  FaComments,
  FaQuestionCircle,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LearnMore() {
  const router = useRouter();

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS for animations
  }, []);

  const handleSignUp = () => {
    // redirect to sign up page
    router.push("/signup"); // Use router.push instead of navigate
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Learn More About Rent Forecast
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Discover how our system can help you make informed rental decisions
            in the Abakaliki metropolis using data-driven insights.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {/* Feature 1: Rent Forecast Search */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg text-center"
            data-aos="fade-right"
          >
            <FaSearchLocation className="text-blue-500 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Rent Forecast Search
            </h3>
            <p className="text-gray-600 mt-4">
              Input your property details and get accurate rental price
              predictions based on local trends and market data.
            </p>
          </div>

          {/* Feature 2: Dashboard */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg text-center"
            data-aos="fade-up"
          >
            <FaChartLine className="text-blue-500 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Personalized Dashboard
            </h3>
            <p className="text-gray-600 mt-4">
              View personalized insights, track your forecasts, and explore the
              latest market trends in real-time.
            </p>
          </div>

          {/* Feature 3: Property Listings */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg text-center"
            data-aos="fade-left"
          >
            <FaHome className="text-blue-500 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Property Listings
            </h3>
            <p className="text-gray-600 mt-4">
              Access a comprehensive list of properties in Abakaliki, integrated
              with real-time rent forecast data.
            </p>
          </div>

          {/* Feature 4: Historical Data Viewer */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg text-center"
            data-aos="fade-right"
          >
            <FaChartLine className="text-blue-500 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Historical Data Viewer
            </h3>
            <p className="text-gray-600 mt-4">
              Analyze past rent trends and compare historical data with current
              market forecasts.
            </p>
          </div>

          {/* Feature 5: User Feedback System */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg text-center"
            data-aos="fade-up"
          >
            <FaComments className="text-blue-500 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800">
              User Feedback System
            </h3>
            <p className="text-gray-600 mt-4">
              Provide feedback on properties and share your experience with
              other users to help improve the platform.
            </p>
          </div>

          {/* Feature 6: Help & Support */}
          <div
            className="p-8 bg-white rounded-lg shadow-lg text-center"
            data-aos="fade-left"
          >
            <FaQuestionCircle className="text-blue-500 text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-800">
              Help & Support
            </h3>
            <p className="text-gray-600 mt-4">
              Access guides, FAQs, and customer support to help you navigate the
              system and make the most out of its features.
            </p>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Forecast Your Rent?
          </h3>
          <p className="text-lg text-gray-200 mb-6">
            Sign up today and start making smarter rental decisions!
          </p>
          <Button
            onClick={handleSignUp}
            className="bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
