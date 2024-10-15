"use client";
import { useState, useEffect } from "react";
import Footer from "../ui/dashboard/Footer";
import Navbar from "../ui/dashboard/Navbar";
import Sidebar from "../ui/dashboard/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control sidebar
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check for small screen sizes and auto-collapse sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Tailwind's "md" breakpoint is 768px
        setSidebarOpen(false); // Collapse sidebar on small screens
        setIsSmallScreen(true); // Indicate that it's a small screen
      } else {
        setSidebarOpen(true); // Open sidebar on larger screens
        setIsSmallScreen(false); // Indicate it's no longer a small screen
      }
    };

    // Call the resize handler once when component mounts
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-green-50">
      {/* Pass sidebarOpen prop and check for small screens */}
      <Sidebar sidebarOpen={sidebarOpen} isSmallScreen={isSmallScreen} />
      <div className="flex-1 flex flex-col">
        {/* Pass setSidebarOpen to toggle, and sidebarOpen for controlling sidebar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
