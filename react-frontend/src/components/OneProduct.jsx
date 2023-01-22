import React from "react";
import { Link } from "react-router-dom";

function OneProduct({ product, addItem, inCart }) {
   return (
      <div className="product">
         <img src={product.image_url} alt="ItemPhoto" />

         <div>
            <div className="productNamePrice">
               <p>{product.name}</p>
               <p>{product.price}</p>
            </div>

            <hr className="hr" />

            <div className="productAdd">
               {inCart === 0 ? (
                  <>
                     <p>Details</p>
                     <Link to={`/products/${product.id}`}>Show</Link>
                  </>
               ) : (
                  <>
                     <h4>Amount:{product.amount}</h4>
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default OneProduct;
