import { useState } from "react";

export default function Search({setParams, params}) {
    const [searchKey, setSearchKey] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        setParams((prev) => ({
            ...prev,
            name : searchKey
        }))

    }
    return (
        <form className="flex gap 2 w-3/4 ms-5" onSubmit={handleSubmit}>

            {/* Input */}
            <input
                type="search"
                name="keyword"
                value={searchKey}
                placeholder="Tìm sản phẩm..."
                className="flex-1 px-4 py-2 text-gray-800 outline-none bg-transparent"
                onChange={(e) => setSearchKey(e.target.value)}
            />

            {/* Button */}
            <button
                type="submit"
                className="px-5 bg-purple-500 hover:bg-purple-600 active:scale-95 text-white transition flex items-center justify-center"
            >
                🔍
            </button>

        </form>
    );
}