"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaHome,
  FaMapMarkerAlt,
  FaDollarSign,
  FaBuilding,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  type: string;
  image: string;
}

export default function PropertyListings() {
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Luxury Apartment",
      location: "Abakaliki, Ebonyi",
      price: "$1200/month",
      type: "Apartment",
      image: "https://source.unsplash.com/random/400x300/?apartment",
    },
    {
      id: 2,
      title: "Cozy Bungalow",
      location: "Ezzamgbo, Ebonyi",
      price: "$850/month",
      type: "Bungalow",
      image: "https://source.unsplash.com/random/400x300/?house",
    },
    {
      id: 3,
      title: "Modern Office Space",
      location: "Mile 50, Abakaliki",
      price: "$1500/month",
      type: "Office",
      image: "https://source.unsplash.com/random/400x300/?office",
    },
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-20">
        {/* Header Section */}
        <div className="text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Available Property Listings
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the available rental properties in Abakaliki Metropolis.
            Find your perfect home or office space today!
          </p>
        </div>

        {/* Property Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
          {properties.map((property) => (
            <div
              key={property.id}
              className="p-6 bg-white rounded-lg shadow-lg transition-transform hover:scale-105"
              data-aos="fade-up"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {property.title}
                </h3>
                <div className="flex items-center mt-2">
                  <FaMapMarkerAlt className="text-blue-500 mr-2" />
                  <span className="text-gray-600">{property.location}</span>
                </div>
                <div className="flex items-center mt-2">
                  <FaDollarSign className="text-blue-500 mr-2" />
                  <span className="text-gray-600">{property.price}</span>
                </div>
                <div className="flex items-center mt-2">
                  <FaBuilding className="text-blue-500 mr-2" />
                  <span className="text-gray-600">{property.type}</span>
                </div>
                <Button className="mt-6 w-full bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-lg">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Property */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <h3 className="text-2xl font-bold mb-4">
            Want to list your property?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Add your property to our listings and reach thousands of potential
            tenants.
          </p>
          <Button
            className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 px-6 py-3 rounded-lg font-semibold"
            // href="/property-listing/add"
          >
            Add New Property
          </Button>
        </div>
      </div>
    </div>
  );
}
