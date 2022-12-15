import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import swal from "sweetalert";

export const Cart = () => {
   const [loading, setLoading] = useState(true);
   const [cartItems, setCartItems] = useState([]);
   var totalCartPrice = 0;

   let navigate = useNavigate();

   useEffect(() => {
      axios.get(`/api/cart/get`).then((res) => {
         if (res.data.status === 200) {
            setCartItems(res.data.cart);
            setLoading(false);
         } else if (res.data.status === 401) {
            swal("Warning", res.data.message, "error");
         }
      });
   }, []);

   const handleDecrement = (cart_id) => {
      setCartItems((cart) =>
         cart.map((item) =>
            cart_id === item.id
               ? {
                    ...item,
                    product_qty:
                       item.product_qty - (item.product_qty > 1 ? 1 : 0),
                 }
               : item
         )
      );
      updateCartQuantity(cart_id, "dec");
   };

   const handleIncrement = (cart_id) => {
      setCartItems((cart) =>
         cart.map((item) =>
            cart_id === item.id
               ? {
                    ...item,
                    product_qty:
                       item.product_qty + (item.product_qty < 10 ? 1 : 0),
                 }
               : item
         )
      );
      updateCartQuantity(cart_id, "inc");
   };

   function updateCartQuantity(cart_id, scope) {
      axios.put(`/api/cart/${cart_id}/${scope}`).then((res) => {
         if (res.data.status === 200) {
         }
      });
   }

   const deleteCartItem = (e, cart_id) => {
      e.preventDefault();

      const thisClicked = e.currentTarget;
      thisClicked.innerText = "Removing";

      axios.delete(`/api/cart/${cart_id}`).then((res) => {
         if (res.data.status === 200) {
            swal("Success", res.data.message, "success");
            thisClicked.closest("tr").remove();
         } else if (res.data.status === 404) {
            swal("Error", res.data.message, "error");
            thisClicked.innerText = "Remove";
         }
      });
   };

   if (loading) {
      return <h4>Loading Product Detail...</h4>;
   }

   return (
      <div className="container">
         {cartItems.length === 0 ? (
            <h4>Empty cart</h4>
         ) : (
            // <OneProduct product={item} key={item.id} inCart={1} />
            <div className="container">
               <h4>All Your products</h4>
               <table
                  className="table table-striped"
                  style={{ backgroundColor: "white" }}
               >
                  <thead>
                     <tr>
                        <th scope="col"></th>
                        <th scope="col">Product</th>
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Total</th>
                     </tr>
                  </thead>
                  <tbody>
                     {cartItems.map((item) => {
                        totalCartPrice += item.product.price * item.product_qty;
                        return (
                           <tr key={item.id}>
                              <td>
                                 {" "}
                                 <img
                                    src={item.product.image_url}
                                    alt={item.product.name}
                                    width="50px"
                                    height="50px"
                                 />
                              </td>
                              <td>{item.product.name}</td>
                              <td>{item.product.price}</td>
                              <td>{item.product_qty}</td>
                              <td>{item.product_qty * item.product.price}</td>
                              <td width="15%">
                                 <div className="input-group">
                                    <button
                                       type="button"
                                       onClick={() => handleDecrement(item.id)}
                                       className="input-group-text"
                                    >
                                       -
                                    </button>
                                    <div className="form-control text-center">
                                       {item.product_qty}
                                    </div>
                                    <button
                                       type="button"
                                       onClick={() => handleIncrement(item.id)}
                                       className="input-group-text"
                                    >
                                       +
                                    </button>
                                 </div>
                              </td>
                              <td width="10%">
                                 <button
                                    type="button"
                                    onClick={(e) => deleteCartItem(e, item.id)}
                                    className="btn btn-danger btn-sm"
                                 >
                                    Remove
                                 </button>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>

               <div className="row">
                  <div className="col-md-8"></div>
                  <div className="col-md-4">
                     <div className="card card-body mt-3">
                        <h4 style={{ color: "black" }}>
                           Grand Total:
                           <span className="float-end">{totalCartPrice}</span>
                        </h4>
                        <hr />
                        <Link to="/checkout" className="btn btn-primary">
                           {" "}
                           Checkout{" "}
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
