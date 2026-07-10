import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center text-slate-500">
        <Search size={20} className="mr-2" />
        <input 
          type="text" 
          placeholder="Search clients or services..." 
          className="outline-none bg-transparent w-64 text-sm"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-slate-500 hover:text-slate-700 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="h-8 w-8 bg-slate-900 rounded-full flex items-center justify-center text-white font-medium text-sm">
          A
        </div>
      </div>
    </header>
  );
}
