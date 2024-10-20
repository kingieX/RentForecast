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
  const [newAvatar, setNewAvatar] = useState<File | null>(null); // State for new image file
  const [new_password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const userId = Cookies.get("user_id") || ""; // Ensure userId is a string

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let uploadedAvatarUrl = avatar_url; // Use existing avatar URL by default

      // Handle avatar image upload if a new image is selected
      if (newAvatar) {
        const formData = new FormData();
        formData.append("file", newAvatar);
        formData.append("upload_preset", "your_upload_preset"); // Add your cloud storage preset
        formData.append("cloud_name", "your_cloud_name"); // Add your cloud storage name

        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          formData
        );
        uploadedAvatarUrl = uploadResponse.data.secure_url; // Get uploaded image URL
      }

      // PUT request to update profile details
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/${userId}`,
        {
          avatar_url: uploadedAvatarUrl,
          fullname,
          phone_no,
          is_active: true,
        },
        { headers }
      );

      // Change password if new password is provided
      if (new_password && new_password === confirmPassword) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user/change-password`,
          {
            email: user.email,
            new_password,
          },
          { headers }
        );
      }

      fetchUserDetails(userId);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white lg:max-w-xl max-w-sm w-full rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        {/* Avatar Upload */}
        {/* <div className="mb-4 text-center">
          <label className="block mb-2">Update Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewAvatar(e.target.files ? e.target.files[0] : null)
            }
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div> */}

        {/* Fullname Input */}
        <div className="mb-4">
          <Input
            placeholder="Fullname"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <Input
            placeholder="Phone"
            value={phone_no}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <Input
            placeholder="Password"
            type="password"
            value={new_password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <Input
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-black hover:border hover:text-red-500"
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
