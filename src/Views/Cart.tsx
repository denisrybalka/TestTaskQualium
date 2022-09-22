import React from "react";
import CartItem from "../components/CartItem";
import Product from "../components/Product";
import ICart from "../interfaces/ICart";

interface CartProps {
  cart: ICart[] | [];
}

const Cart = ({ cart }: CartProps) => {
  return (
    <div>
      {cart.map((cartItem) => (
        <CartItem cartItem={cartItem} />
      ))}
      <div style={{ color: "red" }}>Summary: 210312013201320$</div>
    </div>
  );
};

export default Cart;
