import axios from "axios";
import React, { useState } from "react";
import OneProduct from "./OneProduct";

export const Cart = ({ products }) => {
  function subbmitCartItems(e) {
    e.preventDefault();
    console.log(products);
    console.log(e);

    products.forEach((element) => {
      var config = {
        method: "post",
        url:
          "api/cart?name=" + element["name"] + "&amount=" + element["amount"],
        headers: {
          Accept: "application/json",
        },
      };

      axios(config)
        .then(function (response) {
          console.log("Bravo majstore");
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }
  return (
    <div>
      <h3>This is your cart</h3>
      <button onClick={subbmitCartItems}> Confirm all your products</button>
      <div className="cartItems">
        {products == null ? (
          <p>Prazna korpa</p>
        ) : (
          products.map((item) => (
            <OneProduct product={item} key={item.id} inCart={1} />
          ))
        )}
      </div>
    </div>
  );
};
