"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";

import {
  getTopics,
  deleteTopic,
} from "@/services/topicService";

export default function AdminTopicsPage() {
  const [topics, setTopics] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0,
  });

  const router = useRouter();

  // columns đúng DB db_topics
  const columns = [
    { key: "topic_id", label: "ID" },
    { key: "name", label: "Tên chủ đề" },
    { key: "description", label: "Mô tả" },
    { key: "statusText", label: "Trạng thái" },
    { key: "created_at", label: "Ngày tạo" },
  ];

  const getStatusText = (status) => {
    return status === 1 ? "Hiển thị" : "Ẩn";
  };

  // FETCH DATA
  const fetchData = async () => {
    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      const res = await getTopics(params);

      const list =
        res?.data?.data || 
        res?.data ||       
        res || [];       

      const total =
        res?.data?.totalPage ||
        res?.totalPage ||
        Math.ceil(list.length / params.limit) ||
        1;

      const filtered = list.filter(
        (item) => item.trash === params.trash
      );

      const formatted = filtered.map((item) => ({
        ...item,
        statusText: getStatusText(item.status),
      }));

      setTopics(formatted);
      setTotalPages(total);
    } catch (e) {
      console.log(e);
      setErrors({
        message: e?.message || "Lỗi tải dữ liệu 💀",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  // EDIT
  const handleEdit = (topic) => {
    router.push(`/admin/topics/${topic.topic_id}`);
  };

  // DELETE
  const handleDelete = async (topic) => {
    if (!window.confirm(`Xóa topic "${topic.name}"?`)) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      await deleteTopic(topic.topic_id);

      setSuccess("Xóa topic thành công 🔥");
      fetchData();
    } catch (e) {
      console.log(e);
      setErrors({ message: "Xóa thất bại 💀" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">
          Quản lý chủ đề (Topic)
        </h1>

        <Link
          href="/admin/topics/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Tạo topic
        </Link>
      </div>

      {/* STATUS */}
      <div className="h-6">
        {loading && (
          <p className="text-sm text-gray-500">
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
        data={topics}
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