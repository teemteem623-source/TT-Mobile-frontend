"use client";

import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Userinfo() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push("/login");
  };

  if (!user) {
    return (
      <a
        href="/login"
        className="px-3 py-1 rounded hover:bg-blue-100 hover:text-blue-800 transition-colors"
      >
        Đăng nhập
      </a>
    );
  }

  return (
    <div className="relative flex items-center">
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-purple-500 transition cursor-pointer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img
          src={user.avatar || "https://i.pravatar.cc/150?img=3"}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
        
        
      </div>

      {/* Dropdown hiện khi hover vào avatar hoặc hover trên dropdown */}
      {hover && (
        <div
          className="absolute right-0 mt-2 w-52 bg-white shadow-lg rounded-xl border border-gray-200 z-50 animate-fadeIn"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="p-4 border-b border-gray-100">
            <Link
              href="/profile"
              className="block font-semibold text-gray-700 hover:text-purple-600 mb-1"
            >
              Thông tin người dùng
            </Link>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-b-xl transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}