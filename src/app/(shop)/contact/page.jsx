"use client";

import React, { useState } from "react";
import { createContact } from "@/services/contactService";

export default function ContactPage() {
  const [form, setForm] = useState({
    email: "",
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await createContact({
        ...form,
        trash: 0,
        status: 1,
      });

      setSuccess("Gửi thành công 🎉 tụi mình sẽ phản hồi sớm nhất");

      setForm({
        email: "",
        title: "",
        content: "",
      });
    } catch (err) {
      setError("Gửi thất bại 💀 thử lại sau nhé");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      {/* TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-purple-700">
          📩 Liên hệ với chúng tôi
        </h1>
        <p className="text-gray-500 mt-2">
          Gửi thắc mắc – tụi mình rep liền tay 😎
        </p>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* MAP */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="h-[420px] w-full">
            <iframe
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://maps.google.com/maps?q=10.7769,106.7009&z=15&output=embed"
            />
          </div>

          <div className="p-4 border-t">
            <p className="text-gray-700 font-medium">
              📍 Cửa hàng: 123 ABC, TP.HCM
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Giờ mở cửa: 8:00 - 22:00
            </p>
          </div>

        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-xl font-semibold mb-4 text-purple-600">
            Gửi tin nhắn
          </h2>

          {error && (
            <div className="mb-3 text-red-500 text-sm">{error}</div>
          )}
          {success && (
            <div className="mb-3 text-green-600 text-sm">{success}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Email của bạn"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <input
              type="text"
              name="title"
              placeholder="Tiêu đề"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <textarea
              name="content"
              placeholder="Nội dung..."
              value={form.content}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition font-medium"
            >
              {loading ? "Đang gửi..." : "🚀 Gửi liên hệ"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
}