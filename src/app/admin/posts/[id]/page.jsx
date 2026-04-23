"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getPostById, updatePost } from "@/services/postsService";

const EditPostForm = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        topic_id: "",
        author_id: 1,
        status: 1,
        trash: 0,
    });

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    // 🚀 load data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPostById(id);

                setFormData({
                    title: data.title || "",
                    content: data.content || "",
                    topic_id: data.topic_id || "",
                    author_id: data.author_id || 1,
                    status: data.status ?? 1,
                    trash: data.trash ?? 0,
                });
            } catch (e) {
                setErrors({ message: "Lỗi load dữ liệu 💀" });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // 🧠 handle change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                ["topic_id", "status", "trash"].includes(name)
                    ? Number(value)
                    : value,
        }));
    };

    // 🚀 submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content) {
            setErrors({ message: "Thiếu tiêu đề hoặc nội dung 🤨" });
            return;
        }

        try {
            setLoading(true);

            await updatePost(id, formData);

            setSuccess("Cập nhật thành công 🎉");
            setErrors({});
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (e) {
            setErrors({
                message: e?.response?.data?.error || "Update thất bại 💀",
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-8 bg-linear-to-r from-purple-50 via-white to-indigo-50 shadow-2xl rounded-3xl transition-all duration-300">

            {/* BACK */}
            <button
                onClick={() => (window.location.href = "/admin/posts")}
                className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition"
            >
                ← Quay lại
            </button>

            {/* TITLE */}
            <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-600">
                ✏️ Chỉnh sửa bài viết
            </h2>

            {/* ALERT */}
            {success && (
                <p className="text-green-600 flex items-center gap-2 mb-4">
                    🎉 {success}
                </p>
            )}
            {errors.message && (
                <p className="text-red-600 flex items-center gap-2 mb-4">
                    ❌ {errors.message}
                </p>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* TITLE */}
                <div>
                    <label className="font-semibold mb-1 block">
                        Tiêu đề:
                    </label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Nhập tiêu đề..."
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>

                {/* CONTENT */}
                <div>
                    <label className="font-semibold mb-1 block">
                        Nội dung:
                    </label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Nhập nội dung bài viết..."
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>

                {/* TOPIC */}
                <div>
                    <label className="font-semibold mb-1 block">
                        Topic ID:
                    </label>
                    <input
                        type="number"
                        name="topic_id"
                        value={formData.topic_id}
                        onChange={handleChange}
                        placeholder="Nhập topic..."
                        className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>

                {/* STATUS + TRASH */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold mb-1 block">
                            Trạng thái:
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        >
                            <option value={1}>Hiển thị</option>
                            <option value={0}>Ẩn</option>
                        </select>
                    </div>

                    <div>
                        <label className="font-semibold mb-1 block">
                            Trash:
                        </label>
                        <select
                            name="trash"
                            value={formData.trash}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                        >
                            <option value={0}>Không</option>
                            <option value={1}>Có</option>
                        </select>
                    </div>
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-2xl text-white font-semibold bg-linear-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 shadow-lg hover:shadow-indigo-400 transition-all duration-300"
                >
                    {loading ? "Đang cập nhật..." : "Cập nhật bài viết"}
                </button>
            </form>
        </div>
    );
};

export default EditPostForm;