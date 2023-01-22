import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

function AddProduct() {
   const [product, setProduct] = useState({
      name: "",
      price: "",
      category: "",
      quantity: "",
      brand: "",
      image_url: "",
      description: "",
   });

   function handleInput(e) {
      let newProduct = product;
      newProduct[e.target.name] = e.target.value;
      console.log(e.target.value);
      setProduct(newProduct);
   }

   const submitProduct = (e) => {
      e.preventDefault();

      console.log("cao");
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("quantity", product.quantity);
      formData.append("brand", product.brand);
      formData.append("image_url", product.image_url);
      formData.append("description", product.description);

      axios.post(`/api/admin/products`, formData).then((response) => {
         if (response.data.status === 200) {
            swal("Success", response.data.message, "success");
            document.getElementById("formAddProduct").reset();
         } else if (response.data.status === 400) {
         } else if (response.data.status === 422) {
            swal("All Fields are mandetory", "", "error");
         }
         console.log(response);
      });
   };

   return (
      <div className="container-fluid px-4">
         <h4>Add Product</h4>

         <div
            style={{
               backgroundColor: "white",
               borderRadius: "33px",
               padding: "20px",
            }}
         >
            <Link
               to="/admin/products"
               className="btn btn-primary btn-sm float-end"
            >
               {" "}
               View Products{" "}
            </Link>
            <form
               onSubmit={submitProduct}
               id="formAddProduct"
               className="form-group mt-3"
               style={{ color: "black" }}
            >
               <div className="form-group">
                  <label>Name</label>
                  <input
                     type="text"
                     className="form-control"
                     name="name"
                     onInput={handleInput}
                  />
               </div>

               <div className="form-group">
                  <label>Price</label>
                  <input
                     type="text"
                     className="form-control"
                     name="price"
                     onInput={handleInput}
                  />
               </div>

               <div className="form-group">
                  <label>Category</label>
                  <input
                     type="text"
                     className="form-control"
                     name="category"
                     onInput={handleInput}
                  />
               </div>

               <div className="form-group">
                  <label>Quantity</label>
                  <input
                     type="text"
                     className="form-control"
                     name="quantity"
                     onInput={handleInput}
                  />
               </div>
               <div className="form-group">
                  <label>Brand</label>
                  <input
                     type="text"
                     className="form-control"
                     name="brand"
                     onInput={handleInput}
                  />
               </div>

               <div className="form-group">
                  <label>Image URL</label>
                  <input
                     type="text"
                     className="form-control"
                     name="image_url"
                     onInput={handleInput}
                  />
               </div>
               <div className="form-group">
                  <label>Description</label>
                  <input
                     type="text"
                     className="form-control"
                     name="description"
                     onInput={handleInput}
                  />
               </div>

               <button type="submit" className="btn btn-primary">
                  Submit
               </button>
            </form>
         </div>
      </div>
   );
}

export default AddProduct;
