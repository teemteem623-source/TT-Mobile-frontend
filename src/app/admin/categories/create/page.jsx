"use client";

import { useState } from "react";
import React from "react";
import { createCategory } from "@/services/categoryService";

// slug giống product
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẵ|ặ|â|ấ|ầ|ẫ|ậ/g, "a")
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ễ|ệ/g, "e")
    .replace(/í|ì|ỉ|ĩ|ị/g, "i")
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ỗ|ộ|ơ|ớ|ờ|ỡ|ợ/g, "o")
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ữ|ự/g, "u")
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
    .replace(/đ/g, "d")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
};

const CreateCategoryForm = () => {
  const [formData, setFormData] = useState({
    cat_name: "",
    alias: "",
    parent_id: 0,
    status: 1,
    trash: 0,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "parent_id" || name === "status") {
      newValue = Number(value);
    }

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: newValue,
      };

      if (name === "cat_name") {
        updated.alias = slugify(newValue);
      }

      return updated;
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cat_name) {
      setError("Tên danh mục không được để trống");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createCategory(formData);

      setSuccess("Tạo danh mục thành công 🎉");
      setFormData({
        cat_name: "",
        alias: "",
        parent_id: 0,
        status: 1,
        trash: 0,
      });

    } catch (err) {
      setError(err?.response?.data?.error || "Lỗi server 💀");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl">
      <button
        onClick={() => (window.location.href = "/admin/categories")}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
      >
        ← Quay lại
      </button>

      <h2 className="text-2xl font-bold text-center mb-6 text-purple-600">
        📂 Tạo danh mục
      </h2>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Tên + alias */}
        <div>
          <label className="font-semibold">Tên danh mục</label>
          <input
            name="cat_name"
            value={formData.cat_name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <div>
          <label className="font-semibold">Alias</label>
          <input
            name="alias"
            value={formData.alias}
            disabled
            className="w-full p-3 border rounded-xl bg-gray-100"
          />
        </div>

        {/* Parent */}
        <div>
          <label className="font-semibold">Danh mục cha</label>
          <input
            type="number"
            name="parent_id"
            value={formData.parent_id}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
          <p className="text-sm text-gray-500">
            (0 = không có danh mục cha)
          </p>
        </div>

        {/* Status */}
        <div>
          <label className="font-semibold">Trạng thái</label>
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-purple-600 text-white rounded-xl"
        >
          {loading ? "Đang xử lý..." : "Tạo danh mục"}
        </button>

      </form>
    </div>
  );
};

export default CreateCategoryForm;