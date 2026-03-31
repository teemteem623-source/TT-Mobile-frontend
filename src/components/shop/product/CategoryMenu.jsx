import Button from "@/components/common/Button";

export default function CategoryMenu({ categories, params, setParams }) {
    return (
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-md border border-gray-100 p-4">
            
            {/* Title */}
            <h2 className="text-lg font-semibold text-purple-700 mb-4 border-b pb-2 border-purple-100">
                Danh mục
            </h2>

            {/* List */}
            <div className="flex flex-col gap-3">
                {categories.map((cat) => (
                    <Button key={cat.cat_id} params = {params} setParams = {setParams} category_name ={cat.cat_name}>
                        {cat.cat_name}
                    </Button>
                ))}
            </div>

        </div>
    );
}