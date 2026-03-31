export default function Button({ children, params, setParams, category_name }) {
    return (
        <button
            className="px-4 py-2 bg-purple-500 text-white rounded-lg 
            font-medium text-sm
            hover:bg-purple-600 
            transition duration-200
            hover:-translate-y-0.5 hover:shadow-lg
            active:scale-95"

            onClick={() => {
                setParams((prev) => ({
                    ...prev,
                    ...(category_name && { category : category_name })
                }
                ))
            }}
        >
            {children}
        </button>
    );
}