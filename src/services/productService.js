import axiosInstance from "@/lib/axiosInstance"; 
 
// =============================== 
// 1. Lấy danh sách sản phẩm  
// =============================== 
export const getProducts = async (params = {}) => { 
  const res = await axiosInstance.get("/products", { 
    params: params 
  }); 
  return res.data; 
};

// ===============================
// 2. Lấy chi tiết sản phẩm
// ===============================
export const getProductById = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

// ===============================
// 3. Tạo sản phẩm mới
// ===============================
export const createProduct = async (data) => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};


// ===============================
// 4. Cập nhật sản phẩm
// ===============================
export const updateProduct = async (id, data) => {
  const res = await axiosInstance.put(`/products/${id}`, data);
  return res.data;
};


// ===============================
// 5. Xoá sản phẩm (soft delete)
// ===============================
export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};


// ===============================
// 6. Lấy sản phẩm mới
// ===============================
export const getNewProducts = async (limit = 10) => {
  const res = await axiosInstance.get("/products/new", {
    params: { limit }
  });
  return res.data;
};


// ===============================
// 7. Lấy sản phẩm bán chạy
// ===============================
export const getBestSellerProducts = async (limit = 5) => {
  const res = await axiosInstance.get("/products/bestseller", {
    params: { limit }
  });
  return res.data;
};


// ===============================
// 8. Lấy sản phẩm liên quan
// ===============================
export const getRelatedProducts = async (id, limit = 5) => {
  const res = await axiosInstance.get(`/products/related/${id}`, {
    params: { limit }
  });
  return res.data;
};