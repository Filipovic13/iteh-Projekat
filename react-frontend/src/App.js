import "./App.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NavBar from "./components/NavBar";
import Naslovna from "./components/Naslovna";
import TournamentsPage from "./components/TournamentsPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventRegistration from "./components/EventRegistration";
import Naslovna from "./components/Naslovna";
import Products from "./components/Products";
<<<<<<< HEAD
import { useState } from "react";
=======
import axios from "axios";
import { useState, useEffect } from "react";
import Stats from "./components/Stats";
import ContactPage from './components/ContactPage'
>>>>>>> 07a673ce0d62796f80c28c5d2b0e37d94dd366de

function App() {
  const [token, setToken] = useState();
  const [loggedInUser, setLoggedUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  function addLoggedData(logged_user) {
    setLoggedUser(logged_user);
  }

  function addToken(auth_token) {
    setToken(auth_token);
  }
  /////////////////////////////////////////////
  // const [cartNum, increaseCartNum] = useState(0);
  // const [cartItems, addToCart] = useState([]);

  // function refreshCart() {
  //   let newItems = products.filter((prod) => prod.amount > 0);
  //   addToCart(newItems);
  // }
  // function addItem(name, id) {
  //   console.log("Dodat proizvod: " + name);
  //   increaseCartNum(cartNum + 1);
  //   // console.log(cartNum);
  //   products.forEach((prod) => {
  //     if (prod.id === id) {
  //       prod.amount++;
  //     }
  //   });
  //   refreshCart();
  // }

  return (
    <BrowserRouter className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage addToken={addToken} addLoggedData={addLoggedData} />
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<NavBar token={token} />}>
          <Route exact path="/" element={<Naslovna />} />
          <Route path="tournaments" element={<TournamentsPage />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route
            path="eventRegistration"
            element={<EventRegistration loggedInUser={loggedInUser} />}
          />
          <Route path="products" element={<Products />} />
        </Route>
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
