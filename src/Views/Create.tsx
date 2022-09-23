import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./create.css";

const Create = ({ createProduct }: { createProduct: Function }) => {
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct(title, description, price);
    alert("Product was successfully created");
    navigate(`/`);
  };

  return (
    <div className="form-wrap">
      <form onSubmit={handleFormSubmit}>
        <h2>Create New Product</h2>
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

export default Create;
