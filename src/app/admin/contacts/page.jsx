"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";

import {
  getContacts,
  deleteContact,
} from "@/services/contactService";

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
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

  // columns theo db_contacts
  const columns = [
    { key: "contact_id", label: "ID" },
    { key: "email", label: "Email" },
    { key: "title", label: "Tiêu đề" },
    { key: "statusText", label: "Trạng thái" },
  ];

  // format status
  const getStatusText = (status) => {
    return status === 1 ? " Đã xử lý" : " Chờ xử lý";
  };

  const getTrashText = (trash) => {
    return trash === 1 ? " Đã xoá" : " Bình thường";
  };

  // fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      const res = await getContacts(params);

      const list =
        res?.data?.data ||
        res?.data ||
        res ||
        [];

      const formatted = list.map((item) => ({
        ...item,
        statusText: getStatusText(item.status),
        trashText: getTrashText(item.trash),
      }));

      // paginate FE (giống category m đang dùng)
      const start = (params.page - 1) * params.limit;
      const end = start + params.limit;

      const paginated = formatted.slice(start, end);

      setContacts(paginated);
      setTotalPages(Math.ceil(formatted.length / params.limit));

    } catch (e) {
      console.log("FETCH ERROR:", e);
      setErrors({ message: "Lỗi tải contacts 💀" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  // view detail (KHÔNG edit)
  const handleView = (item) => {
    router.push(`/admin/contacts/${item.contact_id}`);
  };

  // delete
  const handleDelete = async (item) => {
    const ok = window.confirm(
      `Xoá contact của "${item.email}" không?`
    );

    if (!ok) return;

    try {
      setLoading(true);

      await deleteContact(item.contact_id);

      setSuccess("Xoá contact thành công 🗑️");
      fetchData();

    } catch (e) {
      console.log(e);
      setErrors({ message: "Xoá thất bại 💀" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-purple-600">
          📩 Quản lý liên hệ
        </h1>

        <Link
          href="/admin"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          ← Dashboard
        </Link>
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
        data={contacts}
        onEdit={handleView}   // đổi edit -> VIEW
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