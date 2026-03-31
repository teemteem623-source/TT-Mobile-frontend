"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";

export default function Page() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="p-10 text-center">
        <p className="text-lg">Vui lòng đăng nhập 😏</p>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Trang cá nhân</h1>

      <div className="bg-white shadow rounded-xl p-6 space-y-3 max-w-md">
        <p><b>Tên đăng nhập:</b> {user.username}</p>
        <p><b>Email:</b> {user.email}</p>
        <p><b>Vai trò:</b> {user.user_type}</p>
      </div>
    </div>
  );
}