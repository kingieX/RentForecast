"use client";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define the User type based on expected user data structure
interface User {
  avatar_url: string;
  fullname: string;
  email: string;
  phone_no: string;
  role: string;
}

// Define props for the EditProfileModal component
interface EditProfileModalProps {
  user: User;
  setIsEditing: (isOpen: boolean) => void;
  fetchUserDetails: (userId: string) => void;
}

const EditProfileModal = ({
  user,
  setIsEditing,
  fetchUserDetails,
}: EditProfileModalProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fullname, setFullname] = useState<string>(user.fullname);
  const [phone_no, setPhone] = useState<string>(user.phone_no);
  const [avatar_url, setAvatar] = useState<string>(user.avatar_url);
  const [new_password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const userId = Cookies.get("user_id") || ""; // Ensure userId is a string

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("access_token"); // Get the access token from cookies
      const headers = {
        Authorization: `Bearer ${token}`, // Set the Authorization header
      };

      // PUT request to update profile details
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}`,
        {
          avatar_url: avatar_url || "",
          fullname,
          phone_no,
          is_active: true,
        },
        { headers }
      );

      console.log("PUT request response:", response.data); // Log the response data

      if (new_password && new_password === confirmPassword) {
        // POST request to change password
        const passwordResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/change-password`,
          {
            email: user.email,
            new_password,
          },
          { headers } // Ensure the token is sent here as well
        );
        console.log("Password change response:", passwordResponse.data); // Log the response data for password change
      }

      fetchUserDetails(userId); // Refresh user details
      setSuccessMessage("Profile details updated!");
      setIsEditing(false); // Close modal
    } catch (error) {
      console.error(
        "Error updating profile:",
        (error as any)?.response?.data || error
      ); // Log the error response
      setErrorMessage("Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white lg:max-w-xl  max-w-sm w-full rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        <div className="mb-4">
          <Input
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Phone"
            value={phone_no}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Password"
            type="password"
            value={new_password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-black"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            className="hover:bg-white hover:text-blue-500 hover:border bg-blue-500 text-white transition duration-300 px-6 py-3 rounded-lg font-semibold"
            onClick={handleSave}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
        {/* Success and Error Messages */}
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default EditProfileModal;
