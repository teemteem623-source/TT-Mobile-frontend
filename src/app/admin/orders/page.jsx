"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";

import {
  getOrders,
  deleteOrder,
  updateOrderStatus,
} from "@/services/orderService";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [errors, setErrors] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0,
  });

  const router = useRouter();

  const columns = [
    { key: "order_id", label: "ID" },
    { key: "customer_name", label: "Khách hàng" },
    { key: "phone", label: "SĐT" },
    { key: "total", label: "Tổng tiền" },
    { key: "statusText", label: "Trạng thái" },
  ];

  const formatMoney = (value) =>
    Number(value).toLocaleString("vi-VN") + " đ";

  // 🚀 FETCH + FIX PAGINATION LIKE CATEGORY
  const fetchData = async () => {
    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      const res = await getOrders({ trash: 0 });

      const list = res.data || [];

      const formatted = list.map((item) => ({
        ...item,
        total: formatMoney(item.total),
        statusText:
          item.status === 1
            ? " Đã xác nhận"
            : " Chờ xử lý",
      }));

      const start = (params.page - 1) * params.limit;
      const end = start + params.limit;

      const paginated = formatted.slice(start, end);

      setOrders(paginated);
      setTotalPages(Math.ceil(formatted.length / params.limit));
    } catch (e) {
      console.log(e);
      setErrors({ message: "Lỗi tải dữ liệu 💀" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const handleEdit = (order) => {
    router.push(`/admin/orders/${order.order_id}`);
  };

  const handleDelete = async (order) => {
    const ok = window.confirm(`Xóa đơn #${order.order_id}?`);
    if (!ok) return;

    try {
      setLoading(true);

      await deleteOrder(order.order_id);

      setSuccess("Xóa thành công 🗑️");
      fetchData();
    } catch {
      setErrors({ message: "Xóa thất bại 💀" });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (order) => {
    try {
      const newStatus = order.statusText.includes("Đã") ? 0 : 1;

      await updateOrderStatus(order.order_id, newStatus);

      setSuccess("Update ok 👌");
      fetchData();
    } catch {
      setErrors({ message: "Update fail 💀" });
    }
  };

  return (
    <div className="p-4">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-purple-600">
          📦 Quản lý đơn hàng
        </h1>
      </div>

      {/* STATUS */}
      <div className="h-6">
        {loading && (
          <p className="text-gray-500 text-sm">Đang tải...</p>
        )}
      </div>

      {success && (
        <p className="text-green-600">{success}</p>
      )}

      {errors.message && (
        <p className="text-red-500">{errors.message}</p>
      )}

      {/* TABLE */}
      <AdminTable
        columns={columns}
        data={orders}
        onEdit={handleEdit}
        onDelete={handleDelete}
        extraActions={[
          {
            label: "Đổi trạng thái",
            onClick: handleToggleStatus,
          },
        ]}
      />

      {/* PAGINATION (GIỐNG CATEGORY 100%) */}
      <Pagination
        totalPages={totalPages}
        params={params}
        onChangeParams={setParams}
      />
    </div>
  );
}