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
        className="bg-purple-500 text-white px-4 py-1.5 rounded-lg
                   hover:bg-purple-600 transition active:scale-95 shadow-sm"
      >
        Đăng nhập
      </a>
    );
  }

  return (
    <div className="relative flex items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-purple-500 transition cursor-pointer">
        <img
          src={user.avatar || "https://i.pravatar.cc/150?img=3"}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dropdown */}
      {hover && (
        <div
          className="absolute top-full right-0 mt-1 w-52 bg-white shadow-lg rounded-xl border border-gray-200 z-50 animate-fadeIn -translate-y-1"        >
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