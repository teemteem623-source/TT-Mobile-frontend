import { FaChartLine, FaBox, FaUsers } from "react-icons/fa";

export default function Page() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-800 mb-2">
          Trang quản lý
        </h1>
        <p className="text-gray-600 text-lg">
          Quản lý sản phẩm, đơn hàng và người dùng trong hệ thống
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaBox className="text-purple-500 text-3xl" />
          <div>
            <h2 className="text-2xl font-semibold">42</h2>
            <p className="text-gray-500">Sản phẩm</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaChartLine className="text-purple-500 text-3xl" />
          <div>
            <h2 className="text-2xl font-semibold">128</h2>
            <p className="text-gray-500">Đơn hàng</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
          <FaUsers className="text-purple-500 text-3xl" />
          <div>
            <h2 className="text-2xl font-semibold">76</h2>
            <p className="text-gray-500">Người dùng</p>
          </div>
        </div>
      </div>
    </div>
  );
}