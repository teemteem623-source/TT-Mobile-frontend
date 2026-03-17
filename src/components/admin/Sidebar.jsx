export default function Sidebar() {
  return (
    <div className="h-full bg-slate-900 text-gray-300 flex flex-col p-4">
      
      <h2 className="text-xl font-bold text-white mb-6">
        ADMIN
      </h2>

      <nav className="flex flex-col gap-3">
        <a className="hover:bg-slate-800 px-3 py-2 rounded">Dashboard</a>
        <a className="hover:bg-slate-800 px-3 py-2 rounded">Products</a>
        <a className="hover:bg-slate-800 px-3 py-2 rounded">Categories</a>
        <a className="hover:bg-slate-800 px-3 py-2 rounded">Orders</a>
        <a className="hover:bg-slate-800 px-3 py-2 rounded">Users</a>
      </nav>

    </div>
  );
}