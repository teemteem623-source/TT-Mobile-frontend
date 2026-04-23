"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTopicById, updateTopic } from "@/services/topicService";

const EditTopicForm = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: 1,
    trash: 0,
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // 🚀 LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopicById(id);

        setFormData({
          name: data.name || "",
          description: data.description || "",
          status: data.status ?? 1,
          trash: data.trash ?? 0,
        });
      } catch (e) {
        setErrors({ message: "Lỗi load dữ liệu 💀" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🧠 HANDLE CHANGE
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

  // 🚀 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      setErrors({ message: "Thiếu tên topic 🤨" });
      return;
    }

    try {
      setLoading(true);

      await updateTopic(id, formData);

      setSuccess("Cập nhật topic thành công 🎉");
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setErrors({
        message: e?.response?.data?.error || "Update thất bại 💀",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10">
        Đang tải dữ liệu...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-purple-50 via-white to-indigo-50 shadow-2xl rounded-3xl">

      {/* BACK */}
      <button
        onClick={() =>
          (window.location.href = "/admin/topics")
        }
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
      >
        ← Quay lại
      </button>

      {/* TITLE */}
      <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-600">
        ✏️ Chỉnh sửa topic
      </h2>

      {/* ALERT */}
      {success && (
        <p className="text-green-600 mb-4">
          🎉 {success}
        </p>
      )}

      {errors.message && (
        <p className="text-red-600 mb-4">
          ❌ {errors.message}
        </p>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* NAME */}
        <div>
          <label className="font-semibold mb-1 block">
            Tên topic:
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập tên topic..."
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="font-semibold mb-1 block">
            Mô tả:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Nhập mô tả..."
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* STATUS + TRASH */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="font-semibold mb-1 block">
              Trạng thái:
            </label>
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
            <label className="font-semibold mb-1 block">
              Trash:
            </label>
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
          className="w-full py-3 rounded-2xl text-white font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 transition"
        >
          {loading
            ? "Đang cập nhật..."
            : "Cập nhật topic"}
        </button>
      </form>
    </div>
  );
};

export default EditTopicForm;