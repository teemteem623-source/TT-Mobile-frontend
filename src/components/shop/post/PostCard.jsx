"use client";

import Link from "next/link";

export default function PostCard({ post }) {
    return (
        <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition">

            {/* TITLE */}
            <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                {post.title}
            </h2>

            {/* CONTENT PREVIEW */}
            <p className="text-gray-500 mt-2 line-clamp-3">
                {post.content}
            </p>

            {/* BUTTON */}
            <Link
                href={`/posts/${post.post_id}`}
                className="inline-block mt-4 text-purple-600 font-semibold hover:underline"
            >
                Xem chi tiết →
            </Link>

        </div>
    );
}