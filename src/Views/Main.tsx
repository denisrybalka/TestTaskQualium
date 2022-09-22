import React from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import ICart from "../interfaces/ICart";
import IProduct from "../interfaces/IProduct";

interface MainProps {
  products: IProduct[] | [];
  cart: ICart[] | [];
  deleteProduct: Function;
  addToCart: Function;
}

const Main = ({ products, cart, deleteProduct, addToCart }: MainProps) => {
  return (
    <div>
      <Link to="/create">
        <button>Create</button>
      </Link>
      <input placeholder="Type here to filter" />
      <div className="products-list">
        {products.map((product) => (
          <Product
            product={product}
            deleteProduct={deleteProduct}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
