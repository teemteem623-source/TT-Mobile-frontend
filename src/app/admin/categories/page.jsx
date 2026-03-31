export default function Page() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">
          Danh sách danh mục
        </h1>
        <p className="text-gray-600 text-lg">
          Quản lý các danh mục sản phẩm trong hệ thống
        </p>
      </div>

      {/* Placeholder card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center text-gray-400 h-64">
        Chưa có dữ liệu danh mục.
      </div>
    </div>
  );
}