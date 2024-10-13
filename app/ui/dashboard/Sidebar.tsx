// components/Sidebar.tsx
import Link from 'next/link'
import { FC } from 'react'
import { Shield, Home, PlusCircle, Calendar, User, MessageSquare, Bot } from 'lucide-react'

interface SidebarProps {
  sidebarOpen: boolean
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen }) => {
  return (
    <div className={`h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'}`}>
      {/* Logo */}
      <div className={`p-4 flex items-center gap-2 transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
        <Shield className="w-6 h-6 text-green-600" />
        {sidebarOpen && <span className="text-green-600 text-xl font-semibold">MedChain</span>}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2 py-6">
        <div className="space-y-1">
          <Link href="/dashboard" className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
            <Home className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3 ">Dashboard</span>}
          </Link>
          <Link href="/Doctors" className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
            <User className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Doctors</span>}
          </Link>

          <Link href="/add-doctor" className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
            <PlusCircle className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Add doctor</span>}
          </Link>

          <Link href="/add-patient" className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
            <PlusCircle className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Add patient</span>}
          </Link>




          <Link href="/Patients" className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50">


            <PlusCircle className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Patients</span>}
          </Link>

          <Link href="/appointments" className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
            <Calendar className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">All Appointments</span>}
          </Link>

          <Link href="/chat" className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
            <MessageSquare className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Chat</span>}
          </Link>

          <Link href="/ask-ai" className="flex items-center px-2 py-2 text-gray-700 rounded-lg hover:bg-gray-50">
            <Bot className="w-5 h-5" />
            {sidebarOpen && <span className="ml-3">Ask AI</span>}
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
