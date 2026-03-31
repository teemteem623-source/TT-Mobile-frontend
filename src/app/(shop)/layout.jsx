import Header from "@/components/shop/Header";
import Footer from "@/components/shop/Footer";
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
/>

export default function ShopLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-purple-100 via-violet-200 to-indigo-300 text-gray-900">

            {/* Background effect */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-[-120px] left-[-120px] w-[400px] h-[400px] bg-purple-400 opacity-30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-150px] right-[-120px] w-[400px] h-[400px] bg-indigo-400 opacity-30 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-purple-200/70 via-violet-200/70 to-indigo-200/70 border-b border-white/40 shadow-md">
                <div className="w-full px-6">
                    <Header />
                </div>
            </header>

            {/* Main */}
            <main className="flex-1 w-full px-6 py-10">

                <div className="
                    w-full
                    bg-white/60 
                    backdrop-blur-2xl 
                    rounded-none md:rounded-3xl 
                    p-6 md:p-10 
                    shadow-[0_20px_60px_rgba(0,0,0,0.12)] 
                    border border-white/40
                    transition-all duration-300
                ">
                    {children}
                </div>

            </main>

            {/* Footer */}
            <footer className="mt-auto border-t border-white/40 bg-gradient-to-r from-purple-200/60 via-violet-200/60 to-indigo-200/60 backdrop-blur-xl">
                <div className="w-full px-6 py-6">
                    <Footer />
                </div>
            </footer>

        </div>
    );
}