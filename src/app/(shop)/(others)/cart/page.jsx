"use client"
import CartItem from "@/components/shop/cart/CartItem";
import { useCart } from "@/context/CardContext";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CartPage({ hideCheckout = false }) {
  const { cart, total, setCart } = useCart();

  const [alert, setAlert] = useState("");

  const isEmpty = cart.length === 0;

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // 🔥 update số lượng
  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    const newCart = cart.map(item =>
      item.product_id === id
        ? { ...item, quantity }
        : item
    );

    setCart(newCart);
  };

  const handleCheckout = (e) => {
    if (isEmpty) {
      e.preventDefault();
      setAlert("⚠️ Giỏ hàng chưa có sản phẩm!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* 🔥 ALERT */}
      {alert && (
        <div className="mb-6 px-5 py-4 rounded-2xl text-white font-semibold shadow-lg 
        bg-linear-to-r from-red-500 to-orange-500 animate-bounce">
          {alert}
        </div>
      )}
      <Link
        href="/products"
        className="inline-block mb-4 px-4 py-2 rounded-lg text-sm font-medium text-purple-600 border border-purple-300 hover:bg-purple-50 transition"
      >
        ← Quay lại sản phẩm
      </Link>

      {/* CARD */}
      <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 border border-purple-100">


        {/* List cart */}
        <div className="space-y-4">
          {isEmpty ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-lg">
                🛒 Giỏ hàng đang trống
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Thêm sản phẩm để tiếp tục nhé
              </p>
            </div>
          ) : (
            cart.map(item => (
              <CartItem
                key={item.product_id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity} // 🔥 truyền xuống
              />
            ))
          )}
        </div>

        {/* Tổng */}
        <div className="mt-8 pt-6 border-t flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-600">
            Tổng:
          </span>

          <h2 className="text-2xl font-extrabold bg-linear-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            {total.toLocaleString("vi-VN")} đ
          </h2>
        </div>

        {/* Nút checkout */}
        {!hideCheckout && (
          <Link
            href="/checkout"
            onClick={handleCheckout}
            className="mt-6 block w-full text-center py-3 rounded-2xl font-semibold text-white bg-linear-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            ✨ Thanh toán
          </Link>
        )}
      </div>

    </div>
  );
}