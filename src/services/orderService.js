import axiosInstance from "@/lib/axiosInstance";

// ===============================
// 1. Lấy danh sách order
// ===============================
export const getOrders = async (params = {}) => {
  const res = await axiosInstance.get("/orders", {
    params: params
  });
  return res.data;
};


// ===============================
// 2. Lấy chi tiết order
// ===============================
export const getOrderById = async (id) => {
  const res = await axiosInstance.get(`/orders/${id}`);
  return res.data;
};


// ===============================
// 3. Tạo order mới
// ===============================
export const createOrder = async (data) => {
  const res = await axiosInstance.post("/orders", data);
  return res.data;
};


// ===============================
// 4. Cập nhật trạng thái order
// ===============================
export const updateOrderStatus = async (id, status) => {
  const res = await axiosInstance.patch(`/orders/${id}/status`, {
    status: status
  });
  return res.data;
};


// ===============================
// 5. Xoá order
// ===============================
export const deleteOrder = async (id) => {
  const res = await axiosInstance.delete(`/orders/${id}`);
  return res.data;
};