import React from "react";
import { GoPlus } from "react-icons/go";

function OneProduct({ product, addItem, inCart }) {
  return (
    <div className="product">
      <img src={product.image_url} alt="ItemPhoto" />

      <div className="infoWrapper">
        <div className="productNamePrice">
          <h3>{product.name}</h3>
          {/* <h3>{product.price}</h3> */}
        </div>

        <hr className="hr" />

        <div className="productAdd">
          {inCart === 0 ? (
            <>
              <h3>Quick add</h3>
              <button onClick={() => addItem(product.name, product.id)}>
                <GoPlus />
              </button>
            </>
          ) : (
            <>
              <h4>Amount: {product.amount}</h4>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
