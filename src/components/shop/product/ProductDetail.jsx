export default function ProductDetail({ product }) {
  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 p-6 bg-white shadow rounded-xl">

      <img
        src={`/images/${product.image}`}
        className="w-full h-100 rounded-lg"
      />

      <div>
        <h2 className="text-3xl font-bold mb-4">
          {product.name}
        </h2>

        <p className="text-red-500 text-2xl font-semibold mb-4">
          {product.price.toLocaleString()}đ
        </p>

        <p className="text-gray-600">
          Danh mục: {product.category}
        </p>
      </div>

    </div>
  );
}