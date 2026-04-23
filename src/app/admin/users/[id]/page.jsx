"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getUserById } from "@/services/userService";

const ViewUser = () => {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🚀 LOAD USER
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getUserById(id);
        const data = res?.data || res;

        setUser(data);
      } catch (err) {
        console.log(err);
        setError("Lỗi load user 💀");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>;
  }

  if (!user) {
    return (
      <p className="text-center text-red-500">
        Không tìm thấy user
      </p>
    );
  }

  // helper hiển thị
  const getStatusText = (status) =>
    status === 1 ? "🟢 Hoạt động" : "🔴 Bị chặn";

  const getRoleText = (role) =>
    role === "admin" ? "👑 Admin" : "👤 User";

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-purple-50 via-white to-indigo-50 shadow-2xl rounded-3xl">

      {/* BACK */}
      <button
        onClick={() => router.push("/admin/users")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
      >
        ← Quay lại
      </button>

      {/* TITLE */}
      <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-600">
        👤 Thông tin user #{user.user_id}
      </h2>

      {error && (
        <p className="text-red-600 mb-3">❌ {error}</p>
      )}

      {/* INFO ONLY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="font-semibold">Username</p>
          <p>{user.username}</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="font-semibold">Họ tên</p>
          <p>{user.fullname}</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="font-semibold">Email</p>
          <p>{user.email}</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          <p className="font-semibold">Quyền</p>
          <p>{getRoleText(user.user_type)}</p>
        </div>

        <div className="p-4 bg-white rounded-xl shadow md:col-span-2">
          <p className="font-semibold">Trạng thái</p>
          <p>{getStatusText(user.status)}</p>
        </div>

      </div>
    </div>
  );
};

export default ViewUser;