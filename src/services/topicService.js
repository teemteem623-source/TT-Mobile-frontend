import axiosInstance from "@/lib/axiosInstance";

// ===============================
// 1. Lấy danh sách topic
// ===============================
export const getTopics = async (params = {}) => {
  const res = await axiosInstance.get("/topics", {
    params,
  });
  return res.data;
};

// ===============================
// 2. Lấy chi tiết topic
// ===============================
export const getTopicById = async (id) => {
  const res = await axiosInstance.get(`/topics/${id}`);
  return res.data;
};

// ===============================
// 3. Tạo topic mới
// ===============================
export const createTopic = async (data) => {
  const res = await axiosInstance.post("/topics", data);
  return res.data;
};

// ===============================
// 4. Cập nhật topic
// ===============================
export const updateTopic = async (id, data) => {
  const res = await axiosInstance.put(`/topics/${id}`, data);
  return res.data;
};

// ===============================
// 5. Xoá topic (soft delete)
// ===============================
export const deleteTopic = async (id) => {
  const res = await axiosInstance.delete(`/topics/${id}`);
  return res.data;
};
