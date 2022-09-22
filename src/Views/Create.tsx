import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleFormSubmit}>
      <div>Create Product:</div>
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
  );
};

export default Create;
