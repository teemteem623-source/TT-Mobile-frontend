"use client";

import React, { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";
import Select from "./Select";
import { isEmpty } from "@/utils/validators";

export default function CategorySelect({
    name,
    value,
    onChange,
}) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getCategories({ trash: 0 });
                setCategories(data);
            } catch (e) {
                setErrors({
                    message: e?.data?.error || "Lỗi tải danh mục",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // ✅ FIX QUAN TRỌNG
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
            {!isEmpty(errors) ? (
                <p>{errors.message}</p>
            ) : loading ? (
                "loading categories"
            ) : (
                <Select
                    name={name}                
                    value={value || ""}        
                    onChange={handleSelectChange} 
                    options={categories}
                    valueKey="cat_id"
                    labelKey="cat_name"
                />
            )}
        </div>
    );
}