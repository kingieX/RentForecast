"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditProfileModal from "./EditProfileModal";

interface User {
  avatar_url: string;
  fullname: string;
  email: string;
  phone_no: string;
  role: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const userId = Cookies.get("user_id");
    if (userId) {
      fetchUserDetails(userId);
    }
  }, []);

  const fetchUserDetails = async (userId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const openEditModal = () => setIsEditing(true);

  return (
    <div className="container mx-auto px-4 py-6">
      {user ? (
        <div className="lg:px-16 px-4">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Profile</h2>
          <div className="flex justify-center mb-6">
            <Avatar className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border bg-blue-400">
              <AvatarImage src={user.avatar_url} />
              <AvatarFallback className="text-6xl font-semibold">
                {user.fullname[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="grid gap-4 mb-4 text-center lg:text-left">
            <div>
              <strong>Fullname:</strong> {user.fullname}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Phone No:</strong> {user.phone_no}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
          </div>

          <div className="flex justify-center lg:justify-start">
            <Button
              className="hover:bg-white hover:text-blue-500 hover:border bg-blue-500 text-white transition duration-300 px-6 py-2 lg:px-6 lg:py-3 rounded-lg font-semibold"
              onClick={openEditModal}
            >
              Edit Profile
            </Button>
          </div>

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
