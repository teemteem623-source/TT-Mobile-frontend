"use client";

import Link from "next/link";
import { FaChartLine, FaBox, FaUsers } from "react-icons/fa";

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-indigo-50 p-8">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          📊 Trang quản lý
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Dashboard hệ thống, quản lý sản phẩm, đơn hàng, người dùng và nhiều hơn nữa
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* PRODUCTS */}
        <Link href="/admin/products">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-purple-500 hover:scale-105 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FaBox className="text-purple-600 text-3xl" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">42</h2>
                <p className="text-gray-500">Quản lý sản phẩm</p>
              </div>
            </div>

            <p className="text-sm text-purple-500 mt-3">
              👉 Click để vào danh sách sản phẩm
            </p>
          </div>
        </Link>

        {/* ORDERS */}
        <Link href="/admin/orders">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-indigo-500 hover:scale-105 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-xl">
                <FaChartLine className="text-indigo-600 text-3xl" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">128</h2>
                <p className="text-gray-500">Quản lý đơn hàng</p>
              </div>
            </div>

            <p className="text-sm text-indigo-500 mt-3">
              👉 Xử lý đơn hàng mới
            </p>
          </div>
        </Link>

        {/* USERS */}
        <Link href="/admin/users">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-pink-500 hover:scale-105 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-pink-100 rounded-xl">
                <FaUsers className="text-pink-600 text-3xl" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">76</h2>
                <p className="text-gray-500">Quản lý người dùng</p>
              </div>
            </div>

            <p className="text-sm text-pink-500 mt-3">
              👉 Xem danh sách user
            </p>
          </div>
        </Link>

      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">⚡ Truy cập nhanh</h3>

        <div className="flex flex-wrap gap-4">

          <Link href="/admin/categories"
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition"
          >
            Danh mục
          </Link>

          <Link href="/admin/brands"
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition"
          >
            Thương hiệu
          </Link>

          <Link href="/admin/posts"
            className="px-4 py-2 bg-pink-100 text-pink-700 rounded-xl hover:bg-pink-200 transition"
          >
            Bài viết
          </Link>

          <Link href="/admin/contacts"
            className="px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition"
          >
            Liên hệ
          </Link>

        </div>
      </div>

    </div>
  );
}