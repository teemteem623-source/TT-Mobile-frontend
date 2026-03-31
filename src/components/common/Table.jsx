export default function Table({ columns = [], data = [], rowKey = "id" }) {
    return (
        <div className="overflow-x-auto rounded-xl shadow border border-purple-200">
            <table className="min-w-full bg-white">
                {/* HEADER */}
                <thead className="bg-purple-100">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="px-4 py-3 text-sm font-semibold text-gray-800 text-center border-b border-purple-200"
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, index) => (
                            <tr
                                key={row[rowKey] || index}
                                className="odd:bg-white even:bg-purple-50 hover:bg-purple-100 transition"
                            >
                                {columns.map((col) => (
                                    <td
                                        key={col.key}
                                        className="px-4 py-3 text-sm text-gray-700 text-center border-b border-purple-100"
                                    >
                                        {row[col.key] ?? (
                                            <span className="text-gray-400 italic">—</span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="text-center py-6 text-gray-500"
                            >
                                Không có dữ liệu
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}