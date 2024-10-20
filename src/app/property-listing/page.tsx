import Navbar from "../components/Navbar";
import PropertyListings from "./_components/PropertyListings";

const PropertyListingsPage = () => {
  return (
    <>
      <Navbar />

      <div className="pt-12">
        <PropertyListings />
      </div>
    </>
  );
};

export default PropertyListingsPage;
