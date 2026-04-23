"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";

import {
  getUsers,
  deleteUser,
} from "@/services/userService";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0,
  });

  const router = useRouter();

  const columns = [
    { key: "user_id", label: "ID" },
    { key: "username", label: "Username" },
    { key: "fullname", label: "Họ tên" },
    { key: "email", label: "Email" },
    { key: "user_type", label: "Loại" },
    { key: "statusText", label: "Trạng thái" },
  ];

  const getStatusText = (status) => {
    return status === 1 ? "Hiển thị" : "Ẩn";
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      const list = await getUsers({ trash: params.trash });

      const formatted = list.map((item) => ({
        ...item,
        statusText: getStatusText(item.status),
      }));

      // 🔥 PAGINATION FRONTEND
      const start = (params.page - 1) * params.limit;
      const end = start + params.limit;

      const paginatedData = formatted.slice(start, end);

      setUsers(paginatedData);
      setTotalPages(Math.ceil(formatted.length / params.limit));
    } catch (e) {
      console.log("FETCH ERROR:", e);
      setErrors({ message: "Lỗi tải dữ liệu 💀" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const handleEdit = (item) => {
    router.push(`/admin/users/${item.user_id}`);
  };

  const handleDelete = async (item) => {
    const confirmDelete = window.confirm(
      `Bạn có muốn xóa user "${item.username}" không?`
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      await deleteUser(item.user_id);

      setSuccess("Xóa user thành công 🗑️");
      fetchData();
    } catch (e) {
      console.log(e);
      setErrors({ message: "Xóa thất bại 💀" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-purple-600">
          👤 Quản lý người dùng
        </h1>
      </div>

      {/* STATUS */}
      <div className="h-6">
        {loading && (
          <p className="text-gray-500 text-sm">
            Đang tải...
          </p>
        )}
      </div>

      {success && (
        <p className="text-green-600">{success}</p>
      )}

      {errors.message && (
        <p className="text-red-500">{errors.message}</p>
      )}

      {/* TABLE */}
      <AdminTable
        columns={columns}
        data={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* PAGINATION */}
      <Pagination
        totalPages={totalPages}
        params={params}
        onChangeParams={setParams}
      />
    </div>
  );
}