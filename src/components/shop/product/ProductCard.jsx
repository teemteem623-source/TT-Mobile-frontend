export default function ProductCard() {
  return (
    <div className="border rounded-xl p-4 hover:shadow-lg transition">
      
      <h2 className="font-semibold mb-2">
        iPhone 15
      </h2>

      <p className="text-red-600 font-bold mb-3">
        20.000.000đ
      </p>

      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition">
        Mua ngay
      </button>

    </div>
  );
}