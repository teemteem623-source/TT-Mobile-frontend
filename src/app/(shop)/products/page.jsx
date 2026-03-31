"use client";
import ProductList from "@/components/shop/product/ProductList";
import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import CategoryMenu from "@/components/shop/product/CategoryMenu";
import Search from "@/components/shop/product/Search";



export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    limit: 12,
    trash: 0,
    status: 1
  });

  const router = useRouter();
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProducts(params);
      setProducts(data.data);
      setTotalPages(data.totalPage);
      console.log(data);
      const data1 = await getCategories({ trash: 0, status: 1 });
      setCategories(data1);

    } catch (e) {
      setErrors({ message: e?.message || "Lỗi tải dữ liệu" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);
  return (
    <div>

      {errors.message && <p>{errors.message}</p>}
      <div className="flex">
        <div className="w-1/4">
        <Search params = {params} setParams = {setParams}/>
        <CategoryMenu categories={categories} params = {params} setParams = {setParams} />
        </div>
        <div className="w-3/4">
          {loading ? "Đang tải..." : <ProductList products={products} />}
          {loading ? "" : <Pagination totalPages={totalPages} params={params} onChangeParams={setParams} />}

        </div>
      </div>


    </div>
  );
}
