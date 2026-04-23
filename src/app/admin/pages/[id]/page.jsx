"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPageById, updatePage } from "@/services/pageService";

const EditPageForm = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    created_by: 1,
    status: 1,
    trash: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getPageById(id);

        const page = data?.data || data;

        setFormData({
          title: page.title || "",
          content: page.content || "",
          created_by: page.created_by || 1,
          status: page.status ?? 1,
          trash: page.trash ?? 0,
        });

      } catch (e) {
        setError(e?.message || "Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "status" || name === "trash"
          ? Number(value)
          : value,
    }));
  };

  // submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess("");

      await updatePage(id, formData);

      setSuccess("Cập nhật trang thành công 🎉");

      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (e) {
      setError(e?.response?.data?.error || "Lỗi cập nhật");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-linear-to-r from-purple-50 via-white to-purple-50 shadow-2xl rounded-3xl">

      <button
        onClick={() => (window.location.href = "/admin/pages")}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
      >
        ← Quay lại
      </button>

      <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
        ✏️ Cập nhật thông tin
      </h2>

      {success && <p className="text-green-600 mb-4">🎉 {success}</p>}
      {error && <p className="text-red-500 mb-4">❌ {error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* TITLE */}
        <div>
          <label className="font-semibold">Tiêu đề:</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="font-semibold">Nội dung:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        {/* STATUS + TRASH */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            >
              <option value={1}>Hiển thị</option>
              <option value={0}>Ẩn</option>
            </select>
          </div>

          <div>
            <label>Trash:</label>
            <select
              name="trash"
              value={formData.trash}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl"
            >
              <option value={0}>Không</option>
              <option value={1}>Có</option>
            </select>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
        >
          {loading ? "Đang cập nhật..." : "Cập nhật thông tin"}
        </button>

      </form>
    </div>
  );
};

export default EditPageForm;