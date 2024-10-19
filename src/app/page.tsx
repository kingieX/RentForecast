"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter(); // Use useRouter for navigation

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize animation on scroll
  }, []);

  const handleSignUp = () => {
    // redirect to sign up page
    router.push("/signup"); // Use router.push instead of navigate
  };

  const handleLearnMore = () => {
    router.push("/learn-more");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2" data-aos="fade-right">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Rent Forecast
            </h1>
            <p className="text-lg mb-6">
              Accurate rent forecasts for properties in the Abakaliki
              metropolis. Make smarter rental decisions with data-driven
              insights.
            </p>
            <Button
              onClick={handleSignUp}
              className="bg-white text-blue-500 hover:bg-blue-500 hover:border-white hover:border hover:text-white transition duration-300 px-6 py-3 rounded-lg font-semibold"
            >
              Get Started
            </Button>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0" data-aos="fade-left">
            <img
              src="https://unsplash.com/photos/outdoor-lamps-turned-on-XbwHrt87mQ0"
              alt="Rent Forecast"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-16" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          What is Rent Forecast?
        </h2>
        <p className="text-lg text-gray-600 text-center mb-6 max-w-3xl mx-auto">
          Rent Forecast is a powerful tool designed to provide accurate rent
          predictions for properties. Whether you are a landlord, tenant, or
          investor, our system offers valuable insights into future rental
          values based on historical trends, market analysis, and local data.
          Get personalized forecasts and discover market trends in the Abakaliki
          metropolis.
        </p>
        <div className="flex justify-center">
          <Button
            onClick={handleLearnMore}
            className="bg-blue-500 text-white hover:border-blue-500 hover:border hover:text-blue-500 hover:bg-white transition duration-300 px-6 py-3 rounded-lg font-semibold"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-100 py-16" data-aos="fade-up">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">
            Ready to forecast rents?
          </h3>
          <p className="text-gray-700 mb-6">
            Sign up today and start making informed decisions with our
            state-of-the-art rent forecast system.
          </p>
          <Button
            onClick={handleSignUp}
            className="bg-blue-500 text-white hover:border-blue-500 hover:border hover:text-blue-500 hover:bg-white transition duration-300 px-6 py-3 rounded-lg font-semibold"
          >
            Sign Up Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
