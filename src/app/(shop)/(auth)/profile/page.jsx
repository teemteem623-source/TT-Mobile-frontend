"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { shopMenu } from "@/data/menu";

export default function Page() {
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();

  // 👉 logout giống Userinfo
  const handleLogout = () => {
    logout();        
    setUser(null);   
    router.push("/login"); 
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl text-gray-600">
          Vui lòng đăng nhập 😏
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-linear
    -to-br from-purple-50 via-violet-50 to-indigo-50 px-6 py-10">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* LEFT MENU */}
        <div className="md:col-span-1 space-y-4">

          <div className="bg-white rounded-2xl shadow-md p-4">

            <h3 className="text-purple-700 font-bold mb-4">
              Menu tài khoản
            </h3>

            <ul className="space-y-2 text-sm">
              {shopMenu.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* LOGOUT */}
            <div className="pt-4 border-t mt-4">
              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition font-medium"
              >
                🚪 Đăng xuất
              </button>
            </div>

          </div>

        </div>

        {/* RIGHT INFO */}
        <div className="md:col-span-3">

          <div className="bg-white rounded-3xl shadow-lg p-8">

            {/* HEADER */}
            <div className="flex flex-col items-center pb-6 border-b">

              <img
                src={user.avatar || "https://i.pravatar.cc/150"}
                alt="avatar"
                className="w-28 h-28 rounded-full border-4 border-purple-300 shadow-md object-cover"
              />

              <h2 className="mt-4 text-2xl font-bold text-gray-800">
                {user.fullname || "Chưa cập nhật"}
              </h2>

              <span className={`mt-2 text-sm px-4 py-1 rounded-full font-medium
                ${user.user_type === "admin"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"}`}>
                {user.user_type}
              </span>

            </div>

            {/* INFO GRID */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-base">

              <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                <p className="text-gray-500 text-sm">Username</p>
                <p className="font-semibold text-gray-800">{user.username}</p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <p className="text-gray-500 text-sm">Email</p>
                <p className="font-semibold text-gray-800">{user.email}</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}