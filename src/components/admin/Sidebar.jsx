"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminMenu } from "@/data/adminMenu";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-gray-900 text-white h-screen p-4 w-64 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <nav className="flex-1">
        {adminMenu.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`block py-3 px-4 rounded mb-2 transition ${isActive ? "bg-purple-700 text-white font-semibold" : "hover:bg-gray-700"
                }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-gray-400 text-sm">
        © 2026 TT Shop
      </div>
    </div>
  );
}