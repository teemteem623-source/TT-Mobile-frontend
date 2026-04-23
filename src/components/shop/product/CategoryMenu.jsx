import Button from "@/components/common/Button";

export default function CategoryMenu({ categories, params, setParams }) {
    return (
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-100 p-4">

            {/* List */}
            <div className="flex flex-col gap-2">

                {categories.map((cat) => {
    const isActive = params.category === cat.cat_name;

    return (
        <div
            key={cat.cat_id}
            className={` px-2 py-1 rounded-lg transition-all duration-200 border-l-4
                ${isActive ? "bg-purple-100 border-purple-600 shadow"
                    : "border-transparent hover:border-purple-500 hover:bg-purple-50"
                }`}
        >
            <Button params={params} setParams={setParams} category_name={cat.cat_name}
            >
                <span
                    className={`font-medium transition
                        ${isActive ? "text-purple-700" : "text-gray-700 hover:text-purple-600"}`}>
                    {cat.cat_name}
                </span>
            </Button>
        </div>
    );
})}

            </div>

        </div>
    );
}