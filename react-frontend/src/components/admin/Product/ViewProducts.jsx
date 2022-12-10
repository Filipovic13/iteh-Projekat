import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      var config = {
        method: "get",
        url: "api/admin/products",
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("auth_token"),
        },
      };

      axios(config)
        .then(function (response) {
          setProducts(response.data.products);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    };

    loadData();
  }, []);

  const deleteProduct = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios
      .delete(`api/admin/products/${id}`)
      .then((response) => {
        if (response.data.status === 200) {
          swal("Success", response.data.message, "success");
          thisClicked.closest("tr").remove();
        }
      })
      .catch();
  };

  if (loading) {
    return <h4>Loading All Products</h4>;
  }
  return (
    <div className="container-fluid px-4 ">
      <h1>Products</h1>

      <div
        style={{
          backgroundColor: "white",
          borderRadius: "33px",
          padding: "20px",
        }}
      >
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">PRICE</th>
              <th scope="col">CATEGORY</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">BRAND</th>
              <th scope="col">IMAGE URL</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.price}</td>
                  <td>{p.category}</td>
                  <td>{p.quantity}</td>
                  <td>{p.brand}</td>
                  <td>{p.image_url}</td>
                  <td>
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="btn btn-success btn-sm"
                    >
                      Edit{" "}
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={(e) => deleteProduct(e, p.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
