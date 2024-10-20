"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import AddPropertyModal from "./AddPropertyModal";
import EditPropertyModal from "./EditPropertyModal"; // Import for editing properties
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"; // Edit/Delete icons
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // ShadCN Dialog components

// Define Property type based on expected data
interface Property {
  listing_id: string;
  town: string;
  state: string;
  property_type: string;
  bedrooms: number;
  bathrooms: number;
  toilet: number;
  parking_space: number;
  price: number;
  current_status: string;
}

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAddingProperty, setIsAddingProperty] = useState<boolean>(false);
  const [isEditingProperty, setIsEditingProperty] = useState<boolean>(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  ); // Store selected property for editing
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/property/list-all-property-by-loggedin-owner`,
        { headers }
      );
      setProperties(response.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        setError("No property found for the logged-in user.");
      } else {
        setError("Error fetching properties.");
      }
    } finally {
      setLoading(false);
    }
  };

  const openAddPropertyModal = () => {
    setIsAddingProperty(true);
  };

  const openEditPropertyModal = (property: Property) => {
    setSelectedProperty(property);
    setIsEditingProperty(true);
  };

  const openDeleteDialog = (propertyId: string) => {
    setPropertyToDelete(propertyId);
  };

  const deleteProperty = async () => {
    try {
      const token = Cookies.get("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/property/${propertyToDelete}`,
        { headers }
      );
      fetchProperties(); // Refresh properties after deletion
      setPropertyToDelete(null); // Close dialog after deletion
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">Your Properties</h2>
        <Button
          onClick={openAddPropertyModal}
          className="bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded-md"
        >
          Add New Property
        </Button>
      </div>

      {loading ? (
        <p>Loading properties...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : properties.length === 0 ? (
        <p>No properties available. Click "Add New Property" to create one.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <div
              key={property.listing_id}
              className="bg-white shadow-md p-4 rounded-lg"
            >
              <h3 className="font-bold">{property.property_type}</h3>
              <p>
                {property.town}, {property.state}
              </p>
              <p>
                {property.bedrooms} Bed | {property.bathrooms} Bath |{" "}
                {property.toilet} Toilet | {property.parking_space} Parking
                space
              </p>
              <p>₦{property.price}</p>
              <p>Status: {property.current_status}</p>

              {/* Edit and Delete Icons */}
              <div className="flex justify-between items-center mt-2">
                <AiOutlineEdit
                  className="text-blue-500 cursor-pointer"
                  onClick={() => openEditPropertyModal(property)}
                />
                <Dialog>
                  <DialogTrigger asChild>
                    <AiOutlineDelete
                      className="text-red-500 cursor-pointer"
                      onClick={() => openDeleteDialog(property.listing_id)}
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Property</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this property? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        className="bg-gray-300 hover:bg-gray-200"
                        onClick={() => setPropertyToDelete(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-red-500 text-white hover:border hover:text-red-500"
                        onClick={deleteProperty}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAddingProperty && (
        <AddPropertyModal
          setIsAddingProperty={setIsAddingProperty}
          fetchProperties={fetchProperties}
        />
      )}

      {isEditingProperty && selectedProperty && (
        <EditPropertyModal
          property={selectedProperty}
          setIsEditingProperty={setIsEditingProperty}
          fetchProperties={fetchProperties}
        />
      )}
    </div>
  );
};

export default PropertyList;
