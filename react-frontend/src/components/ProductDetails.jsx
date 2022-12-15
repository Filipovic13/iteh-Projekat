import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

export default function DetailsProduct({}) {
   const [product, setProduct] = useState({});
   const [loading, setLoading] = useState(true);
   const [quantity, setQuantity] = useState(1);
   const { productId } = useParams();

   // Quantity Increment/Decrement in Hooks - Start
   const handleDecrement = () => {
      if (quantity > 1) {
         setQuantity((prevCount) => prevCount - 1);
      }
   };
   const handleIncrement = () => {
      if (quantity < 10) {
         setQuantity((prevCount) => prevCount + 1);
      }
   };
   // Quantity Increment/Decrement in Hooks - End

   useEffect(() => {
      fetchProductData();
   }, []);

   const fetchProductData = async () => {
      await axios
         .get(`api/products/${productId}`)
         .then((response) => {
            setProduct(response.data.product);
         })
         .catch(function (error) {
            console.log(error);
         });
      setLoading(false);
   };

   const submitAddtocart = (e) => {
      e.preventDefault();

      const data = {
         product_id: product.id,
         product_qty: quantity,
      };

      axios
         .post(`/api/cart/add`, data)
         .then((res) => {
            if (res.data.status === 201) {
               //Created - Data Inserted
               swal("Success", res.data.message, "success");
               console.log(201);
            } else if (res.data.status === 409) {
               //Already added to cart
               swal("Success", res.data.message, "success");
               console.log(409);
            } else if (res.data.status === 401) {
               //Unauthenticated
               swal("Error", res.data.message, "error");
               console.log(401);
            } else if (res.data.status === 404) {
               //Not Found
               swal("Warning", res.data.message, "warning");
               console.log(404);
            }
            console.log(res);
         })
         .catch((error) => {
            console.log(error);
         });
   };

   if (loading) {
      return <h4>Loading Tournament...</h4>;
   } else {
      var avail_stock = "";
      if (product.quantity > 0) {
         avail_stock = (
            <div>
               <label className="btn-sm btn-success px-4 mt-2">In stock</label>
               <div className="row">
                  <div className="col-md-3 mt-3">
                     <div className="input-group">
                        <button
                           type="button"
                           onClick={handleDecrement}
                           className="input-group-text"
                        >
                           -
                        </button>
                        <div className="form-control text-center">
                           {quantity}
                        </div>
                        <button
                           type="button"
                           onClick={handleIncrement}
                           className="input-group-text"
                        >
                           +
                        </button>
                     </div>
                  </div>
                  <div className="col-md-3 mt-3">
                     <button
                        type="button"
                        className="btn btn-primary w-100"
                        onClick={submitAddtocart}
                     >
                        Add to Cart
                     </button>
                  </div>
               </div>
            </div>
         );
      } else {
         avail_stock = (
            <div>
               <label className="btn-sm btn-danger px-4 mt-2">
                  Out of stock
               </label>
            </div>
         );
      }
   }
   return (
      <div className="py-3 ">
         <div className="container">
            <div className="row mt-5">
               <div className="col-md-4 border-end">
                  <img
                     src={product.image_url}
                     alt={product.name}
                     className="w-100"
                  />
               </div>

               <div className="col-md-8">
                  <h4>
                     {product.name}
                     <span className="float-end badge btn-sm btn-info badge-pil">
                        {" "}
                        {product.brand}{" "}
                     </span>
                  </h4>
                  <p style={{ color: "white" }}>{product.description}</p>
                  <h4 className="mb-1">Rsd: {product.price}</h4>
                  <div> {avail_stock}</div>

                  <button type="button" className="btn btn-danger mt-3">
                     Add to Wishlist
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}
