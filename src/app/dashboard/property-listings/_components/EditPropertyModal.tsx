import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@headlessui/react"; // For the toggle switch

interface EditPropertyRequest {
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

interface EditPropertyModalProps {
  property: {
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
  };
  setIsEditingProperty: (isOpen: boolean) => void;
  fetchProperties: () => void;
}

const EditPropertyModal = ({
  property,
  setIsEditingProperty,
  fetchProperties,
}: EditPropertyModalProps) => {
  const [town, setTown] = useState<string>(property.town);
  const [state, setState] = useState<string>(property.state);
  const [property_type, setPropertyType] = useState<string>(
    property.property_type
  );
  const [bedrooms, setBedrooms] = useState<number | "">(property.bedrooms);
  const [bathrooms, setBathrooms] = useState<number | "">(property.bathrooms);
  const [toilet, setToilet] = useState<number | "">(property.toilet);
  const [parking_space, setParkingSpace] = useState<number | "">(
    property.parking_space
  );
  const [price, setPrice] = useState<number | "">(property.price);
  const [current_status, setCurrentStatus] = useState<boolean>(
    property.current_status === "Available"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    console.log(property.listing_id);

    try {
      const token = Cookies.get("access_token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const requestBody: EditPropertyRequest = {
        town,
        state,
        property_type,
        bedrooms: bedrooms === "" ? 0 : bedrooms,
        bathrooms: bathrooms === "" ? 0 : bathrooms,
        toilet: toilet === "" ? 0 : toilet,
        parking_space: parking_space === "" ? 0 : parking_space,
        price: price === "" ? 0 : price,
        current_status: current_status ? "Available" : "Unavailable",
      };

      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/property/${property.listing_id}`,
        requestBody,
        { headers }
      );
      fetchProperties();
      setSuccessMessage("Property updated successfully!");
      setIsEditingProperty(false);
    } catch (error) {
      console.error("Error updating property:", error);
      setErrorMessage("Failed to update property. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg h-auto max-h-[90vh] overflow-y-auto space-y-4">
        <h2 className="text-2xl font-bold mb-4">Edit Property</h2>

        {/* Town and State */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Town
          </label>
          <Input
            placeholder="Enter town"
            value={town}
            onChange={(e) => setTown(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <Input
            placeholder="Enter state"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>

        {/* Property Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <Input
            placeholder="Enter property type"
            value={property_type}
            onChange={(e) => setPropertyType(e.target.value)}
          />
        </div>

        {/* Bedrooms, Bathrooms, and Toilet */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms
            </label>
            <Input
              type="number"
              placeholder="Enter number"
              value={bedrooms}
              onChange={(e) =>
                setBedrooms(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bathrooms
            </label>
            <Input
              type="number"
              placeholder="Enter number"
              value={bathrooms}
              onChange={(e) =>
                setBathrooms(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Toilet
            </label>
            <Input
              type="number"
              placeholder="Enter number"
              value={toilet}
              onChange={(e) =>
                setToilet(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>
        </div>

        {/* Parking Space and Price */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parking Space
            </label>
            <Input
              type="number"
              placeholder="Enter number"
              value={parking_space}
              onChange={(e) =>
                setParkingSpace(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (USD)
            </label>
            <Input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>
        </div>

        {/* Current Status Toggle */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Status
          </label>
          <div className="flex items-center space-x-2">
            <Switch
              checked={current_status}
              onChange={setCurrentStatus}
              className={`${
                current_status ? "bg-green-500" : "bg-red-500"
              } relative inline-flex h-6 w-12 items-center rounded-full transition-colors`}
            >
              <span className="sr-only">Current Status</span>
              <span
                className={`${
                  current_status ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
            <span className="text-sm font-medium">
              {current_status ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Messages */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {isLoading && <p className="text-blue-500">Loading...</p>}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            className="bg-gray-300 text-black hover:border hover:text-red-500"
            onClick={() => setIsEditingProperty(false)}
          >
            Cancel
          </Button>
          <Button
            className="hover:bg-white hover:text-blue-500 hover:border bg-blue-500 text-white transition duration-300 px-6 py-3 rounded-lg font-semibold"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {/* Save Changes */}
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPropertyModal;
