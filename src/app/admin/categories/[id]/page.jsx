"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getCategoryById,
  updateCategory,
  getCategories,
} from "@/services/categoryService";

const EditCategory = () => {
  const { id } = useParams();
  const router = useRouter();

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

  const [formData, setFormData] = useState({
    cat_name: "",
    alias: "",
    parent_id: "",
    status: 1,
    trash: 0,
  });

  const [categories, setCategories] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [cateDetail, cateList] = await Promise.all([
          getCategoryById(id),
          getCategories({ trash: 0 }),
        ]);

        setFormData({
          cat_name: cateDetail.cat_name || "",
          alias: cateDetail.alias || "",
          parent_id: cateDetail.parent_id || "",
          status: cateDetail.status ?? 1,
          trash: cateDetail.trash ?? 0,
        });

        setCategories(cateList);
      } catch (e) {
        setError("Lỗi tải dữ liệu 💀");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // handle change + auto slug
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]:
          name === "status" || name === "trash" || name === "parent_id"
            ? value === "" ? "" : Number(value)
            : value,
      };

      if (name === "cat_name") {
        updated.alias = slugify(value);
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateCategory(id, formData);

      setSuccess("Cập nhật thành công ");
      setError("");
    } catch (e) {
      setError("Cập nhật thất bại ");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl">

      {/* 🔙 BACK BUTTON */}
      <button
        onClick={() => router.push("/admin/categories")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
      >
        ← Quay lại
      </button>

      <h2 className="text-2xl font-bold mb-4 text-purple-600">
        ✏️ Sửa danh mục
      </h2>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Tên */}
        <div>
          <label>Tên danh mục</label>
          <input
            name="cat_name"
            value={formData.cat_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Alias</label>
          <input
            value={formData.alias}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* 🔥 SELECT PARENT (xịn hơn nhập tay) */}
        <div>
          <label>Danh mục cha</label>
          <select
            name="parent_id"
            value={formData.parent_id || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Không có --</option>

            {categories
              .filter((c) => c.cat_id !== Number(id))
              .map((c) => (
                <option key={c.cat_id} value={c.cat_id}>
                  {c.cat_name}
                </option>
              ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value={1}>Hiển thị</option>
            <option value={0}>Ẩn</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default EditCategory;