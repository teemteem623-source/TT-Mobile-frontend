"use client";

import React, { useState, useEffect } from "react";
import CartPage from "../cart/page";
import { useAuth } from "@/context/AuthProvider";
import { useCart } from "@/context/CardContext";
import { createOrder } from "@/services/orderService";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();
  const { cart, setCart, total } = useCart();

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  // ===== ADDRESS STATE =====
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);

  const [provinceCode, setProvinceCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const [openAddressBox, setOpenAddressBox] = useState(false);

  // ===== FORM =====
  const [formData, setFormData] = useState({
    user_id: "",
    customer_name: "",
    address: "",
    phone: "",
    email: "",
    total: 0,
    note: "",
  });

  // INIT USER
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        user_id: user.user_id || "",
        customer_name: user.fullname || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // UPDATE TOTAL
  useEffect(() => {
    setFormData((prev) => ({ ...prev, total }));
  }, [total]);

  // LOAD PROVINCE
  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/v2/p/")
      .then((res) => res.json())
      .then(setProvinces)
      .catch(console.error);
  }, []);

  // LOAD WARD
  useEffect(() => {
    if (!provinceCode) return;

    fetch(`https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`)
      .then((res) => res.json())
      .then((data) => setWards(data.wards || []))
      .catch(console.error);
  }, [provinceCode]);

  // BUILD ADDRESS LIKE LARAVEL STYLE
  useEffect(() => {
    const p = provinces.find((x) => x.code === Number(provinceCode))?.name || "";
    const w = wards.find((x) => x.code === Number(wardCode))?.name || "";

    const full = [detailAddress, w, p].filter(Boolean).join(", ");

    setFormData((prev) => ({
      ...prev,
      address: full,
    }));
  }, [provinceCode, wardCode, detailAddress]);

  // ALERT AUTO HIDE
  useEffect(() => {
    if (!alert.message) return;

    const t = setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, 3000);

    return () => clearTimeout(t);
  }, [alert.message]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createOrder({
        order: formData,
        detail: cart,
      });

      setAlert({
        type: "success",
        message: "🎉 Đặt hàng thành công!",
      });

      setCart([]);
      setTimeout(() => router.push("/cart"), 1200);
    } catch (err) {
      setAlert({
        type: "error",
        message: "❌ Lỗi đặt hàng!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-8 text-purple-600">
          ✨ Thanh toán
        </h2>

        {alert.message && (
          <div className="mb-5 p-3 rounded bg-green-500 text-white">
            {alert.message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* FORM */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">

            <input
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="Họ tên"
              className="w-full border p-3 rounded"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="SĐT"
              className="w-full border p-3 rounded"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-3 rounded"
            />

            {/* ADDRESS CLICK TRIGGER */}
            <input
              value={formData.address}
              readOnly
              onClick={() => setOpenAddressBox(!openAddressBox)}
              placeholder="📍 Click để chọn địa chỉ"
              className="w-full border p-3 rounded bg-gray-100 cursor-pointer"
            />

            {/* ADDRESS BOX */}
            {openAddressBox && (
              <div className="space-y-3 border p-4 rounded bg-gray-50">

                {/* PROVINCE */}
                <select
                  className="w-full border p-2 rounded"
                  value={provinceCode}
                  onChange={(e) => {
                    setProvinceCode(e.target.value);
                    setWardCode("");
                  }}
                >
                  <option value="">Chọn tỉnh</option>
                  {provinces.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.name}
                    </option>
                  ))}
                </select>

                {/* WARD */}
                <select
                  className="w-full border p-2 rounded"
                  value={wardCode}
                  onChange={(e) => setWardCode(e.target.value)}
                >
                  <option value="">Chọn phường/xã</option>
                  {wards.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.name}
                    </option>
                  ))}
                </select>

                {/* DETAIL */}
                <input
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  placeholder="Số nhà, đường..."
                  className="w-full border p-2 rounded"
                />
              </div>
            )}

            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Ghi chú"
              className="w-full border p-3 rounded"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded"
            >
              {loading ? "Đang xử lý..." : "🚀 Đặt hàng"}
            </button>
          </div>

          {/* CART */}
          <div>
            <CartPage hideCheckout />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;