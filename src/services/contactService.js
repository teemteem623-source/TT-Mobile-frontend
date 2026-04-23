import axiosInstance from "@/lib/axiosInstance";

// ===============================
// 1. Lấy danh sách contact
// ===============================
export const getContacts = async (params = {}) => {
  const res = await axiosInstance.get("/contacts", {
    params: params,
  });
  return res.data;
};

// ===============================
// 2. Lấy chi tiết contact
// ===============================
export const getContactById = async (id) => {
  const res = await axiosInstance.get(`/contacts/${id}`);
  return res.data;
};

// ===============================
// 3. Tạo contact mới
// ===============================
export const createContact = async (data) => {
  const res = await axiosInstance.post("/contacts", data);
  return res.data;
};

// ===============================
// 4. Cập nhật contact
// ===============================
export const updateContact = async (id, data) => {
  const res = await axiosInstance.put(`/contacts/${id}`, data);
  return res.data;
};

// ===============================
// 5. Xoá contact (soft delete)
// ===============================
export const deleteContact = async (id) => {
  const res = await axiosInstance.delete(`/contacts/${id}`);
  return res.data;
};
