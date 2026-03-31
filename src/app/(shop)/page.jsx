"use client";

import React, { useState } from "react";
import Select from "@/components/common/Select";
import CategorySelect from "@/components/common/CategorySelect";

export default function Page() {
    const data = [
        { id: 1, name: "HOA TƯƠI" },
        { id: 2, name: "HOA CẮT CÀNH" }
    ];

    const [formData, setFormData] = useState({
        cat_id: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <h1>Trang Chủ</h1>

            <Select options={data} valueKey="id"labelKey="name"/>

            <br /><br />

            <CategorySelect name="cat_id" value={formData.cat_id} onChange={handleChange}/>

        </div>
    );
}