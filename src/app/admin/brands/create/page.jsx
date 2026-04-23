"use client";

import { useState } from "react";
import { createBrand } from "@/services/brandService";

// slug
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

export default function CreateBrandForm() {
  const [formData, setFormData] = useState({
    brand_name: "",
    status: 1,
  });

  const [alias, setAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "brand_name") {
      setFormData((prev) => ({
        ...prev,
        brand_name: value,
      }));

      setAlias(slugify(value)); // tách riêng alias cho sạch
    }

    if (name === "status") {
      setFormData((prev) => ({
        ...prev,
        status: Number(value),
      }));
    }
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.brand_name.trim()) {
      setError("Tên brand không được để trống");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const payload = {
        brand_name: formData.brand_name.trim(),
        alias: alias || slugify(formData.brand_name),
        status: formData.status,
      };

      console.log("🚀 SEND:", payload);

      const res = await createBrand(payload);

      console.log("✅ RESPONSE:", res);

      setSuccess("Tạo brand thành công 🎉");

      setFormData({
        brand_name: "",
        status: 1,
      });

      setAlias("");

    } catch (err) {
      console.log("💀 ERROR FULL:", err);
      console.log("💀 BACKEND:", err?.response?.data);

      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        " Lỗi server"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-xl rounded-2xl">

      <button
        onClick={() => (window.location.href = "/admin/brands")}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-lg"
      >
        ← Quay lại
      </button>

      <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
        🏷️ Tạo thương hiệu
      </h2>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* name */}
        <div>
          <label className="font-semibold">Tên thương hiệu</label>
          <input
            name="brand_name"
            value={formData.brand_name}
            onChange={handleChange}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        {/* alias */}
        <div>
          <label className="font-semibold">Alias</label>
          <input
            value={alias}
            disabled
            className="w-full p-3 border rounded-xl bg-gray-100"
          />
        </div>

        {/* status */}
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

        {/* submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl"
        >
          {loading ? "Đang xử lý..." : "Tạo brand"}
        </button>

      </form>
    </div>
  );
}