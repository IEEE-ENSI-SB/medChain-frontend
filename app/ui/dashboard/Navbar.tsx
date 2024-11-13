// ui/dashboard/Navbar.tsx

import { Menu } from "lucide-react";
import NotificationButton from "../Navbar/NotificationButton";
import UserAvatarDropdown from "../Navbar/UserButton";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isSmallScreen: boolean;
}

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  isSmallScreen,
}: HeaderProps) {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean);

    // If we're on the dashboard, return only "Dashboard"
    if (paths.length === 0 || paths[0].toLowerCase() === "dashboard") {
      return [{ name: "Dashboard", href: "/dashboard" }];
    }

    // For other pages, return "Dashboard" and the current page
    return [
      { name: "Dashboard", href: "/dashboard" },
      {
        name:
          paths[paths.length - 1].charAt(0).toUpperCase() +
          paths[paths.length - 1].slice(1),
        href: pathname,
      },
    ];
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-16 px-4 bg-white border-b border-gray-200 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            {breadcrumbs.map((crumb, index) => (
              <li key={crumb.href} className="inline-flex items-center">
                {index > 0 && <span className="mx-2 text-gray-400">/</span>}
                <Link href={crumb.href} passHref legacyBehavior>
                  <a className="text-sm font-medium text-gray-700 hover:text-blue-600">
                    {crumb.name}
                  </a>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
      {/* Right section */}
      <div className="flex items-center gap-4">
        <NotificationButton />
        <UserAvatarDropdown />
      </div>
    </header>
  );
}
