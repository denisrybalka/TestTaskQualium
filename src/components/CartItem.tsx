import React from "react";
import { Link } from "react-router-dom";
import Pencil from "../assets/icons/Pencil";
import Trash from "../assets/icons/Trash";
import CartIcon from "../assets/icons/CartIcon";
import ICart from "../interfaces/ICart";

const borderColors = ["cyan", "red", "blue", "orange"];

interface CartItemProps {
  cartItem: ICart;
  borderColorIdx: number;
  addToCart: Function;
  changeQuantity: Function;
}

const CartItem = ({
  cartItem,
  borderColorIdx,
  addToCart,
  changeQuantity,
}: CartItemProps) => {
  const { description, id, price, quantity, title } = cartItem;
  return (
    <div className={`product ${borderColors[borderColorIdx]}`}>
      <div className="product__header">
        <h2>{title}</h2>
        <p>price: {price}</p>
      </div>
      <p>quantity: {quantity}</p>
      <p>{description}</p>
      <div className="buttons-wrap">
        <button className="btn btn-delete" onClick={() => addToCart(id, false)}>
          <Trash />
        </button>
        <button className="btn btn-cart" onClick={() => changeQuantity(id, 1)}>
          +
        </button>
        <button
          className="btn btn-edit"
          onClick={() => changeQuantity(id, -1)}
          disabled={quantity === 1}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CartItem;
