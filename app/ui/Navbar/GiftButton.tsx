import { Gift } from 'lucide-react'


export default function GiftButton() {
  return (
    <button className="relative bg-white rounded-full p-3 hover:bg-gray-50">
      <Gift className="w-6 h-6 text-green-600" />
      <span className="absolute -top-1 -right-1 bg-gray-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        3
      </span>
    </button>
  )
}