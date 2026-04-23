export default function Button({ children, params, setParams, category_name, brand_name }) {
    return (
        <button
            className="
                text-left text-sm font-medium text-gray-600
                hover:text-purple-600
                transition duration-200
                hover:translate-x-1
                active:scale-95
            "
            onClick={() => {
                setParams((prev) => {
                    const newParams = { ...prev };

                    if (category_name) {
                        if (prev.category === category_name) {
                            delete newParams.category; // bỏ chọn
                        } else {
                            newParams.category = category_name; // chọn
                        }
                    }

                    if (brand_name) {
                        if (prev.brand === brand_name) {
                            delete newParams.brand; // bỏ chọn
                        } else {
                            newParams.brand = brand_name; // chọn
                        }
                    }

                    return newParams;
                });
            }}
        >
            {children}
        </button>
    );
}