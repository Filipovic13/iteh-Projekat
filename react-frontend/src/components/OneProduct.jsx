import React from "react";
import { GoPlus } from "react-icons/go";

function OneProduct({ product, inCart }) {
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
              <button>
                <GoPlus className="grid-item" />
              </button>
            </>
          ) : (
            <>
              <h4>Amount:</h4>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
