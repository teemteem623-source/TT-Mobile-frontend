"use client";

import Link from "next/link";
import { useCart } from "@/context/CardContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const productId = product.product_id;
  const IMG_URL = process.env.NEXT_PUBLIC_IMG_URL;
  const FALLBACK_IMAGE = "/images/no-image.jpg";
  const [imgSrc, setImgSrc] = useState(
    product.image ? `${IMG_URL}${product.image}` : FALLBACK_IMAGE,
  );

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

      {/* IMAGE */}
      <Link href={`/products/${productId}`} className="block overflow-hidden">
        <img
          src={imgSrc}
          alt={product.product_name}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
      </Link>

      {/* CONTENT */}
      <div className="p-4">

        {/* NAME */}
        <h3 className="font-semibold text-lg line-clamp-2 text-gray-800">
          {product.product_name}
        </h3>

        {/* PRICE */}
        <p className="mt-1 text-purple-600 font-extrabold text-lg">
          {Number(product.price || 0).toLocaleString()}đ
        </p>

        {/* BUTTON: DETAIL */}
        <Link
          href={`/products/${productId}`}
          className="mt-4 block w-full text-center bg-linear-to-r from-purple-100 to-indigo-100 text-purple-700 py-2 rounded-xl font-semibold hover:from-purple-200 hover:to-indigo-200 transition"
        >
          🔍 Xem chi tiết
        </Link>

        {/* BUTTON: ADD TO CART (DƯỚI) */}
        <button
          onClick={() => addToCart(product)}
          className="mt-2 w-full py-2 rounded-xl font-semibold text-white 
      bg-linear-to-r from-purple-600 to-indigo-600 
      hover:from-purple-700 hover:to-indigo-700 
      shadow-md hover:shadow-lg 
      transition-all duration-300 flex items-center justify-center gap-2"
        >
          🛒 Thêm vào giỏ hàng
        </button>

      </div>
    </div>
  );
}