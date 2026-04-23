"use client";

import React, { useEffect, useState } from "react";
import { getPages } from "@/services/pageService";
import PageList from "@/components/shop/page/PageList";

export default function Page() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getPages({
          page: 1,
          limit: 12,
          status: 1,
          trash: 0,
        });

        console.log("API PAGES RESPONSE:", res);

        // ==========================
        // FIX CHUẨN DATA SHAPE
        // ==========================
        const list =
          res?.data?.data ||   // case Laravel pagination
          res?.data ||         // case API bọc data
          res ||               // case return raw array
          [];

        setPages(Array.isArray(list) ? list : []);

      } catch (e) {
        setErrors({ message: e?.message || "Lỗi tải dữ liệu" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          📄 Trang thông tin
        </h1>
        <p className="text-gray-500 mt-2">
          Các bài viết / chính sách / giới thiệu
        </p>
      </div>

      {/* ERROR */}
      {errors.message && (
        <p className="text-red-500 text-center mb-4">
          {errors.message}
        </p>
      )}

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-gray-500">
          Đang tải dữ liệu...
        </p>
      ) : pages.length > 0 ? (
        <PageList
          pages={pages}
          title=""
        />
      ) : (
        <p className="text-center text-gray-500">
          Không có dữ liệu 😴
        </p>
      )}

    </div>
  );
}