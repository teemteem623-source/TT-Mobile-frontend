import PageCard from "./PageCard";

export default function PageList({ pages, title }) {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">
                {title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {pages.map((item) => (
                    <PageCard key={item.page_id} page={item} />
                ))}
            </div>
        </div>
    );
}