"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";

import {
  getCategories,
  deleteCategory,
} from "@/services/categoryService";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
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

  // columns
  const columns = [
    { key: "cat_id", label: "ID" },
    { key: "cat_name", label: "Tên danh mục" },
    { key: "alias", label: "Alias" },
    { key: "parent_name", label: "Danh mục cha" },
    { key: "statusText", label: "Trạng thái" },
  ];

  // format status
  const getStatusText = (status) => {
    return status === 1 ? "Hiển thị" : " Ẩn";
  };

  // fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      const list = await getCategories({ trash: 0 });

      // format data
      const formatted = list.map((item) => {
        const parent = list.find(
          (c) => c.cat_id === item.parent_id
        );

        return {
          ...item,
          parent_name: parent ? parent.cat_name : "Không có",
          statusText: getStatusText(item.status),
        };
      });

      const start = (params.page - 1) * params.limit;
      const end = start + params.limit;

      const paginatedData = formatted.slice(start, end);

      setCategories(paginatedData);
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

  // edit
  const handleEdit = (item) => {
    router.push(`/admin/categories/${item.cat_id}`);
  };

  // delete
  const handleDelete = async (item) => {
    const confirmDelete = window.confirm(
      `Bạn có muốn xóa "${item.cat_name}" không?`
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      await deleteCategory(item.cat_id);

      setSuccess("Xóa thành công 🗑️");
      fetchData();
    } catch (e) {
      console.log("DELETE ERROR:", e);
      setErrors({ message: "Xóa thất bại " });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-purple-600">
          📂 Quản lý danh mục
        </h1>

        <Link
          href="/admin/categories/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tạo danh mục
        </Link>
      </div>

      {/* STATUS */}
      <div className="h-6">
        {loading && (
          <p className="text-gray-500 text-sm">Đang tải...</p>
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
        data={categories}
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