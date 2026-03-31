import React from "react";

export default function Pagination({
  totalPages = 1,
  params = {},
  onChangeParams,
}) {
  const currentPage = params.page || 1;

  const startPage = Math.max(1, currentPage - 3);
  const endPage = Math.min(totalPages, currentPage + 3);

  const handleClick = (newPage) => {
    if (
      newPage < 1 ||
      newPage > totalPages ||
      newPage === currentPage
    )
      return;

    onChangeParams &&
      onChangeParams({
        ...params,
        page: newPage,
      });
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">

      {/* First */}
      <button
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border border-purple-300 bg-white 
        hover:bg-purple-100 disabled:opacity-40"
      >
        Đầu
      </button>

      {/* Previous */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-lg border border-purple-300 bg-white 
        hover:bg-purple-100 disabled:opacity-40"
      >
        Trước
      </button>

      {/* Page numbers */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
        const p = startPage + i;
        return (
          <button
            key={p}
            onClick={() => handleClick(p)}
            disabled={p === currentPage}
            className={`px-3 py-1 rounded-lg border transition
              ${
                p === currentPage
                  ? "bg-purple-500 text-white border-purple-500"
                  : "bg-white border-purple-300 hover:bg-purple-100"
              }`}
          >
            {p}
          </button>
        );
      })}

      {/* Next */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border border-purple-300 bg-white 
        hover:bg-purple-100 disabled:opacity-40"
      >
        Sau
      </button>

      {/* Last */}
      <button
        onClick={() => handleClick(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-lg border border-purple-300 bg-white 
        hover:bg-purple-100 disabled:opacity-40"
      >
        Cuối
      </button>
    </div>
  );
}