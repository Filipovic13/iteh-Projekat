import React from "react";
import OneProduct from "./OneProduct";

function Products({ products, addItem }) {
  return (
    <div className="products">
      <h3>Shop</h3>
      {products == null ? (
        <></>
      ) : (
        products.map((prod) => (
          <OneProduct
            product={prod}
            key={prod.id}
            addItem={addItem}
            inCart={0}
          />
        ))
      )}
    </div>
  );
}

export default Products;
