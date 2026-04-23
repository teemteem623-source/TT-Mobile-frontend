import axiosInstance from "@/lib/axiosInstance";

// ===============================
// 1. Lấy danh sách user
// ===============================
export const getUsers = async (params = {}) => {
  const res = await axiosInstance.get("/users", {
    params: params,
  });
  return res.data;
};

// ===============================
// 2. Lấy chi tiết user
// ===============================
export const getUserById = async (id) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res.data;
};

// ===============================
// 3. Tạo user mới
// ===============================
export const createUser = async (data) => {
  const res = await axiosInstance.post("/users", data);
  return res.data;
};

// ===============================
// 4. Cập nhật user
// ===============================
export const updateUser = async (id, data) => {
  const res = await axiosInstance.put(`/users/${id}`, data);
  return res.data;
};

// ===============================
// 5. Xoá user (soft delete)
// ===============================
export const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
};