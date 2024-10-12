"use client"
import { useState } from "react";
import Footer from "../ui/dashboard/Footer";
import Navbar from "../ui/dashboard/Navbar";
import Sidebar from "../ui/dashboard/Sidebar";
import { Facebook } from "@mui/icons-material";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true); // State to control sidebar

  return (
    <div className="flex ">
      <Sidebar sidebarOpen={sidebarOpen} /> {/* Pass sidebarOpen prop */}
      <div className="flex-1 flex flex-col">
        <div className="z-50">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div> {/* Pass setSidebarOpen to toggle */}
        <main className="flex-1 p-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
