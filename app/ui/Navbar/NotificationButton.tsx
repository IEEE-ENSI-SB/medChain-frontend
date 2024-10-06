import { Bell } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger} from '@radix-ui/react-dropdown-menu'

interface Notification {
  id: number
  avatar?: string
  message: string
  timestamp: string
  type: 'success' | 'info' | 'error'
}

export default function NotificationButton() {
  const notifications: Notification[] = [
    {
      id: 1,
      avatar: '/api/placeholder/32/32',
      message: 'message send successfully..',
      timestamp: '08/24/2024, 09:51:58 PM',
      type: 'success'
    },
    {
      id: 2,
      avatar: '/api/placeholder/32/32',
      message: 'You have new message..',
      timestamp: '08/24/2024, 09:51:58 PM',
      type: 'info'
    },
    {
      id: 3,
      avatar: '/api/placeholder/32/32',
      message: 'New appointment booked..',
      timestamp: '08/24/2024, 09:46:32 PM',
      type: 'error'
    }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative bg-white rounded-full p-3 hover:bg-gray-50">
          <Bell className="w-6 h-6 text-green-600" />
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end">
        <div className="flex flex-col">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className="flex items-start gap-3 p-4 hover:bg-gray-50 border-b border-gray-100"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={notification.avatar} 
                  alt="" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{notification.message}</p>
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
  )
}
