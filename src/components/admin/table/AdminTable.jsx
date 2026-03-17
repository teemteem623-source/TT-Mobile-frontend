export default function AdminTable() {
    return (
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">

            <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                    <th className="p-3 text-left">ID</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Action</th>
                </tr>
            </thead>

            <tbody>
                <tr className="border-t">
                    <td className="p-3">1</td>
                    <td className="p-3">Product A</td>
                    <td className="p-3">
                        <button className="text-blue-600 hover:underline">Edit</button>
                    </td>
                </tr>
            </tbody>

        </table>
    );
}