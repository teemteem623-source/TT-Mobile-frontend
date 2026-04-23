"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getContactById,
  updateContact,
} from "@/services/contactService";

const EditContact = () => {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    title: "",
    content: "",
    status: 1,
    trash: 0,
  });

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // LOAD DETAIL
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getContactById(id);
        const data = res?.data || res;

        setFormData({
          email: data.email || "",
          title: data.title || "",
          content: data.content || "",
          status: Number(data.status ?? 1),
          trash: Number(data.trash ?? 0),
        });

      } catch (e) {
        console.log(e);
        setError("Lỗi tải contact 💀");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // HANDLE CHANGE (chỉ cho status chạy)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name !== "status") return; 

    setFormData((prev) => ({
      ...prev,
      status: Number(value),
    }));
  };

  // SUBMIT UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await updateContact(id, formData);

      setSuccess("Cập nhật trạng thái thành công 🎉");

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
        onClick={() => router.push("/admin/contacts")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
      >
        ← Quay lại
      </button>

      <h2 className="text-2xl font-bold mb-4 text-purple-600">
        ✏️ Chi tiết liên hệ
      </h2>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* EMAIL */}
        <div>
          <label>Email</label>
          <input
            name="email"
            value={formData.email}
            disabled
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* TITLE */}
        <div>
          <label>Tiêu đề</label>
          <input
            name="title"
            value={formData.title}
            disabled
            className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* CONTENT */}
        <div>
          <label>Nội dung</label>
          <textarea
            name="content"
            value={formData.content}
            disabled
            className="w-full p-2 border rounded h-32 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* STATUS (CHỈ CÁI NÀY EDIT ĐƯỢC) */}
        <div>
          <label>Trạng thái</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value={1}>Đã xử lý</option>
            <option value={0}>Chưa xử lý</option>
          </select>
        </div>


        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Cập nhật trạng thái
        </button>

      </form>
    </div>
  );
};

export default EditContact;