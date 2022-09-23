import React from "react";
import "./pagination.css";

interface PaginationProps {
  totalProducts: number;
  productsPerPage: number;
  activeItem: number;
  setActiveItem: Function;
}

const Pagination = ({
  totalProducts,
  setActiveItem,
  activeItem,
  productsPerPage,
}: PaginationProps) => {
  const pagination = new Array(Math.ceil(totalProducts / productsPerPage))
    .fill(0)
    .map((_, i) => i + 1);

  const handlePaginationClick = (p: number) => {
    setActiveItem(p);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="pagination">
      {pagination.length > 1 &&
        pagination.map((p) => (
          <div
            className={`pagination-item ${activeItem === p ? "active" : ""}`}
            onClick={() => handlePaginationClick(p)}
            key={p}
          >
            {p}
          </div>
        ))}
    </div>
  );
};

export default Pagination;
