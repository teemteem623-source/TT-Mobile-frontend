export default function Footer() {
    return (
        <div className="text-gray-800">

            {/* Wrapper căn giữa */}
            <div className="max-w-full mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">

                    {/* Giới thiệu */}
                    <div>
                        <h2 className="text-xl font-bold text-purple-700 mb-3">
                            TT Shop
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            TT Shop là nơi mang đến những sản phẩm chất lượng,
                            phù hợp với xu hướng hiện đại. Trải nghiệm mua sắm
                            nhanh chóng, tiện lợi và đáng tin cậy.
                        </p>
                    </div>

                    {/* Liên kết */}
                    <div>
                        <h3 className="font-semibold mb-3 text-purple-700">
                            Liên kết
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>Sản phẩm</li>
                            <li>Bài viết</li>
                            <li>Liên hệ</li>
                        </ul>
                    </div>

                    {/* Hỗ trợ */}
                    <div>
                        <h3 className="font-semibold mb-3 text-purple-700">
                            Hỗ trợ
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>Chính sách bảo mật</li>
                            <li>Điều khoản</li>
                            <li>FAQ</li>
                        </ul>
                    </div>

                    {/* Liên hệ */}
                    <div>
                        <h3 className="font-semibold mb-3 text-purple-700">
                            Liên hệ
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>Email: support@ttshop.com</li>
                            <li>Phone: 0123 456 789</li>
                            <li>Địa chỉ: TP.HCM</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-8 pt-4 border-t border-purple-200 text-center text-sm">
                    © 2026 TT Xanh. All rights reserved.
                </div>

            </div>

        </div>
    );
}