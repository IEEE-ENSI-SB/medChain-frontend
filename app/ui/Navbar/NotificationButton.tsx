// app/components/NotificationButton.js

import { Bell } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import Image from 'next/image';
import { USER_NOTIFICATIONS } from '../../constant';

export default function NotificationButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative bg-white rounded-full p-3 hover:bg-gray-50">
          <Bell className="w-6 h-6 text-green-600" />
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {USER_NOTIFICATIONS.length}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-80 p-0 mt-2 bg-white shadow-lg rounded-lg overflow-hidden" 
        align="end"
      >
        <div className="flex flex-col">
          {USER_NOTIFICATIONS.map((notification) => (
            <div 
              key={notification.id} 
              className="flex items-start gap-3 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image 
                  src={notification.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  width={32}
                  height={32}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-700">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.timestamp}</p>
              </div>
            </div>
          ))}
          <div className="p-3 text-center">
            <a href="#" className="text-sm text-green-600 hover:underline">
              See all notifications →
            </a>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
