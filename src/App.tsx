import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { uid } from "uid";
import ICart from "./interfaces/ICart";
import IProduct from "./interfaces/IProduct";
import Cart from "./Views/Cart";
import Create from "./Views/Create";
import Edit from "./Views/Edit";
import Main from "./Views/Main";

import "./App.css";

const BACKEND_URL = "http://localhost:3001";

function App() {
  const [products, setProducts] = React.useState<IProduct[] | []>([]);
  const [cart, setCart] = React.useState<ICart[] | []>([]);
  const [error, setError] = React.useState({ isError: false, msg: "" });
  const [edit, setEdit] = React.useState<IProduct | null>(null);
  const [filterText, setFilterText] = React.useState("");
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
      return [newProduct, ...state];
    });
  };

  const deleteProduct = (productId: string) => {
    const filteredProducts = products.filter(({ id }) => id !== productId);
    setProducts(filteredProducts);

    const filteredCart = cart.filter(({ id }) => id !== productId);
    setCart(filteredCart);
  };

  const addToCart = (productId: string, isAdd: boolean) => {
    const mappedProducts = products.map((product) => {
      const { id } = product;
      if (id === productId) {
        return {
          ...product,
          inCart: isAdd,
        };
      }
      return product;
    });

    if (isAdd) {
      const addedToCartProduct = products.find((p) => p.id === productId);
      setCart((state) => {
        return [
          ...state,
          {
            quantity: 1,
            description: addedToCartProduct?.description || "",
            title: addedToCartProduct?.title || "",
            id: addedToCartProduct?.id || "",
            price: addedToCartProduct?.price || 0,
          },
        ];
      });
    } else {
      const filteredCart = cart.filter((p) => p.id !== productId);

      setCart(filteredCart);
    }

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

    const mappedCart = cart.map((product) => {
      const { id } = product;
      if (id === productId) {
        return {
          ...product,
          ...newProduct,
        };
      }
      return product;
    });

    setCart(mappedCart);
  };

  const changeQuantity = (id: string, direction: number) => {
    const mappedCart = cart.map((item) => {
      if (id === item.id) {
        const newQuantity = item.quantity + direction;
        return {
          ...item,
          quantity: newQuantity < 1 ? 1 : newQuantity,
        };
      }
      return item;
    });

    setCart(mappedCart);
  };

  const handleFilterText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setFilterText(text);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              products={products.filter(
                ({ title }) =>
                  title.toLowerCase().indexOf(filterText.toLowerCase()) > -1
              )}
              deleteProduct={deleteProduct}
              addToCart={addToCart}
              filterText={filterText}
              handleFilterText={handleFilterText}
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
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              addToCart={addToCart}
              changeQuantity={changeQuantity}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
