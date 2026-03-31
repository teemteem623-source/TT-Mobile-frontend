"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { logout } from "@/services/authService";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
    const { setUser, user } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = () => {
        logout();        
        setUser(null);   

        router.push("/login");
    };

    return (
        <div className="flex justify-between items-center bg-white px-6 py-4 shadow">

            <h2 className="text-lg font-semibold">
                Xin chào {user?.username || "Admin"}
            </h2>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
                Đăng xuất
            </button>

        </div>
    );
}