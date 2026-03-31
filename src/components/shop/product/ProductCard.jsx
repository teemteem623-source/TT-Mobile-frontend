import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>

      <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 hover:scale-105 p-4 cursor-pointer">

        <img
          src={`/images/${process.env.NEXT_PUBLIC_IMG_URL + product.image}`}
          alt = {product.name}
          className="w-full h-48 object-cover rounded-lg"
        />

        <h3 className="mt-3 font-semibold text-lg line-clamp-2">
          {product.product_name}
        </h3>

        <p className="text-red-500 font-bold">
          {product.price.toLocaleString()}đ
        </p>
        <button>
          Thêm vào giỏ
        </button>

      </div>

    </Link>
  );
}