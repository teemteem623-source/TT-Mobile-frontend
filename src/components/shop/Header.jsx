"use client";

import Link from "next/link";
import Userinfo from "@/components/shop/auth/userinfo";
import { useCart } from "@/context/CardContext";
import { shopMenu } from "@/data/menu";

export default function Header() {
    const { totalItems } = useCart();

    return (
        <div className="w-full flex items-center text-purple-900 h-20 px-6 bg-linear-to-r from-purple-200/60 via-violet-200/60 to-indigo-200/60 backdrop-blur-xl">

            {/* LOGO */}
            <div className="basis-[22%]">
                <h1 className="font-bold text-2xl">
                    <Link href="/" className="hover:text-purple-700 transition">
                        TT Shop
                    </Link>
                </h1>
            </div>

            {/* MENU */}
            <div className="basis-[50%] flex items-center justify-between font-medium px-6">

                {shopMenu.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="hover:text-purple-700 transition hover:scale-105"
                    >
                        {item.label}
                    </Link>
                ))}

            </div>

            {/* RIGHT */}
            <div className="basis-[28%] flex justify-end items-center gap-6">

                {/* CART */}
                <Link
                    href="/cart"
                    className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg transition
                     hover:bg-purple-100 hover:text-purple-700 active:scale-95"
                >
                    <span className="text-xl">🛒</span>

                    {totalItems > 0 && (
                        <span className="absolute -top-2 left-4 bg-red-500 text-white text-xs px-1.5 rounded-full">
                            {totalItems}
                        </span>
                    )}
                </Link>

                {/* USER */}
                <Userinfo />

            </div>
        </div>
    );
}