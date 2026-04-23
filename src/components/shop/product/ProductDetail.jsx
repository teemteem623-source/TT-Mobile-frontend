"use client";
import { useCart } from "@/context/CardContext";
import { formatCurrency } from "@/utils/formatCurrency";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductDetail({ product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL;
  const FALLBACK_IMAGE = "/images/no-image.jpg";

  const [imgSrc, setImgSrc] = useState(
    product?.image ? `${IMG_URL}${product.image}` : FALLBACK_IMAGE
  );

  if (!product) {
    return (
      <p className="text-center text-gray-500 py-10">
        Không tìm thấy sản phẩm
      </p>
    );
  }

  // 👉 xử lý mua ngay
  const handleBuyNow = () => {
    addToCart(product);
    router.push("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* Hình ảnh */}
        <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl shadow-lg p-6 flex items-center justify-center w-full h-[400px]">
          <img
            src={imgSrc}
            alt={product.product_name}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
            className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Thông tin */}
        <div className="space-y-5">

          <h2 className="text-3xl font-bold text-purple-800">
            {product.product_name}
          </h2>

          {/* Giá */}
          <p className="text-2xl text-purple-600 font-semibold">
            {formatCurrency(product.price)}
          </p>

          {/* Category */}
          <p className="text-gray-600">
            <span className="font-semibold text-purple-700">Danh mục:</span>{" "}
            {product.category || "Chưa phân loại"}
          </p>

          {/* Mô tả */}
          <div>
            <h3 className="font-semibold text-purple-800 mb-1">
              Mô tả sản phẩm
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "Chưa có mô tả cho sản phẩm này."}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            {/* Mua ngay */}
            <button
              onClick={handleBuyNow}
              className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-6 py-2 rounded-lg shadow-md hover:from-purple-600 hover:to-purple-800 transition"
            >
              Mua ngay
            </button>

            {/* Thêm giỏ */}
            <button
              onClick={() => addToCart(product)}
              className="border border-purple-400 text-purple-700 px-6 py-2 rounded-lg hover:bg-purple-100 transition"
            >
              Thêm vào giỏ
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}