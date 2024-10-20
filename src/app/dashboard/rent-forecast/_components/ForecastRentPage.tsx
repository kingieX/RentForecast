"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FaBed,
  FaBath,
  FaToilet,
  FaDoorOpen,
  FaDollarSign,
} from "react-icons/fa"; // Icons for inputs
import { motion } from "framer-motion"; // For animation

const ForecastRentPage = () => {
  const [formData, setFormData] = useState({
    bedrooms: 1,
    bathrooms: 1,
    toilets: 1,
    total_rooms: 1,
  });
  const [loading, setLoading] = useState(false);
  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPredictedPrice(null);

    try {
      const { bedrooms, bathrooms, toilets, total_rooms } = formData;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/forecast/?bedrooms=${bedrooms}&bathrooms=${bathrooms}&toilets=${toilets}&total_rooms=${total_rooms}`
      );

      // Extracting the numeric value from the response
      const priceString = response.data.predicted_price;
      const numericPrice = parseFloat(priceString.replace("₦", "").trim());

      setPredictedPrice(numericPrice);
      setShowForm(false); // Hide the form after successful prediction
    } catch (error) {
      setError("Failed to fetch the forecast. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset form and predictions
  const handlePredictAnother = () => {
    setShowForm(true);
    setPredictedPrice(null);
    setFormData({ bedrooms: 1, bathrooms: 1, toilets: 1, total_rooms: 1 });
  };

  // Currency formatter function
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <div className="container mx-auto p-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-6">
        Forecast Rent Estimate
      </h1>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 max-w-md mx-auto bg-white shadow-md p-6 rounded-md"
        >
          {/* Bedrooms */}
          <div className="flex items-center space-x-2">
            <FaBed className="text-xl text-blue-500" />
            <Label htmlFor="bedrooms" className="text-right w-full">
              Bedrooms
            </Label>
            <Input
              type="number"
              name="bedrooms"
              id="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="flex-grow"
            />
          </div>

          {/* Bathrooms */}
          <div className="flex items-center space-x-2">
            <FaBath className="text-xl text-blue-500" />
            <Label htmlFor="bathrooms" className="text-right w-full">
              Bathrooms
            </Label>
            <Input
              type="number"
              name="bathrooms"
              id="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              className="flex-grow"
            />
          </div>

          {/* Toilets */}
          <div className="flex items-center space-x-2">
            <FaToilet className="text-xl text-blue-500" />
            <Label htmlFor="toilets" className="text-right w-full">
              Toilets
            </Label>
            <Input
              type="number"
              name="toilets"
              id="toilets"
              value={formData.toilets}
              onChange={handleChange}
              required
              className="flex-grow"
            />
          </div>

          {/* Total Rooms */}
          <div className="flex items-center space-x-2">
            <FaDoorOpen className="text-xl text-blue-500" />
            <Label htmlFor="total_rooms" className="text-right w-full">
              Total Rooms
            </Label>
            <Input
              type="number"
              name="total_rooms"
              id="total_rooms"
              value={formData.total_rooms}
              onChange={handleChange}
              required
              className="flex-grow"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-blue-600 text-white hover:bg-blue-700 w-full"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Get Forecast"}
          </Button>
        </form>
      ) : (
        <motion.div
          className="bg-green-100 text-green-800 text-center p-4 mt-6 rounded-md shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold">Predicted Rent:</h2>
          <p className="text-4xl font-semibold">
            {/* <FaDollarSign className="inline mr-2" /> */}
            {predictedPrice !== null ? formatCurrency(predictedPrice) : "N/A"}
          </p>
          <Button
            className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            onClick={handlePredictAnother}
          >
            Predict Another
          </Button>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="bg-red-100 text-red-800 text-center p-4 mt-6 rounded-md shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p>{error}</p>
        </motion.div>
      )}
    </div>
  );
};

export default ForecastRentPage;
