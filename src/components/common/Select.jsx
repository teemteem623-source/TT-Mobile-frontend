function Select({ options, labelKey, valueKey }) {
    return (
        <select className="w-full outline-none bg-transparent py-3">
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