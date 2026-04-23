"use client";
import PageList from "@/components/shop/page/PageList";
import PostList from "@/components/shop/post/PostList";
import ProductList from "@/components/shop/product/ProductList";
import { getNewPages } from "@/services/pageService";
import { getNewPosts } from "@/services/postsService";
import { getBestSellerProducts, getNewProducts } from "@/services/productService";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [newProducts, setNewProducts] = useState([]);
    const [bestSellerProducts, setBestSellerProducts] = useState([]);
    const [newPages, setNewPages] = useState([]);
    const [newPosts, setNewPosts] = useState([]);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                //product
                const data = await getNewProducts();
                setNewProducts(data);
                const data1 = await getBestSellerProducts();
                setBestSellerProducts(data1);

                //page
                const data2 = await getNewPages();
                setNewPages(data2);

                //post
                const data3 = await getNewPosts();
                setNewPosts(data3);


            } catch (e) {
                setErrors({ message: e?.message || "Lỗi tải dữ liệu" });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {errors.message && <p>{errors.message}</p>}
            {loading ? "Đang tải..." : <ProductList products={newProducts} title={"Sản phẩm mới "} />}
            {loading ? "Đang tải..." : <ProductList products={bestSellerProducts} title={"Sản phẩm bán chạy "} />}
            {loading ? "Đang tải..." : <PageList pages={newPages} title={"Thông tin mới"} />}
            {loading ? "Đang tải..." : <PostList posts={newPosts} title={"Bài viết mới"} />}


        </div>
    );
}