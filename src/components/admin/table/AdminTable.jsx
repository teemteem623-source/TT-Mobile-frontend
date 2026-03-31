import React from "react";
import Table from "@/components/common/Table";
import { formatCurrency } from "@/utils/formatCurrency";

export default function AdminTable({
    data = [],
    columns = [],
    onEdit,
    onDelete,
}) {
    const extendedColumns = [
        ...columns,
        { key: "action", label: "Hành động" },
    ];

    const newData = data.map((item, index) => ({
        ...item,

        price: item.price ? formatCurrency(item.price) : "0 ₫",
        sale_price: item.sale_price
            ? formatCurrency(item.sale_price)
            : "0 ₫",

        price_display: (
            <div className="flex flex-col items-center">
                <span className="line-through text-purple-300 text-xs">
                    {formatCurrency(item.price || 0)}
                </span>
                <span className="text-purple-600 font-semibold">
                    {formatCurrency(item.sale_price || item.price || 0)}
                </span>
            </div>
        ),

        action: (
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => onEdit && onEdit(item)}
                    className="px-3 py-1 text-xs font-medium bg-purple-500 text-white rounded-lg 
                    hover:bg-purple-600 transition duration-200
                    hover:-translate-y-0.5 hover:shadow-lg
                    active:scale-95"
                >
                    Sửa
                </button>
                <button
                    onClick={() => onDelete && onDelete(item)}
                    className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-lg 
                    hover:bg-purple-200 transition duration-200 border border-purple-300
                    hover:-translate-y-0.5 hover:shadow-md
                    active:scale-95"
                >
                    Xóa
                </button>
            </div>
        ),
    }));

    return (
        <div className="bg-white p-4 rounded-xl shadow-md border border-purple-200">
            {/* 👇 thêm wrapper để tạo hiệu ứng hover cho table */}
            <div className="overflow-hidden rounded-lg">
                <Table
                    columns={extendedColumns}
                    data={newData}
                    rowKey="product_id"
                />
            </div>
        </div>
    );
}