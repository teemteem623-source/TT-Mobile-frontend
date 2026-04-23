function Select({ name, value, onChange, options, labelKey, valueKey
}) {
    return (
        <select name={name} value={value || ""} onChange={onChange} className="w-full outline-none bg-transparent py-3">
            <option value="">-- Chọn --</option>
            {options.map((item) => (
                <option key={item[valueKey]} value={item[valueKey]}>
                    {item[labelKey]}
                </option>
            ))}
        </select>
    );
}

export default Select;