"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // For animation
import { Button } from "@/components/ui/button"; // Adjust the import based on your button component location
import { Input } from "@/components/ui/input"; // Adjust the import based on your input component location
import { Label } from "@/components/ui/label"; // Adjust the import based on your label component location
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const UserFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      id: 1,
      name: "Alice Ebube",
      feedback:
        "This service is fantastic! It made my house hunting so much easier.",
    },
    {
      id: 2,
      name: "John Nwachukwu",
      feedback: "Excellent platform! I found the perfect apartment.",
    },
    {
      id: 3,
      name: "Mrs Jane Obialor",
      feedback: "Great experience! Highly recommend to everyone.",
    },
    // Add more feedback objects as needed
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newFeedback, setNewFeedback] = useState("");

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFeedback(e.target.value);
  };

  const handleSubmitFeedback = () => {
    const newEntry = {
      id: feedbacks.length + 1,
      name: "You", // You can set this to the user's name if available
      feedback: newFeedback,
    };
    setFeedbacks([...feedbacks, newEntry]);
    setNewFeedback("");
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-6">User Feedback</h1>

      <div className="max-h-[400px] overflow-y-scroll p-4 border border-gray-300 rounded-md bg-white shadow-md">
        {feedbacks.map((entry) => (
          <motion.div
            key={entry.id}
            className="flex items-center space-x-3 p-4 border-b border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-shrink-0">
              <FaUserCircle className="w-10 h-10 text-gray-500" />
            </div>
            <div>
              <h3 className="font-semibold">{entry.name}</h3>
              <p className="text-gray-700">{entry.feedback}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Button
        onClick={() => setModalOpen(true)}
        className="mt-6 bg-blue-600 text-white hover:bg-blue-700"
      >
        Submit Feedback
      </Button>

      {/* Modal for submitting feedback */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-md p-6 max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Submit Your Feedback</h2>
            <Label htmlFor="feedback" className="block mb-2">
              Feedback
            </Label>
            <Input
              type="text"
              value={newFeedback}
              onChange={handleFeedbackChange}
              placeholder="Type your feedback here"
              className="mb-4"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitFeedback}
                className="bg-blue-600 text-white hover:bg-blue-700 mr-2"
              >
                Submit
              </Button>
              <Button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFeedback;
