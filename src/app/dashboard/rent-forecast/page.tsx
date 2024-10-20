// pages/dashboard/property-listings.tsx
import DashboardLayout from "@/app/components/DashboardLayout";
import ForecastRentPage from "./_components/ForecastRentPage";

export default function RentForecast() {
  return (
    <DashboardLayout>
      <ForecastRentPage />
    </DashboardLayout>
  );
}
