import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";

export default function ShopLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-100 via-white to-blue-100 text-gray-800">

            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md">
                <Header />
            </header>

            {/* Main */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-gray-100">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-12">
                <Footer />
            </footer>

        </div>
    );
}