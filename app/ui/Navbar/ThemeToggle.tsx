import { Moon } from 'lucide-react'

export default function ThemeToggle() {
  return (
    <button className="bg-white rounded-full p-3 hover:bg-gray-50">
      <Moon className="w-6 h-6 text-green-600" />
    </button>
  )
}