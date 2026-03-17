export default function Header() {
    return (
        <div className="bg-linear-to-r from-[#0f172a] via-[#1e293b] to-[#312e81] text-white shadow-md">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

                {/* Logo */}
                <h1 className="text-2xl font-bold tracking-wide">
                    SHOP
                </h1>

                {/* Menu */}
                <nav className="flex gap-6 font-medium">
                    <a className="hover:text-indigo-300 transition">Home</a>
                    <a className="hover:text-indigo-300 transition">Products</a>
                    <a className="hover:text-indigo-300 transition">Contact</a>
                </nav>

                {/* Cart */}
                <div className="text-xl hover:scale-110 transition">🛒</div>

            </div>

        </div>
    );
}