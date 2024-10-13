// app/ui/dashboard/Header.tsx
import {  Menu } from 'lucide-react'
import NotificationButton from '../Navbar/NotificationButton'
import UserAvatarDropdown from '../Navbar/UserButton'


interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  
  return (
    <header className="h-16 px-4 bg-white border-b border-gray-200 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className={`text-xl text-gray-800 font-semibold transition-all ${sidebarOpen ? 'block' : 'hidden'}`}>
          Dashboard
        </h1>
      </div>
      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
       <NotificationButton/>
        {/* Gifts */}
        {/* User Avatar */}
        <UserAvatarDropdown/>
      </div>
    </header>
  )
}
