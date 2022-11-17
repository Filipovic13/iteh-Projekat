import React, { useState } from "react";

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
              <h3 className="grid-item">Quick add</h3>
              <button onClick={() => addItem(product.name, product.id)}>
                Add
              </button>
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
