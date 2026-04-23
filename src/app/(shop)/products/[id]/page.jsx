"use client";
import ProductDetail from "@/components/shop/product/ProductDetail";
import ProductList from "@/components/shop/product/ProductList";
import { useEffect, useState } from "react";
import { getProductById, getRelatedProducts } from "@/services/productService";
import { useParams } from "next/navigation";
import Loading from "@/components/common/loading";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  // Lấy chi tiết sản phẩm 
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (e) {
        setErrors({ message: e?.message || "Lỗi tải dữ liệu" });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);


  // Lấy sản phẩm liên quan
  useEffect(() => {
    if (!id) return;

    const fetchRelated = async () => {
      try {
        setLoadingRelated(true);
        const data = await getRelatedProducts(id, 4);
        setRelatedProducts(data);
      } catch (e) {
        console.error("Lỗi sản phẩm liên quan:", e);
      } finally {
        setLoadingRelated(false);
      }
    };

    fetchRelated();
  }, [id]);

  return (

    <div className="px-6">
      <Link
        href="/products"
        className="inline-block mb-4 px-4 py-2 rounded-lg text-sm font-medium text-purple-600 border border-purple-300 hover:bg-purple-50 transition"
      >
        ← Quay lại sản phẩm
      </Link>
      <h1 className="text-xl font-semibold mb-4">
        Trang chi tiết sản phẩm {id}
      </h1>

      {errors.message && <p className="text-red-500">{errors.message}</p>}

      {/* Chi tiết sản phẩm */}
      {loading ? <Loading /> : <ProductDetail product={product} />}

      {/* Sản phẩm liên quan */}
      <div className="mt-16">
        {loadingRelated ? (<Loading />) : (relatedProducts.length > 0 && (<ProductList products={relatedProducts} title="Sản phẩm liên quan" />))}
      </div>
    </div>
  );
}