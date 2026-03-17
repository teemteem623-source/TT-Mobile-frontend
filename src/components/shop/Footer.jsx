export default function Footer() {
    return (
        <div className="bg-linear-to-r from-[#0f172a] via-[#1e293b] to-[#1e1b4b] text-gray-300">

            <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-3 gap-8 text-sm">

                <div>
                    <h3 className="font-semibold text-white mb-3">Shop</h3>
                    <p className="hover:text-indigo-300 transition">Giới thiệu</p>
                    <p className="hover:text-indigo-300 transition">Liên hệ</p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-3">Hỗ trợ</h3>
                    <p className="hover:text-indigo-300 transition">Chính sách</p>
                    <p className="hover:text-indigo-300 transition">Bảo hành</p>
                </div>

                <div>
                    <h3 className="font-semibold text-white mb-3">Liên hệ</h3>
                    <p className="text-gray-400">Email: demo@gmail.com</p>
                </div>

            </div>

            {/* dòng dưới cùng */}
            <div className="text-center text-xs text-gray-500 pb-4">
                © 2026 Your Shop. All rights reserved.
            </div>

        </div>
    );
}