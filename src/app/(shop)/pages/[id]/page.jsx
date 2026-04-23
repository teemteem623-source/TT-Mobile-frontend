"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/common/loading";
import { getPageById } from "@/services/pageService";

export default function PageDetail() {
  const { id } = useParams();

  const [page, setPage] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Lấy chi tiết page
  useEffect(() => {
    if (!id) return;

    const fetchPage = async () => {
      try {
        setLoading(true);
        const data = await getPageById(id);
        setPage(data);
      } catch (e) {
        setErrors({ message: e?.message || "Lỗi tải dữ liệu" });
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id]);

  return (
    <div className="px-6">

      <h1 className="text-xl font-semibold mb-4">
        Chi tiết thông tin {id}
      </h1>

      {errors.message && (
        <p className="text-red-500">{errors.message}</p>
      )}

      {/* DETAIL CONTENT */}
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-white p-6 rounded-xl shadow">

          {/* TITLE */}
          <h2 className="text-2xl font-bold mb-3">
            {page.title}
          </h2>

          {/* META */}
          <div className="text-sm text-gray-500 mb-6">
            {page.created_at &&
              new Date(page.created_at).toLocaleDateString()}
          </div>

          {/* CONTENT */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: page.content || "",
            }}
          />

        </div>
      )}
    </div>
  );
}