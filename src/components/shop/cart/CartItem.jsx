"use client"
import { useCart } from "@/context/CardContext";

export default function CartItem({ item, onUpdateQuantity }) {
    const { removeFromCart } = useCart();

    return (
        <div className="flex items-center justify-between gap-4 p-4 border rounded-xl shadow-sm bg-white">

            {/* Tên sản phẩm */}
            <span className="flex-1 font-medium text-gray-800">
                {item.product_name}
            </span>

            {/* Số lượng */}
            <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                    onUpdateQuantity?.(item.product_id, Number(e.target.value))
                }
                className="w-16 text-center border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-purple-400"
            />

            {/* Giá */}
            <span className="w-28 text-right font-semibold text-gray-700">
                {item.price.toLocaleString("vi-VN")} đ
            </span>

            {/* Xóa */}
            <button
                onClick={() => removeFromCart(item.product_id)}
                className="text-red-500 hover:text-red-700 font-semibold transition"
            >
                Delete
            </button>

        </div>
    );
}