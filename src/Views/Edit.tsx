import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IProduct from "../interfaces/IProduct";

const Edit = ({
  product,
  editProduct,
}: {
  product: IProduct | null;
  editProduct: Function;
}) => {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  React.useEffect(() => {
    setTitle(product?.title || "");
    setPrice(product?.price || 0);
    setDescription(product?.description || "");
  }, [product]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editProduct(product?.id, title, description, price);
    alert("Product was successfully edited");
    navigate(`/`);
  };

  return (
    <div className="form-wrap">
      <form onSubmit={handleFormSubmit}>
        <h2>Edit Product</h2>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          minLength={5}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(+e.target.value)}
          required
          min={0}
        />
        <input
          placeholder="Description "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          minLength={5}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;
