"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";
import { getPages, deletePage } from "@/services/pageService";

export default function AdminPagesPage() {
  const [allPages, setAllPages] = useState([]);
  const [pages, setPages] = useState([]);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0,
  });

  const router = useRouter();

  const columns = [
    { key: "page_id", label: "ID" },
    { key: "title", label: "Tiêu đề" },
    {
      key: "created_at",
      label: "Ngày tạo",
      render: (row) =>
        new Date(row.created_at).toLocaleDateString("vi-VN"),
    },
    {
      key: "statusText",
      label: "Trạng thái",
    },
  ];

  // 🚀 fetch ALL data (giống category)
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess("");

      const res = await getPages({ trash: 0 });

      const list = res?.data || res || [];

      const formatted = list.map((p) => ({
        ...p,
        statusText: p.status === 1 ? "Hiển thị" : "Ẩn",
      }));

      setAllPages(formatted);
    } catch (e) {
      setError(e?.message || "Lỗi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 paginate FE (giống category)
  useEffect(() => {
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;

    setPages(allPages.slice(start, end));
    setTotalPages(Math.ceil(allPages.length / params.limit));
  }, [params, allPages]);

  useEffect(() => {
    fetchData();
  }, []);

  // EDIT
  const handleEdit = (page) => {
    router.push(`/admin/pages/${page.page_id}`);
  };

  // DELETE
  const handleDelete = async (page) => {
    const ok = window.confirm(`Xóa "${page.title}" hả? 😳`);
    if (!ok) return;

    try {
      setLoading(true);

      await deletePage(page.page_id);

      setSuccess("Xóa thành công 🗑️");
      fetchData();
    } catch {
      setError("Xóa thất bại 💀");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">
          Quản lý trang thông tin
        </h1>

        <Link
          href="/admin/pages/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tạo thông tin
        </Link>
      </div>

      {/* STATUS */}
      <div className="h-6">
        {loading && (
          <p className="text-sm text-gray-500">Đang tải...</p>
        )}
      </div>

      {success && (
        <p className="text-green-600 mb-2">{success}</p>
      )}

      {error && (
        <p className="text-red-500 mb-2">{error}</p>
      )}

      {/* TABLE */}
      <AdminTable
        columns={columns}
        data={pages}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* PAGINATION (GIỐNG CATEGORY 100%) */}
      <Pagination
        totalPages={totalPages}
        params={params}
        onChangeParams={setParams}
      />
    </div>
  );
}