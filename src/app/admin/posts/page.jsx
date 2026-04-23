"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import Link from "next/link";
import { getPosts, deletePost } from "@/services/postsService";

export default function AdminPostsPage() {
    const [posts, setPosts] = useState([]);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const [params, setParams] = useState({
        page: 1,
        limit: 10,
        trash: 0,
    });

    const router = useRouter();

    const columns = [
        { key: "post_id", label: "ID" },
        { key: "title", label: "Tiêu đề" },
        { key: "topic_id", label: "Topic" },
        { key: "status", label: "Trạng thái" },
        { key: "created_at", label: "Ngày tạo" },
    ];

    // 🔥 FIX CHÍNH Ở ĐÂY
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await getPosts(params);

            const list =
                res?.data?.data || 
                res?.data ||       
                res || [];         

            const total =
                res?.data?.totalPage ||
                res?.totalPage ||
                Math.ceil(list.length / params.limit) || 1;

            const filtered = list.filter(
                (item) => item.trash === params.trash
            );

            setPosts(filtered);
            setTotalPages(total);

        } catch (e) {
            setErrors({
                message: e?.message || "Lỗi tải dữ liệu",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    const handleEdit = (post) => {
        router.push(`/admin/posts/${post.post_id}`);
    };

    const handleDelete = async (post) => {
        const confirmDelete = window.confirm(
            `Xóa bài viết "${post.title}"?`
        );

        if (!confirmDelete) return;

        try {
            setLoading(true);
            setErrors({});
            setSuccess("");

            await deletePost(post.post_id);

            setSuccess("Xóa bài viết thành công ");

            fetchData();
        } catch (e) {
            setErrors({
                message: "Xóa thất bại!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">
                    Quản lý bài viết
                </h1>

                <Link
                    href="/admin/posts/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    + Tạo bài viết
                </Link>
            </div>

            {/* STATUS */}
            <div className="h-6">
                {loading && (
                    <p className="text-sm text-gray-500">
                        Đang tải...
                    </p>
                )}
            </div>

            {success && <p className="text-green-600">{success}</p>}
            {errors.message && <p className="text-red-500">{errors.message}</p>}

            {/* TABLE */}
            <AdminTable
                columns={columns}
                data={posts}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* PAGINATION */}
            <Pagination
                totalPages={totalPages}
                params={params}
                onChangeParams={setParams}
            />
        </div>
    );
}