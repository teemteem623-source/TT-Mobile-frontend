import axiosInstance from "@/lib/axiosInstance";

// ===============================
// 1. Lấy danh sách page
// ===============================
export const getPages = async (params = {}) => {
  const res = await axiosInstance.get("/pages", {
    params,
  });
  return res.data;
};

// ===============================
// 2. Lấy chi tiết page
// ===============================
export const getPageById = async (id) => {
  const res = await axiosInstance.get(`/pages/${id}`);
  return res.data;
};

// ===============================
// 3. Tạo page mới
// ===============================
export const createPage = async (data) => {
  const res = await axiosInstance.post("/pages", data);
  return res.data;
};

// ===============================
// 4. Cập nhật page
// ===============================
export const updatePage = async (id, data) => {
  const res = await axiosInstance.put(`/pages/${id}`, data);
  return res.data;
};

// ===============================
// 5. Xoá page (soft delete)
// ===============================
export const deletePage = async (id) => {
  const res = await axiosInstance.delete(`/pages/${id}`);
  return res.data;
};

// ===============================
// 6. Lấy thông tin mới nhất
// ===============================
export const getNewPages = async (limit = 6) => {
  const res = await axiosInstance.get("/pages");

  const data =
    res?.data?.data || // Laravel pagination
    res?.data || // API thường
    res ||
    [];

  return data
    .filter((p) => p.status === 1 && p.trash === 0)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);
};
