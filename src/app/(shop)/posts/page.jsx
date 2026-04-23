"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/services/postsService";
import PostList from "@/components/shop/post/PostList";
import Loading from "@/components/common/loading";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getPosts({
          page: 1,
          limit: 12,
          status: 1,
          trash: 0,
        });

        const list =
          res?.data?.data ||
          res?.data ||
          res ||
          [];

        setPosts(Array.isArray(list) ? list : []);
      } catch (e) {
        setError(e?.message || "Lỗi tải bài viết");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          📝 Bài viết
        </h1>
        <p className="text-gray-500 mt-2">
          Tin tức / chia sẻ / hướng dẫn
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-500 text-center mb-4">
          {error}
        </p>
      )}

      {/* LOADING */}
      {loading ? (<Loading/>) : (<p className="text-center text-gray-500"> Đang tải bài viết...</p>) && posts.length > 0 ? (  <PostList posts={posts} title="" />) : (<p className="text-center text-gray-500">  Chưa có bài viết </p>)}

    </div>
  );
}