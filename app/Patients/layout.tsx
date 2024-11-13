// app/layout.tsx

"use client";

import { useState, useEffect } from "react";
import Footer from "../ui/dashboard/Footer";
import Navbar from "../ui/dashboard/Navbar";
import Sidebar from "../ui/dashboard/Sidebar";
import { SnackbarProvider } from "../context/SnackbarContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  // Customize your Material-UI theme here if needed
  palette: {
    primary: {
      main: "#22c55e", // Tailwind's green-500
    },
    secondary: {
      main: "#3b82f6", // Tailwind's blue-500
    },
  },
  typography: {
    // Customize typography to match Tailwind's styles if necessary
  },
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
        setIsSmallScreen(true);
      } else {
        setSidebarOpen(true);
        setIsSmallScreen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-grow bg-green-50">
            <Sidebar sidebarOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col min-w-0">
              <Navbar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                isSmallScreen={isSmallScreen}
              />
              <main className="flex-1 overflow-x-auto">
                <div className="bg-green-50 min-w-full min-h-full p-4">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Layout;
