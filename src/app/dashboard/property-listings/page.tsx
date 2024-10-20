// pages/dashboard/property-listings.tsx
import DashboardLayout from "@/app/components/DashboardLayout";
import PropertyList from "./_components/PropertyList";

export default function PropertyListings() {
  return (
    <DashboardLayout>
      <PropertyList />
    </DashboardLayout>
  );
}
