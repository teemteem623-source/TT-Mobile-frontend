import ProductCard from "./ProductCard";

export default function ProductList({ products, title }) {
    return (
        <div>
            <div>
                <h1 className="text-2xl text-center font-bold mb-5 "> {title} </h1>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {products.map((item) => (
                    <ProductCard key={item.product_id} product={item} />
                ))}
            </div>

        </div>

    );
}