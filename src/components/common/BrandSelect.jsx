"use client";

import React, { useEffect, useState } from "react";
import { getBrands } from "@/services/brandService";
import Select from "./Select";

export default function BrandSelect({
  name,
  value,
  onChange
}) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getBrands({ trash: 0 });
        setBrands(data);
      } catch (e) {
        setErrors({
          message: e?.data?.error || "Lỗi tải thương hiệu"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;

    onChange({
      target: {
        name,
        value: selectedValue === "" ? "" : Number(selectedValue),
      },
    });
  };

  return (
    <div>
      {errors.message ? (
        <p>{errors.message}</p>
      ) : loading ? (
        "loading brands"
      ) : (
        <Select
          name={name}
          value={value || ""}
          onChange={handleSelectChange}  
          options={brands}
          valueKey="brand_id"
          labelKey="brand_name"
        />
      )}
    </div>
  );
}