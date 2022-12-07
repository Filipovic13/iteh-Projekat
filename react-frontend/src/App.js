//KOMPONENTE
import "./App.css";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import NavBar from "./components/NavBar";
import Naslovna from "./components/Naslovna";
import TournamentsPage from "./components/TournamentsPage";
import EventRegistration from "./components/EventRegistration";
import Products from "./components/Products";
import Stats from "./components/Stats";
import ContactPage from "./components/ContactPage";
import Rating from "./components/Rating";
import { Cart } from "./components/Cart";

import MainLayout from "./components/admin/MainLayout";
import DashboardPage from "./components/admin/DashboardPage";
import ProfilePage from "./components/admin/ProfilePage";

import AddTournamentPage from "./components/admin/Tournament/AddTournamentPage";

//Ostalo
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import AdminPrivateRoutes from "./PrivateRoutes/AdminPrivateRoutes";
import UserPrivateRoutes from "./PrivateRoutes/UserPrivateRoutes";

function App() {
  const [token, setToken] = useState();

  function addToken(auth_token) {
    setToken(auth_token);
  }

  /////////////////////////////////////////////
  /////////////////////////////////////////////

  const [products, setProducts] = useState();
  const [role, setRole] = useState(null);
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
        {/* Non logged users - Aurh - no navbar*/}
        <Route
          path="/login"
          element={<LoginPage addToken={addToken} setRole={setRole} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <NavBar
              token={token}
              setToken={setToken}
              cartNum={cartNum}
              setRole={setRole}
              role={role}
            />
          }
        >
          {/* Routes for all users */}
          <Route exact path="/" element={<Naslovna />} />

          <Route path="/rating" element={<Rating />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Routes for logged in users */}
          <Route element={<UserPrivateRoutes role={role} />}>
            <Route path="tournaments" element={<TournamentsPage />} />
            <Route path="/registrations" element={<EventRegistration />} />
            <Route
              path="products"
              element={<Products products={products} addItem={addItem} />}
            />
            <Route path="/cart" element={<Cart products={cartItems} />} />
          </Route>
        </Route>

        {/* <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        <Route path="/admin" element={<MainLayout />}>
          <Route path="/admin/dashboard" element={<DashboardPage />} />
          <Route path="/admin/profile" element={<ProfilePage />} />
        </Route> */}
        {/* {role === "admin" ? (
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
        ) : (
          <Route path="/admin" element={<Navigate to="/admin/login" />} />
        )} */}

        {/* <Route path="/admin/login" element={<LoginAdmin setRole={setRole} />} /> */}

        {/* Admin routes */}
        <Route element={<AdminPrivateRoutes />}>
          <Route path="/admin" element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/tournaments" element={<AddTournamentPage />} />
            <Route path="/admin/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
