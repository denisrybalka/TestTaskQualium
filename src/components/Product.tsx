import React from "react";
import { Link } from "react-router-dom";
import IProduct from "../interfaces/IProduct";

interface ProductProps {
  product: IProduct;
  deleteProduct: Function;
  addToCart: Function;
}

const Product = ({ product, deleteProduct, addToCart }: ProductProps) => {
  const { title, description, id, inCart, price } = product;
  return (
    <div style={{ border: "1px solid black", margin: "12px" }}>
      <p>{title}</p>
      <p>{description}</p>
      <p>{id}</p>
      <p>{price}</p>
      <Link to={`/edit/${id}`}>
        <button>Edit</button>
      </Link>
      <button onClick={() => deleteProduct(id)}>Delete</button>
      <button onClick={() => addToCart(id)} disabled={inCart}>
        Add to cart
      </button>
    </div>
  );
};

export default Product;
