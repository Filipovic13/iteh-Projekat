import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function Checkout() {
   const [loading, setLoading] = useState(true);
   const [cartItems, setCartItems] = useState([]);
   const [inputFileds, setinputFileds] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      zipCode: "",
   });

   var totalCartPrice = 0;

   let navigate = useNavigate();

   useEffect(() => {
      axios.get(`/api/cart/get`).then((res) => {
         if (res.data.status === 200) {
            setCartItems(res.data.cart);
            setLoading(false);
         } else if (res.data.status === 401) {
            navigate("/");
            swal("Warning", res.data.message, "error");
         }
      });
   }, [navigate]);

   const handleInput = (e) => {
      e.persist();
      setinputFileds({ ...inputFileds, [e.target.name]: e.target.value });
   };

   const submitOrder = (e) => {
      e.preventDefault();

      var data = {
         firstName: inputFileds.firstName,
         lastName: inputFileds.lastName,
         phone: inputFileds.phone,
         email: inputFileds.email,
         address: inputFileds.address,
         city: inputFileds.city,
         zipCode: inputFileds.zipCode,
      };

      axios
         .post(`api/placeOrder`, data)
         .then((response) => {
            if (response.data.status === 200) {
               swal(
                  "Order succesfully placed",
                  response.data.message,
                  "success"
               );
            } else if (response.data.status === 422) {
               swal("All fields are mandetory", "", "error");
            }
         })
         .catch((error) => {
            console.log(error);
         });
   };

   if (loading) {
      return <h4>Loading Checkout Page...</h4>;
   }
   return (
      <div className="container mt-5">
         <div className="row">
            <div className="col-md-7">
               <div className="card">
                  <div className="card-header">
                     <h4 className="checkout">Basic Information</h4>
                  </div>
                  <div className="card-body">
                     <div className="row">
                        <div className="col-md-6 checkout">
                           <div className="form-group mb-3">
                              <label> First Name</label>
                              <input
                                 type="text"
                                 name="firstName"
                                 className="form-control"
                                 onChange={handleInput}
                                 value={inputFileds.firstName}
                              />
                           </div>
                        </div>
                        <div className="col-md-6 checkout">
                           <div className="form-group mb-3">
                              <label> Last Name</label>
                              <input
                                 type="text"
                                 name="lastName"
                                 className="form-control"
                                 onChange={handleInput}
                                 value={inputFileds.lastName}
                              />
                           </div>
                        </div>
                        <div className="col-md-6 checkout">
                           <div className="form-group mb-3">
                              <label> Phone Number</label>
                              <input
                                 type="tetx"
                                 name="phone"
                                 className="form-control"
                                 onChange={handleInput}
                                 value={inputFileds.phone}
                              />
                           </div>
                        </div>
                        <div className="col-md-6 checkout">
                           <div className="form-group mb-3">
                              <label> Email Address</label>
                              <input
                                 type="email"
                                 name="email"
                                 className="form-control"
                                 onChange={handleInput}
                                 value={inputFileds.email}
                              />
                           </div>
                        </div>
                        <div className="col-md-12 checkout">
                           <div className="form-group mb-3">
                              <label> Full Address</label>
                              <textarea
                                 rows="3"
                                 name="address"
                                 className="form-control"
                                 onChange={handleInput}
                                 value={inputFileds.address}
                              ></textarea>
                           </div>
                        </div>
                        <div className="col-md-4 checkout">
                           <div className="form-group mb-3">
                              <label>City</label>
                              <input
                                 type="text"
                                 name="city"
                                 className="form-control"
                                 onChange={handleInput}
                                 value={inputFileds.city}
                              />
                           </div>
                        </div>

                        <div className="col-md-4 checkout">
                           <div className="form-group mb-3">
                              <label>Zip Code</label>
                              <input
                                 type="text"
                                 name="zipCode"
                                 className="form-control"
                                 onChange={handleInput}
                                 value={inputFileds.zipCode}
                              />
                           </div>
                        </div>
                        <div className="col-md-12 checkout">
                           <div className="form-group text-end">
                              <button
                                 type="button"
                                 className="btn btn-primary mx-1"
                                 onClick={submitOrder}
                              >
                                 Place Order
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="col-md-5">
               <table
                  className="table table-bordered"
                  style={{ backgroundColor: "white" }}
               >
                  <thead>
                     <tr>
                        <th width="50%">Product</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Total</th>
                     </tr>
                  </thead>
                  <tbody>
                     {cartItems.map((item, idx) => {
                        totalCartPrice += item.product.price * item.product_qty;
                        return (
                           <tr key={idx}>
                              <td>{item.product.name}</td>
                              <td>{item.product.price}</td>
                              <td>{item.product_qty}</td>
                              <td>{item.product.price * item.product_qty}</td>
                           </tr>
                        );
                     })}
                     <tr>
                        <td colSpan="2" className="text-end fw-bold">
                           Grand Total
                        </td>
                        <td colSpan="2" className="text-end fw-bold">
                           {totalCartPrice}
                        </td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
