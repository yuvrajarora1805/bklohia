"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Briefcase, FileText, Settings, Users as UsersIcon } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Groups", href: "/groups", icon: UsersIcon },
    { name: "Services", href: "/services", icon: Briefcase },
    { name: "Documents", href: "/documents", icon: FileText },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/");
          return (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <button className="w-full py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors">
          Sign Out
        </button>
      </div>
    </aside>
  );
}
