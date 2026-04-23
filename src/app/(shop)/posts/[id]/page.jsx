"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "@/components/common/loading";
import { getPostById } from "@/services/postsService";

export default function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // fetch detail
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        setLoading(true);

        const data = await getPostById(id);

        setPost(data);
      } catch (e) {
        setError(e?.message || "Lỗi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="px-6 py-6">

      {/* TITLE HEADER */}
      <h1 className="text-xl font-semibold mb-4">
        Chi tiết bài viết {id}
      </h1>

      {/* ERROR */}
      {error && (<p className="text-red-500 mb-4">{error}</p>)}

      {/* CONTENT */}
      {loading ? (<Loading />) : (<div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-3xl font-bold mb-3">{post.title}</h2>
          <div className="text-sm text-gray-500 mb-6">{post.created_at &&new Date(post.created_at).toLocaleDateString()}</div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || "", }}/>
        </div>
      )}
    </div>
  );
}