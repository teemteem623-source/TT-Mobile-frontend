"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";

import {
  getBrands,
  deleteBrand,
} from "@/services/brandService";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState([]);
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
    { key: "brand_id", label: "ID" },
    { key: "brand_name", label: "Tên thương hiệu" },
    { key: "alias", label: "Alias" },
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

      
      const list = await getBrands({ trash: 0 });

      const formatted = list.map((item) => ({
        ...item,
        statusText: getStatusText(item.status),
      }));

      const start = (params.page - 1) * params.limit;
      const end = start + params.limit;
      
      const paginatedData = formatted.slice(start, end);

      setBrands(paginatedData);
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

  // EDIT
  const handleEdit = (item) => {
    router.push(`/admin/brands/${item.brand_id}`);
  };

  // DELETE
  const handleDelete = async (item) => {
    if (!window.confirm(`Xoá "${item.brand_name}" không?`)) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      await deleteBrand(item.brand_id);

      setSuccess("Xóa thành công 🗑️");
      fetchData();
    } catch (e) {
      console.log("DELETE ERROR:", e);
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
          🏷️ Quản lý thương hiệu
        </h1>

        <Link
          href="/admin/brands/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tạo thương hiệu
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
        data={brands}
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