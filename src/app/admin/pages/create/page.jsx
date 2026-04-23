"use client";

import React, { useState } from "react";
import { createPage } from "@/services/pageService";

const CreatePageForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    created_by: 1, // fix cứng hoặc lấy từ user login
    status: 1,
    trash: 0,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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

  // submit
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

      await createPage(formData);

      setSuccess("Tạo trang thành công 🎉");

      setFormData({
        title: "",
        content: "",
        created_by: 1,
        status: 1,
        trash: 0,
      });

      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (e) {
      setError(e?.response?.data?.error || "Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-linear-to-r from-purple-50 via-white to-purple-50 shadow-2xl rounded-3xl">

      <button
        onClick={() => (window.location.href = "/admin/pages")}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
      >
        ← Quay lại
      </button>

      <h2 className="text-3xl font-bold text-center text-purple-600 mb-6">
        📄 Tạo thông tin mới
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
            placeholder="Nhập tiêu đề..."
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
            placeholder="Nhập nội dung..."
          />
        </div>

        {/* STATUS + TRASH */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="font-semibold">Status:</label>
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
            <label className="font-semibold">Trash:</label>
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

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
        >
          {loading ? "Đang xử lý..." : "Tạo thông tin"}
        </button>

      </form>
    </div>
  );
};

export default CreatePageForm;