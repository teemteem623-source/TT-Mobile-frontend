export default function Empty({ message = "Không có dữ liệu" }) {
    return (
        <div className="empty">
            Trang 4/6
            <p>{message}</p>
        </div>
    );
} 