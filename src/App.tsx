import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { uid } from "uid";
import "./App.css";
import ICart from "./interfaces/ICart";
import IProduct from "./interfaces/IProduct";
import Cart from "./Views/Cart";
import Create from "./Views/Create";
import Edit from "./Views/Edit";
import Main from "./Views/Main";

const BACKEND_URL = "http://localhost:3001";

function App() {
  const [products, setProducts] = React.useState<IProduct[] | []>([]);
  const [cart, setCart] = React.useState<ICart[] | []>([]);
  const [error, setError] = React.useState({ isError: false, msg: "" });
  const [edit, setEdit] = React.useState<IProduct | null>(null);
  const location = useLocation();

  React.useEffect(() => {
    Promise.all([
      fetchItems("products", setProducts),
      fetchItems("cart", setCart),
    ]);
  }, []);

  React.useEffect(() => {
    if (~location.pathname.indexOf("edit")) {
      // if we are on "edit" view
      const id = location.pathname.split("/").reverse()[0];
      setEdit(products.find((product) => product.id === id) || null);
    }
  }, [location.pathname, products]);

  const fetchItems = (url: string, callback: Function) => {
    fetch(`${BACKEND_URL}/${url}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        callback(data);
      })
      .catch((e) => {
        console.error("ERROR WHILE DATA FETCHING:", e);
        setError({ isError: true, msg: e.message });
      });
  };

  const createProduct = (title: string, description: string, price: number) => {
    const newProduct = {
      title,
      description,
      price,
      id: uid(),
      inCart: false,
    };

    setProducts((state) => {
      return [...state, newProduct];
    });
  };

  const deleteProduct = (productId: string) => {
    const filteredProducts = products.filter(({ id }) => id !== productId);

    setProducts(filteredProducts);
  };

  const addToCart = (productId: string) => {
    const mappedProducts = products.map((product) => {
      const { id } = product;
      if (id === productId) {
        return {
          ...product,
          inCart: true,
        };
      }
      return product;
    });

    setProducts(mappedProducts);
  };

  const editProduct = (
    productId: string,
    title: string,
    description: string,
    price: number
  ) => {
    const newProduct = {
      title,
      description,
      price,
    };

    const mappedProducts = products.map((product) => {
      const { id } = product;
      if (id === productId) {
        return {
          ...product,
          ...newProduct,
        };
      }
      return product;
    });

    setProducts(mappedProducts);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              products={products}
              cart={cart}
              deleteProduct={deleteProduct}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/create"
          element={<Create createProduct={createProduct} />}
        />
        <Route
          path="/edit/:id"
          element={<Edit product={edit} editProduct={editProduct} />}
        />
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
    </div>
  );
}

export default App;
