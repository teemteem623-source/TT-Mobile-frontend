"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthProvider";

import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        // 👉 chỉ check khi load xong
        if (!loading) {
            if (!user || user.user_type?.toLowerCase() !== "admin") {
                router.push("/");
            }
        }
    }, [user, loading, router]);

    // 👉 đang load thì đợi
    if (loading) {
        return <p className="p-10">Loading...</p>;
    }

    // 👉 không phải admin thì không render
    if (!user || user.user_type?.toLowerCase() !== "admin") {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg border-r border-gray-200 fixed h-full">
                <Sidebar />
            </aside>

            {/* Content area */}
            <div className="flex-1 flex flex-col ml-64">

                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200">
                    <AdminHeader />
                </header>

                {/* Main content */}
                <main className="flex-1 p-6 bg-gray-100">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-gray-200 min-h-[calc(100vh-64px)]">
                        {children}
                    </div>
                </main>

            </div>

        </div>
    );
}