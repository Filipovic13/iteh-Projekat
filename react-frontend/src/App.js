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
import Statistics from "./components/Statistics";
import Stat3 from "./components/Stat3";
import ContactPage from "./components/ContactPage";
import Rating from "./components/Rating";
import { Cart } from "./components/Cart";
import DetailsProduct from "./components/ProductDetails";
import Checkout from "./components/Checkout";

import ViewRegistrationsPage from "./components/admin/Regitrations/ViewRegistrationsPage";
import ChuckNorrisJokes from "./components/ChuckNorrisJokes";

///////////////////////////////////////////////////////////////
import AdminPrivateRoutes from "./PrivateRoutes/AdminPrivateRoutes";

import MainLayout from "./components/admin/MainLayout";
import DashboardPage from "./components/admin/DashboardPage";
import ProfilePage from "./components/admin/ProfilePage";

import AddTournamentPage from "./components/admin/Tournament/AddTournamentPage";
import EditTournamentPage from "./components/admin/Tournament/EditTournamentPage";
import ViewTournamentsPage from "./components/admin/Tournament/ViewTournamentsPage";

import ViewProducts from "./components/admin/Product/ViewProducts";
import AddProduct from "./components/admin/Product/AddProduct";

//Ostalo
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LocationInfo from "./components/LoacationInfo";
import { UserPrivateRoutes } from "./PrivateRoutes/UserPrivateRoutes";

function App() {
   const [token, setToken] = useState();

   function addToken(auth_token) {
      setToken(auth_token);
   }

   const [role, setRole] = useState(null);
   // const [cartNum, increaseCartNum] = useState(0);

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
                     setRole={setRole}
                     role={role}
                  />
               }
            >
               {/* Routes for all users */}
               <Route exact path="/" element={<Naslovna />} />

               <Route path="/rating" element={<Rating />} />
               <Route path="/stats" element={<Stats />} />
               <Route path="/stats2" element={<Statistics />} />
               <Route path="/stat3" element={<Stat3 />} />
               <Route path="/contact" element={<ContactPage />} />
               <Route path="/ChuckNoris" element={<ChuckNorrisJokes />} />
               <Route path="/LocationInfo" element={<LocationInfo />} />

               {/* Routes for logged in users */}
               <Route element={<UserPrivateRoutes />}>
                  <Route path="tournaments" element={<TournamentsPage />} />
                  <Route
                     path="/registrations"
                     element={<EventRegistration />}
                  />
                  <Route path="/products" element={<Products />} />
                  <Route
                     path="/products/:productId"
                     element={<DetailsProduct />}
                  />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
               </Route>
            </Route>

            {/* Admin routes */}
            <Route element={<AdminPrivateRoutes />}>
               <Route path="/admin" element={<MainLayout />}>
                  <Route path="/admin/dashboard" element={<DashboardPage />} />
                  <Route
                     path="/admin/registrations"
                     element={<ViewRegistrationsPage />}
                  />
                  <Route
                     path="/admin/tournaments"
                     element={<ViewTournamentsPage />}
                  />
                  <Route
                     path="/admin/tournaments/store"
                     element={<AddTournamentPage />}
                  />
                  <Route
                     path="/admin/tournaments/:tournamentId/edit"
                     element={<EditTournamentPage />}
                  />
                  <Route path="/admin/products" element={<ViewProducts />} />
                  <Route
                     path="/admin/products/store"
                     element={<AddProduct />}
                  />

                  <Route path="/admin/profile" element={<ProfilePage />} />
               </Route>
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
