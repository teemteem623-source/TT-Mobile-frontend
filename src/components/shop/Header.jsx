"use client";

import Link from "next/link";
import Userinfo from "@/components/shop/auth/userinfo";
<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>

export default function Header() {
    return (
        <div className="w-full flex items-center text-purple-900 h-20 px-6 bg-linear-to-r from-purple-200/60 via-violet-200/60 to-indigo-200/60 backdrop-blur-xl">

            {/* Logo 15% */}
            <div className="flex items-center justify-start basis-[15%]">
                <div className="font-bold text-2xl">
                    <Link href="/" className="hover:text-purple-700 transition">
                        TT Shop
                    </Link>
                </div>
            </div>

            {/* Trang chủ 10% */}
            <div className="flex items-center justify-center basis-[10%]">
                <Link href="/" className="hover:text-purple-700 transition">
                    Trang chủ
                </Link>
            </div>

            {/* Thanh tìm kiếm 30% */}
            <div className="flex items-center justify-center basis-[35%]">
                <div className="flex w-full overflow-hidden rounded-xl bg-white/80 shadow-sm focus-within:ring-2 focus-within:ring-purple-400">

                    {/* Input */}
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        className="flex-1 px-4 py-2 text-gray-800 outline-none bg-transparent"
                    />

                    {/* Button */}
                    <button className="px-4 bg-purple-500 hover:bg-purple-600 text-white transition">
                        🔍
                    </button>

                </div>
            </div>

            {/* Sản phẩm 10% */}
            <div className="flex items-center justify-center basis-[10%]">
                <Link href="/products" className="hover:text-purple-700 transition">
                    Sản phẩm
                </Link>
            </div>

            {/* Liên hệ 10% */}
            <div className="flex items-center justify-center basis-[10%]">
                <Link href="/contact" className="hover:text-purple-700 transition">
                    Liên hệ
                </Link>
            </div>

            {/* Bài viết 10% */}
            <div className="flex items-center justify-center basis-[10%]">
                <Link href="/posts" className="hover:text-purple-700 transition">
                    Bài viết
                </Link>
            </div>

            {/* Avatar 15% */}
            <div className="flex items-center justify-end basis-[10%]">
                <Userinfo />
            </div>
        </div>
    );
}