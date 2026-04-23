"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { validateProduct, isEmpty } from "@/utils/validators";
import { getProductById, updateProduct, } from "@/services/productService";
import CategorySelect from "@/components/common/CategorySelect";
import BrandSelect from "@/components/common/BrandSelect";
import UploadSingleFile from "@/components/admin/Upload";

const EditForm = () => {
  const { id } = useParams();
  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẵ|ặ|â|ấ|ầ|ẫ|ậ/g, "a")
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ễ|ệ/g, "e")
      .replace(/í|ì|ỉ|ĩ|ị/g, "i")
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ỗ|ộ|ơ|ớ|ờ|ỡ|ợ/g, "o")
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ữ|ự/g, "u")
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
      .replace(/đ/g, "d")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-");
  };

  const [formData, setFormData] = useState({
    product_name: "",
    alias: "",
    cat_id: "",
    brand_id: "",
    detail: "",
    price: "",
    sale_price: "",
    image: "",
    launch_date: "",
    tag: "",
    summary: "",
    status: 1,
    trash: 0,
    view: 50,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");

  // load dữ liệu cũ
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getProductById(id);

        setFormData({
          product_name: data.product_name || "",
          alias: data.alias || "",
          cat_id: data.cat_id || "",
          brand_id: data.brand_id || "",
          detail: data.detail || "",
          price: data.price || "",
          sale_price: data.sale_price || "",
          image: data.image || "",
          launch_date: data.launch_date
            ? data.launch_date.slice(0, 16)
            : "",
          tag: data.tag || "",
          summary: data.summary || "",
          status: data.status ?? 1,
          trash: data.trash ?? 0,
          view: data.view ?? 50,
        });
      } catch (e) {
        setErrors({
          message:
            e?.response?.data?.error ||
            "Lỗi tải dữ liệu",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // handle change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;

    if (
      type === "number" ||
      name === "cat_id" ||
      name === "brand_id" ||
      name === "status" ||
      name === "trash" ||
      name === "view"
    ) {
      newValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: newValue,
      };

      if (name === "product_name") {
        updated.alias = slugify(newValue);
      }

      return updated;
    });
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.replace("T", " ") + ":00";
  };

  // submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateErrors = validateProduct(formData);
    setErrors(validateErrors);

    if (!isEmpty(validateErrors)) return;

    try {
      setLoading(true);

      const submitData = {
        ...formData,
        launch_date: formatDate(formData.launch_date),
      };

      await updateProduct(id, submitData);

      setSuccess("Cập nhật sản phẩm thành công 🎉");
      setErrors({});
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setErrors({
        message:
          e?.response?.data?.error ||
          "Lỗi cập nhật",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleUploadSuccess = (fileName) => {
    setFormData((prev) => ({
      ...prev,
      image: fileName
    }));
  };

  if (loading) {
    return (
      <p className="text-center mt-10">
        Đang tải dữ liệu...
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-linear-to-r from-purple-50 via-white to-purple-50 shadow-2xl rounded-3xl transition-all duration-300">
      <button
        onClick={() => (window.location.href = "/admin/products")}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold"
      >
        ← Quay lại
      </button>
      <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-600">
        ✏️ Cập nhật sản phẩm
      </h2>

      {success && (
        <p className="text-green-600 flex items-center gap-2 mb-4">
          🎉 {success}
        </p>
      )}

      {errors.message && (
        <p className="text-red-600 flex items-center gap-2 mb-4">
          ❌ {errors.message}
        </p>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Tên + Alias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold mb-1 block">
              Tên sản phẩm:
            </label>
            <input
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
            {errors.product_name && <p className="text-red-500">{errors.product_name}</p>}
          </div>

          <div>
            <label className="font-semibold mb-1 block">
              Alias:
            </label>
            <input
              name="alias"
              value={formData.alias}
              onChange={handleChange}
              placeholder="Tự động tạo từ tên sản phẩm..."
              disabled
              className="w-full p-3 border border-gray-300 rounded-xl bg-gray-100 cursor-not-allowed"
            />
            {errors.alias && <p className="text-red-500">{errors.alias}</p>}
          </div>
        </div>

        {/* Danh mục + Thương hiệu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold mb-1 block">
              Danh mục:
            </label>
            <div className="w-full border border-gray-300 rounded-xl p-2">
              <CategorySelect
                name="cat_id"
                value={formData.cat_id}
                onChange={handleChange}
              />
              {errors.cat_id && <p className="text-red-500">{errors.cat_id}</p>}
            </div>
          </div>

          <div>
            <label className="font-semibold mb-1 block">
              Thương hiệu:
            </label>
            <div className="w-full border border-gray-300 rounded-xl p-2">
              <BrandSelect
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
              />
              {errors.brand_id && <p className="text-red-500">{errors.brand_id}</p>}
            </div>
          </div>
        </div>

        {/* Giá + Giá sale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold mb-1 block">
              Giá:
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>

          <div>
            <label className="font-semibold mb-1 block">
              Giá khuyến mãi:
            </label>
            <input
              type="number"
              name="sale_price"
              value={formData.sale_price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
            {errors.sale_price && <p className="text-red-500">{errors.sale_price}</p>}
          </div>
        </div>

        {/* Ảnh */}
        <div>
          <label className="font-semibold mb-1 block">
            Ảnh:
          </label>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl"
          />
          {errors.image && <p className="text-red-500">{errors.image}</p>}
        </div>
        <UploadSingleFile onUploadSuccess={handleUploadSuccess} />


        {/* Status + Trash + View */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label>Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
            >
              <option value={1}>Hiển thị</option>
              <option value={0}>Ẩn</option>
            </select>
            {errors.status && <p className="text-red-500">{errors.status}</p>}
          </div>

          <div>
            <label>Trash:</label>
            <select
              name="trash"
              value={formData.trash}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
            >
              <option value={0}>Không</option>
              <option value={1}>Có</option>
            </select>
            {errors.trash && <p className="text-red-500">{errors.trash}</p>}
          </div>

          <div>
            <label>View:</label>
            <input
              type="number"
              name="view"
              value={formData.view}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
            {errors.view && <p className="text-red-500">{errors.view}</p>}
          </div>
        </div>

        {/* Ngày ra mắt */}
        <div>
          <label>Ngày ra mắt:</label>
          <input
            type="datetime-local"
            name="launch_date"
            value={formData.launch_date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl"
          />
          {errors.launch_date && <p className="text-red-500">{errors.launch_date}</p>}
        </div>

        {/* Tag */}
        <div>
          <label>Tag:</label>
          <input
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl"
          />
          {errors.tag && <p className="text-red-500">{errors.tag}</p>}
        </div>

        {/* Summary */}
        <div>
          <label>Tóm tắt:</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl"
          />
          {errors.summary && <p className="text-red-500">{errors.summary}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl text-white font-semibold bg-linear-to-r from-purple-500 to-indigo-500"
        >
          {loading
            ? "Đang cập nhật..."
            : "Cập nhật sản phẩm"}
        </button>
      </form>
    </div>
  );
};

export default EditForm;