"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getBrandById,
  updateBrand,
} from "@/services/brandService";

const EditBrand = () => {
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
    brand_name: "",
    alias: "",
    status: 1,
    trash: 0,
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const brand = await getBrandById(id);

        setFormData({
          brand_name: brand.brand_name || "",
          alias: brand.alias || "",
          status: brand.status ?? 1,
          trash: brand.trash ?? 0,
        });
      } catch (e) {
        console.log(e);
        setError("Lỗi tải dữ liệu 💀");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]:
          name === "status" || name === "trash"
            ? Number(value)
            : value,
      };

      if (name === "brand_name") {
        updated.alias = slugify(value);
      }

      return updated;
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await updateBrand(id, formData);

      setSuccess("Cập nhật thương hiệu thành công 🎉");
    } catch (e) {
      console.log(e);
      setError("Cập nhật thất bại 💀");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl">

      {/* BACK */}
      <button
        onClick={() => router.push("/admin/brands")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
      >
        ← Quay lại
      </button>

      <h2 className="text-2xl font-bold mb-4 text-purple-600">
        ✏️ Sửa thương hiệu
      </h2>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <div>
          <label>Tên thương hiệu</label>
          <input
            name="brand_name"
            value={formData.brand_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* ALIAS */}
        <div>
          <label>Alias</label>
          <input
            value={formData.alias}
            disabled
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* STATUS */}
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

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default EditBrand;