import axiosInstance from "@/lib/axiosInstance";

// ===============================
// 1. Lấy danh sách category
// ===============================
export const getCategories = async (params = {}) => {
  const res = await axiosInstance.get("/categories", {
    params: params
  });
  return res.data;
};


// ===============================
// 2. Lấy chi tiết category
// ===============================
export const getCategoryById = async (id) => {
  const res = await axiosInstance.get(`/categories/${id}`);
  return res.data;
};


// ===============================
// 3. Tạo category mới
// ===============================
export const createCategory = async (data) => {
  const res = await axiosInstance.post("/categories", data);
  return res.data;
};


// ===============================
// 4. Cập nhật category
// ===============================
export const updateCategory = async (id, data) => {
  const res = await axiosInstance.put(`/categories/${id}`, data);
  return res.data;
};


// ===============================
// 5. Xoá category (soft delete)
// ===============================
export const deleteCategory = async (id) => {
  const res = await axiosInstance.delete(`/categories/${id}`);
  return res.data;
};