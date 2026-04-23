"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/table/AdminTable";
import { getProducts, deleteProduct } from "@/services/productService";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0
  });

  const router = useRouter();

  const columns = [
    { key: "product_id", label: "ID" },
    { key: "product_name", label: "Tên sản phẩm" },
    { key: "price", label: "Giá" },
    { key: "sale_price", label: "Giá sale" },
  ];


  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProducts(params);
      setProducts(data.data);
      setTotalPages(data.totalPage);
      console.log(data);

    } catch (e) {
      setErrors({ message: e?.message || "Lỗi tải dữ liệu" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  // EDIT
  const handleEdit = (product) => {
    router.push(`/admin/products/${product.product_id}`);
  };

  // DELETE
  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${product.product_name}" không?`
    );

    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");

      await deleteProduct(product.product_id);

      setSuccess("Xóa sản phẩm thành công!");

      fetchData();
    } catch (error) {
      setErrors({
        message: "Xóa thất bại!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (

    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Danh sách sản phẩm</h1>

        <Link
          href="/admin/products/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          + Tạo sản phẩm
        </Link>
      </div>
      <div className="h-6">
        {loading && <p className="text-sm text-gray-500">Đang tải...</p>}
      </div>
      {success && <p>{success}</p>}
      {errors.message && <p>{errors.message}</p>}

      <AdminTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <div className="flex justify-center">
        <Pagination totalPages={totalPages} params={params} onChangeParams={setParams} />
      </div>
    </div>
  );
}