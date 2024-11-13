// ui/dashboard/Sidebar.tsx

import Link from "next/link";
import { FC } from "react";
import {
  Shield,
  Home,
  Calendar,
  User,
  MessageSquare,
  Bot,
  PlusCircle,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen }) => {
  return (
    <div
      className={`h-doubelscreen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
      aria-label="Sidebar Navigation"
    >
      {/* Logo */}
      <div
        className={`p-4 flex items-center gap-2 transition-opacity ${
          sidebarOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <Shield className="w-6 h-6 text-green-600" aria-hidden="true" />
        {sidebarOpen && (
          <span className="text-green-600 text-xl font-semibold">
            MedChain
          </span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-6" aria-label="Main Navigation">
        <div className="space-y-1">
          <Link href="/dashboard" passHref legacyBehavior>
            <a
              className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50"
              aria-label="Dashboard"
            >
              <Home className="w-5 h-5" aria-hidden="true" />
              {sidebarOpen && <span className="ml-3">Dashboard</span>}
            </a>
          </Link>

          <Link href="/Doctors" passHref legacyBehavior>
            <a
              className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50"
              aria-label="Doctors"
            >
              <User className="w-5 h-5" aria-hidden="true" />
              {sidebarOpen && <span className="ml-3">Doctors</span>}
            </a>
          </Link>

          <Link href="/Patients" passHref legacyBehavior>
            <a
              className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50"
              aria-label="Patients"
            >
              <PlusCircle className="w-5 h-5" aria-hidden="true" />
              {sidebarOpen && <span className="ml-3">Patients</span>}
            </a>
          </Link>

          <Link href="/Appointments" passHref legacyBehavior>
            <a
              className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50"
              aria-label="All Appointments"
            >
              <Calendar className="w-5 h-5" aria-hidden="true" />
              {sidebarOpen && <span className="ml-3">All Appointments</span>}
            </a>
          </Link>

          <Link href="/AI" passHref legacyBehavior>
            <a
              className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50"
              aria-label="Ask AI"
            >
              <Bot className="w-5 h-5" aria-hidden="true" />
              {sidebarOpen && <span className="ml-3">Ask AI</span>}
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
