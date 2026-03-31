import axiosInstance from "@/lib/axiosInstance";

export const getBrands = async (params = {}) => {
    const response = await axiosInstance.get("/brands", {
        params,
    });

    return response.data;
};