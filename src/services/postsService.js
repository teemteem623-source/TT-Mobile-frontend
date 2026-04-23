import axiosInstance from "@/lib/axiosInstance";

// ===============================
// 1. Lấy danh sách bài viết
// ===============================
export const getPosts = async (params = {}) => {
  const res = await axiosInstance.get("/posts", {
    params,
  });
  return res.data;
};

// ===============================
// 2. Chi tiết bài viết
// ===============================
export const getPostById = async (id) => {
  const res = await axiosInstance.get(`/posts/${id}`);
  return res.data;
};

// ===============================
// 3. Tạo bài viết
// ===============================
export const createPost = async (data) => {
  const res = await axiosInstance.post("/posts", data);
  return res.data;
};

// ===============================
// 4. Cập nhật bài viết
// ===============================
export const updatePost = async (id, data) => {
  const res = await axiosInstance.put(`/posts/${id}`, data);
  return res.data;
};

// ===============================
// 5. Xoá bài viết
// ===============================
export const deletePost = async (id) => {
  const res = await axiosInstance.delete(`/posts/${id}`);
  return res.data;
};

// ===============================
// 6. Bài viết mới nhất
// ===============================
export const getNewPosts = async (limit = 6) => {
  const res = await axiosInstance.get("/posts");

  const data =
    res?.data?.data || // Laravel pagination
    res?.data ||       // API bọc data
    res || [];

  return data
    .filter(p => p.status === 1 && p.trash === 0)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);
};
