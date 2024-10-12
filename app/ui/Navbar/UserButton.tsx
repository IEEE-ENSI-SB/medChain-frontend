// app/components/UserAvatarDropdown.js
import Image from 'next/image';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { User, Settings, LogOut } from 'lucide-react';  // Icons for better UI

export default function UserAvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded-lg">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image 
              src="/avatar.jpeg" 
              alt="User avatar" 
              className="object-cover"
              width={80}
              height={80}
            />
          </div>
          <span className="text-sm font-medium text-green-500">Hello, Daulat</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-white shadow-lg rounded-lg p-2 mt-2"
      >
        <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
          <User className="w-4 h-4 text-gray-800" />
          <span className='text-gray-800'>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
          <Settings className="w-4 h-4 text-gray-800" />
          <span className='text-gray-800'>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 p-2 hover:bg-red-100 rounded-md text-red-600">
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
