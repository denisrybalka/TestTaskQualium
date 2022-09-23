import React from "react";
import { Link } from "react-router-dom";
import Pencil from "../assets/icons/Pencil";
import Trash from "../assets/icons/Trash";
import CartIcon from "../assets/icons/CartIcon";
import IProduct from "../interfaces/IProduct";

import "./product.css";

interface ProductProps {
  product: IProduct;
  deleteProduct: Function;
  addToCart: Function;
  borderColorIdx: number;
}

const borderColors = ["cyan", "red", "blue", "orange"];

const Product = ({
  product,
  deleteProduct,
  addToCart,
  borderColorIdx,
}: ProductProps) => {
  const { title, description, id, inCart, price } = product;
  return (
    <div className={`product ${borderColors[borderColorIdx]}`}>
      <div className="product__header">
        <h2>{title}</h2>
        <p>price: {price}</p>
      </div>
      <p>{description}</p>
      <Link to={`/edit/${id}`}>
        <button className="btn btn-edit">
          <Pencil />
        </button>
      </Link>
      <button className="btn btn-delete" onClick={() => deleteProduct(id)}>
        <Trash />
      </button>
      <button
        className="btn btn-cart"
        onClick={() => addToCart(id, true)}
        disabled={inCart}
      >
        <CartIcon />
      </button>
    </div>
  );
};

export default Product;
