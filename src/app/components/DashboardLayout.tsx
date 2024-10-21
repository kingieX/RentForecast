"use client";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { ReactNode, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation"; // To determine active route

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname(); // Get the current path
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const [user, setUser] = useState({ fullname: "", email: "" });
  const sidebarRef = useRef<HTMLDivElement>(null); // Ref for detecting clicks outside

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (!token) {
      router.push("/login"); // Redirect to login if no token found
    }

    const fullname = Cookies.get("fullname");
    const email = Cookies.get("email");
    if (fullname && email) {
      setUser({ fullname, email });
    }

    // Handle clicks outside the sidebar to close it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [router]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle the sidebar
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("fullname");
    Cookies.remove("email");
    router.push("/login");
  };

  const isActive = (route: string) => pathname === route;

  return (
    <div className="flex min-h-screen">
      {/* Toggle button for mobile view */}
      <button
        className="lg:hidden p-4 fixed w-full bg-white top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg> // Close icon
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg> // Hamburger icon
        )}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 w-64 bg-blue-500 text-white h-screen transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:flex`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="p-4 font-bold text-center text-xl">Dashboard</div>
            <nav className="flex flex-col gap-4 p-4">
              <Link
                href="/dashboard/overview"
                className={`p-2 rounded ${
                  isActive("/dashboard/overview")
                    ? "bg-blue-600"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setSidebarOpen(false)} // Close sidebar on click
              >
                Overview
              </Link>
              <Link
                href="/dashboard/rent-forecast"
                className={`p-2 rounded ${
                  isActive("/dashboard/rent-forecast")
                    ? "bg-blue-600"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setSidebarOpen(false)} // Close sidebar on click
              >
                Rent Forecast
              </Link>
              <Link
                href="/dashboard/property-listings"
                className={`p-2 rounded ${
                  isActive("/dashboard/property-listings")
                    ? "bg-blue-600"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setSidebarOpen(false)} // Close sidebar on click
              >
                Property Listings
              </Link>

              <Link
                href="/dashboard/historical-data"
                className={`p-2 rounded ${
                  isActive("/dashboard/historical-data")
                    ? "bg-blue-600"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setSidebarOpen(false)} // Close sidebar on click
              >
                Historical Data
              </Link>
              <Link
                href="/dashboard/feedback"
                className={`p-2 rounded ${
                  isActive("/dashboard/feedback")
                    ? "bg-blue-600"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => setSidebarOpen(false)} // Close sidebar on click
              >
                User Feedback
              </Link>
            </nav>
          </div>

          {/* User profile section */}
          <div className="p-4 border-t border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold">{user.fullname}</p>
                <p className="text-sm">{user.email}</p>
              </div>
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="focus:outline-none ml-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 bottom-10 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                    <Link
                      href="/dashboard/edit-profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-200"
                      onClick={() => {
                        setDropdownOpen(false);
                        setSidebarOpen(false); // Close sidebar on click
                      }}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 px-6 py-4 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
