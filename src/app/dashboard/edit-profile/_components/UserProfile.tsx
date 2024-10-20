"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfileModal from "./EditProfileModal";

// Define User type based on expected user data structure
interface User {
  avatar_url: string;
  fullname: string;
  email: string;
  phone_no: string;
  role: string;
}

// Environment variable for the base URL
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Fetch user details on mount
  useEffect(() => {
    const userId = Cookies.get("user_id");
    if (userId) {
      fetchUserDetails(userId);
    }
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`);
      console.log("Fetched user details:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const openEditModal = () => setIsEditing(true);

  return (
    <div className="container mx-auto px-6 lg:py-6 py-2">
      {user ? (
        <div className="lg:px-16 px-8">
          <h2 className="text-3xl font-bold mb-4">Profile</h2>
          <div className="mb-6">
            <Avatar className="w-40 h-40 rounded-full border bg-blue-400">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="mb-4">
            <strong>Fullname:</strong> {user.fullname}
          </div>
          <div className="mb-4">
            <strong>Email:</strong> {user.email}
          </div>
          <div className="mb-4">
            <strong>Phone No:</strong> {user.phone_no}
          </div>
          <div className="mb-4">
            <strong>Role:</strong> {user.role}
          </div>

          <Button
            className="hover:bg-white hover:text-blue-500 hover:border bg-blue-500 text-white transition duration-300 px-6 py-3 rounded-lg font-semibold"
            onClick={openEditModal}
          >
            Edit
          </Button>

          {isEditing && (
            <EditProfileModal
              user={user}
              setIsEditing={setIsEditing}
              fetchUserDetails={fetchUserDetails}
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
