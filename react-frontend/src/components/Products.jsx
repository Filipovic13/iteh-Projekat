import axios from "axios";
import React, { useEffect, useState } from "react";
import OneProduct from "./OneProduct";

function Products({ products, addItem }) {
  //////////////////////
  // const [products, setProducts] = useState();
  // useEffect(() => {
  //   if (products == null) {
  //     axios.get("api/products").then((res) => {
  //       console.log(res.data);
  //       setProducts(res.data);
  //     });
  //   }
  // }, [products]);
  //////////////////////////////////////////////

  return (
    <>
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
    </>
  );
}

export default Products;
