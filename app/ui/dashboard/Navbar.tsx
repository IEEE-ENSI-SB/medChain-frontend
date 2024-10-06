// app/ui/dashboard/Header.tsx
"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Bell, Gift, Menu, Moon, Sun } from 'lucide-react'
import { DropdownMenu,
    DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
 } from '@radix-ui/react-dropdown-menu'

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export default function Header({ sidebarOpen, setSidebarOpen }: HeaderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  
  const notifications = [
    { id: 1, text: 'New appointment request', time: '5m ago' },
    { id: 2, text: 'Meeting with Dr. Smith', time: '1h ago' },
    { id: 3, text: 'Lab results available', time: '2h ago' },
  ]

  const gifts = [
    { id: 1, text: 'You received a gift card!', time: '1d ago' },
    { id: 2, text: 'Special offer available', time: '2d ago' },
  ]

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
        <DropdownMenu>
          <DropdownMenuTrigger className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6 text-green-500" />
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-3">
                <div>
                  <p className="text-sm font-medium">{notification.text}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Gifts */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Gift className="w-6 h-6 text-green-500" />
              <span className="absolute top-0 right-0 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {gifts.length}
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            {gifts.map((gift) => (
              <DropdownMenuItem key={gift.id} className="p-3">
                <div>
                  <p className="text-sm font-medium">{gift.text}</p>
                  <p className="text-xs text-gray-500">{gift.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          {isDarkMode ? (
            <Moon className="w-6 h-6 text-gray-500" />
          ) : (
            <Sun className="w-6 h-6 text-yellow-500" />
          )}
        </button>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="relative w-8 h-8 rounded-full overflow-hidden">
                <Image 
                  src="/avatar.jpeg" 
                  alt="User avatar" 
                  className="object-cover"
                  width={80}
                  height={10}
                />
              </div>
              <span className="text-sm font-medium text-green-500">Hello, Daulat</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}