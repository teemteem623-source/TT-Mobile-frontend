"use client";

import React, { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService";
import Select from "./Select";
import { isEmpty } from "@/utils/validators";



export default function CategorySelect({

}) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    // goi api
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const data = await getCategories({
                    trash: 0
                });

                setCategories(data);
            } catch (e) {
                setErrors({
                    message: e?.data?.error || "Lỗi tải danh mục"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    console.log(categories);

    return (
        <div>
            {!isEmpty(errors) ? <p>{errors.message}</p> : loading ? "loading categories" : <Select options={categories} valueKey="cat_id" labelKey="cat_name" />}
        </div>
    );
}