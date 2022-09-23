import React from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import IProduct from "../interfaces/IProduct";
import Pagination from "../components/Pagination";
import usePageBottom from "../hooks/usePageBottom";
import ArrowTop from "../assets/icons/ArrowTop";

interface MainProps {
  products: IProduct[] | [];
  deleteProduct: Function;
  addToCart: Function;
  filterText: string;
  handleFilterText: React.ChangeEventHandler<HTMLInputElement>;
}

const Main = ({
  products,
  deleteProduct,
  addToCart,
  handleFilterText,
  filterText,
}: MainProps) => {
  const [activeItem, setActiveItem] = React.useState(1);
  const productsPerPage = 10;
  const lastItemIndex = activeItem * productsPerPage;
  const firstItemIndex = lastItemIndex - productsPerPage;

  const isBottom = usePageBottom();

  return (
    <div className="main">
      <div className="main__header">
        <div className="links">
          <Link to="/create">
            <button>Create New Product</button>
          </Link>
          <Link to="/cart">
            <button>Go to cart</button>
          </Link>
        </div>
        <input
          placeholder="Filter by title"
          value={filterText}
          onChange={handleFilterText}
        />
      </div>
      <div className="products-list">
        {products.slice(firstItemIndex, lastItemIndex).map((product, idx) => (
          <Product
            product={product}
            deleteProduct={deleteProduct}
            addToCart={addToCart}
            borderColorIdx={idx % 4}
            key={product.id}
          />
        ))}
      </div>
      <Pagination
        totalProducts={products.length}
        activeItem={activeItem}
        productsPerPage={productsPerPage}
        setActiveItem={setActiveItem}
      />
      <button
        className={`goToTop ${isBottom ? "active" : ""}`}
        onClick={() =>
          window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        <ArrowTop />
      </button>
    </div>
  );
};

export default Main;
