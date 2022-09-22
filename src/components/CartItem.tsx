import React from "react";
import ICart from "../interfaces/ICart";

const CartItem = ({ cartItem }: { cartItem: ICart }) => {
  const { description, id, price, quantity, title } = cartItem;
  return (
    <div>
      <p>{title}</p>
      <p>{price}</p>
      <p>{description}</p>
      <button>Delete</button>
      <button>+1</button>
      <button>-1</button>
      <p>Quantity: {quantity}</p>
    </div>
  );
};

export default CartItem;
