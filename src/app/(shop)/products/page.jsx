"use client";
import ProductList from "@/components/shop/product/ProductList";
import { getCategories } from "@/services/categoryService";
import { getProducts } from "@/services/productService";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/common/Pagination";
import { useRouter } from "next/navigation";
import CategoryMenu from "@/components/shop/product/CategoryMenu";
import Search from "@/components/shop/product/Search";
import { getBrands } from "@/services/brandService";
import BrandMenu from "@/components/shop/product/BrandMenu";
import Link from "next/link";
import Loading from "@/components/common/loading";



export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
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

  // Gọi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProducts(params);
        setProducts(data.data);
        setTotalPages(data.totalPage);
        console.log(data);

        const data1 = await getCategories({ trash: 0, status: 1 });
        setCategories(data1);

        const data2 = await getBrands({ trash: 0, status: 1 });
        setBrands(data2);



      } catch (e) {
        setErrors({ message: e?.message || "Lỗi tải dữ liệu" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);
  return (
    <div className="p-4">

      {errors.message && (
        <p className="mb-3 text-red-500 text-sm">
          {errors.message}
        </p>
      )}

      <div className="flex gap-6">
        


        <div className="w-1/4 space-y-4">

          {/* Category */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h3 className="text-lg font-semibold text-purple-700 mb-4 border-b pb-2 border-purple-100">Danh mục</h3>
            <CategoryMenu
              categories={categories}
              params={params}
              setParams={setParams}
            />
          </div>

          {/* Brand */}
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <h3 className="text-lg font-semibold text-purple-700 mb-4 border-b pb-2 border-purple-100">Thương hiệu</h3>
            <BrandMenu
              brands={brands}
              params={params}
              setParams={setParams}
            />
          </div>

        </div>
        {/* RIGHT */}
        <div className="w-3/4 flex flex-col gap-4">
          {/* Search wrapper */}
          <div >
            <Search params={params} setParams={setParams} />
          </div>


          <div className="bg-white rounded-2xl shadow-sm p-4">
            {loading ? (<Loading/>): <p className="text-gray-500">Đang tải...</p>  && <ProductList products={products} title="Danh sách sản phẩm " />}
          </div>

          {!loading && (
            <div className="flex justify-center">
              <Pagination totalPages={totalPages} params={params} onChangeParams={setParams} />
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
