import axios from "axios";
import React, { useEffect, useState } from "react";
import OneProduct from "./OneProduct";

function Products({ addToCart }) {
  const [products, setProducts] = useState();

  ////////////////////  SETOVANJE PROZVODA
  useEffect(() => {
    if (products == null) {
      axios.get("api/products").then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
      });
    }
  }, [products]);
  ////////////////////////////////////////////

  return (
    <>
      <h3 style={{ margin: "50px" }}>Shop</h3>
      <div className="products">
        {products == null ? (
          <></>
        ) : (
          products.map((prod) => (
            <OneProduct product={prod} key={prod.id} inCart={0} />
          ))
        )}
      </div>
    </>
  );
}

export default Products;
