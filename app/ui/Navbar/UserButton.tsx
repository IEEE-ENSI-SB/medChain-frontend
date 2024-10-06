
export default function UserButton() {
  return (
    <button className="flex items-center gap-2 bg-green-50 rounded-full py-2 pl-2 pr-4">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img 
          src="/api/placeholder/32/32" 
          alt="User avatar" 
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-green-600 font-medium">Hello, Daulat</span>
    </button>
  )
}