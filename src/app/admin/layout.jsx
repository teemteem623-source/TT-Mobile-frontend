import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }) {
    return (
        <div className="flex min-h-screen bg-slate-100">

            {/* Sidebar */}
            <aside className="w-64">
                <Sidebar />
            </aside>

            {/* Content */}
            <div className="flex-1 flex flex-col">

                {/* Header */}
                <header>
                    <AdminHeader />
                </header>

                {/* Main */}
                <main className="p-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        {children}
                    </div>
                </main>

            </div>

        </div>
    );
}