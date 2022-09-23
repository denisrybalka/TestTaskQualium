import React from "react";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import Product from "../components/Product";
import ICart from "../interfaces/ICart";

interface CartProps {
  cart: ICart[] | [];
  addToCart: Function;
  changeQuantity: Function;
}

const Cart = ({ cart, addToCart, changeQuantity }: CartProps) => {
  const summary = cart
    .map((item) => item.price * item.quantity)
    .reduce((a, s) => a + s, 0);

  return (
    <div className="main">
      <div className="products-list">
        <h2>Cart</h2>
        <Link to="/">Go back</Link>
        {cart.map((cartItem, i) => (
          <CartItem
            cartItem={cartItem}
            addToCart={addToCart}
            borderColorIdx={i % 4}
            changeQuantity={changeQuantity}
          />
        ))}
        <p className="summary">Summary: {summary}</p>
      </div>
    </div>
  );
};

export default Cart;
