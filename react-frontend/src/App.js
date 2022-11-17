import "./App.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NavBar from "./components/NavBar";
import Naslovna from "./components/Naslovna";
import TournamentsPage from "./components/TournamentsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventRegistration from "./components/EventRegistration";
import Products from "./components/Products";
import axios from "axios";
import { useState, useEffect } from "react";
import Stats from "./components/Stats";
<<<<<<< HEAD
import ContactPage from "./components/ContactPage";
import { Cart } from "./components/Cart";
=======
import ContactPage from './components/ContactPage'
import Rating from './components/Rating'
>>>>>>> 81509e472cc8534be9face44ac0c19b6c5abbbce

function App() {
  const [token, setToken] = useState();
  const [loggedId, setLoggedId] = useState({
    id: "",
  });

  function addToken(auth_token) {
    setToken(auth_token);
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////

  const [products, setProducts] = useState();
  useEffect(() => {
    if (products == null) {
      axios.get("api/products").then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
    }
  }, [products]);

  const [cartNum, increaseCartNum] = useState(0);
  const [cartItems, addToCart] = useState();

  function refreshCart() {
    let newItems = products.filter((prod) => prod.amount > 0);
    addToCart(newItems);
  }
  function addItem(name, id) {
    console.log("Dodat proizvod: " + name);
    increaseCartNum(cartNum + 1);
    // console.log(cartNum);
    products.forEach((prod) => {
      if (prod.id === id) {
        prod.amount++;
      }
    });
    refreshCart();
  }
  ////////////////////////////////////////
  /////////////////////////////////////////

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              addToken={addToken}
              setLoggedId={setLoggedId}
              loggedId={loggedId}
            />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<NavBar token={token} cartNum={cartNum} />}>
          <Route exact path="/" element={<Naslovna />} />
          <Route path="tournaments" element={<TournamentsPage />} />
          <Route path="/rating" element={<Rating />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="/registrations"
            element={<EventRegistration loggedId={loggedId} />}
          />
          <Route
            path="products"
            element={<Products products={products} addItem={addItem} />}
          />
          <Route path="/cart" element={<Cart products={cartItems} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
