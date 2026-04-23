"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getOrderById, updateOrderStatus } from "@/services/orderService";

const EditOrderForm = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // 🚀 load order
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOrderById(id);

        // ⚠️ FIX CHỖ NÀY (tùy API)
        const data = res.data || res;

        setOrder(data);
        setStatus(data.status ?? 0);
      } catch (err) {
        console.log(err);
        setError("Lỗi load đơn hàng 💀");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // 🚀 update status
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateOrderStatus(id, status);

      setSuccess("Cập nhật trạng thái thành công 🎉");
      setError("");
    } catch (err) {
      setError("Update thất bại 😢");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Đang tải...</p>;
  }

  if (!order) {
    return (
      <p className="text-center text-red-500">
        Không tìm thấy đơn hàng
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-linear-to-r from-purple-50 via-white to-indigo-50 shadow-2xl rounded-3xl">

      {/* BACK */}
      <button
        onClick={() => (window.location.href = "/admin/orders")}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
      >
        ← Quay lại
      </button>

      {/* TITLE */}
      <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-600">
        🧾 Chi tiết đơn hàng #{order.order_id}
      </h2>

      {/* MESSAGE */}
      {success && <p className="text-green-600 mb-3">🎉 {success}</p>}
      {error && <p className="text-red-600 mb-3">❌ {error}</p>}

      {/* INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

        <div>
          <label className="font-semibold">Khách hàng:</label>
          <input value={order.customer_name || ""} disabled className="w-full p-3 border rounded-xl bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">SĐT:</label>
          <input value={order.phone || ""} disabled className="w-full p-3 border rounded-xl bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">Email:</label>
          <input value={order.email || ""} disabled className="w-full p-3 border rounded-xl bg-gray-100" />
        </div>

        <div>
          <label className="font-semibold">Tổng tiền:</label>
          <input value={order.total || 0} disabled className="w-full p-3 border rounded-xl bg-gray-100" />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Địa chỉ:</label>
          <input value={order.address || ""} disabled className="w-full p-3 border rounded-xl bg-gray-100" />
        </div>

        <div className="md:col-span-2">
          <label className="font-semibold">Ghi chú:</label>
          <textarea value={order.note || ""} disabled className="w-full p-3 border rounded-xl bg-gray-100" />
        </div>
      </div>

      {/* UPDATE STATUS */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold block mb-1">
            Trạng thái đơn hàng:
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
          >
            <option value={0}>Chờ xử lí</option>
            <option value={1}>Đã xác nhận</option>
            
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl text-white font-semibold bg-linear-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 transition"
        >
          {loading ? "Đang cập nhật..." : "Cập nhật trạng thái"}
        </button>
      </form>
    </div>
  );
};

export default EditOrderForm;