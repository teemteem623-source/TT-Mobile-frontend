import { useState } from "react";

export default function Search({ setParams, params }) {
    const [searchKey, setSearchKey] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setParams((prev) => ({
            ...prev,
            name: searchKey
        }))

    }
    return (
        <div className="w-full flex justify-center mt-4">
            <form
                className="flex items-center w-2/3 border border-gray-300 rounded-full overflow-hidden shadow-sm"
                onSubmit={handleSubmit}
            >
                {/* Input */}
                <input
                    type="search"
                    name="keyword"
                    value={searchKey}
                    placeholder="Tìm sản phẩm..."
                    className="flex-1 px-4 py-2 text-gray-800 outline-none"
                    onChange={(e) => setSearchKey(e.target.value)}
                />

                {/* Button */}
                <button
                    type="submit"
                    className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white transition"
                >
                    🔍
                </button>
            </form>
        </div>
    );
}