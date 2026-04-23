import axiosInstance from "@/lib/axiosInstance";

// ===============================
// 1. Lấy danh sách brand
// ===============================
export const getBrands = async (params = {}) => {
  const res = await axiosInstance.get("/brands", {
    params: params,
  });
  return res.data;
};

// ===============================
// 2. Lấy chi tiết brand
// ===============================
export const getBrandById = async (id) => {
  const res = await axiosInstance.get(`/brands/${id}`);
  return res.data;
};

// ===============================
// 3. Tạo brand mới
// ===============================
export const createBrand = async (data) => {
  const res = await axiosInstance.post("/brands", data);
  return res.data;
};

// ===============================
// 4. Cập nhật brand
// ===============================
export const updateBrand = async (id, data) => {
  const res = await axiosInstance.put(`/brands/${id}`, data);
  return res.data;
};

// ===============================
// 5. Xoá brand (soft delete)
// ===============================
export const deleteBrand = async (id) => {
  const res = await axiosInstance.delete(`/brands/${id}`);
  return res.data;
};
