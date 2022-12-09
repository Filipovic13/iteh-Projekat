import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function ViewTournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      var config = {
        method: "get",
        url: "api/admin/tournaments",
        headers: {
          Authorization:
            "Bearer " + window.sessionStorage.getItem("auth_token"),
        },
      };

      axios(config)
        .then(function (response) {
          setTournaments(response.data.tournaments);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    };

    loadData();
  }, []);

  const deleteTournament = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting";

    axios
      .delete(`api/admin/tournaments/${id}`)
      .then((response) => {
        if (response.data.status === 200) {
          swal("Success", response.data.message, "success");
          thisClicked.closest("tr").remove();
        }
      })
      .catch();
  };

  if (loading) {
    return <h4>Loading All Tournaments</h4>;
  }
  return (
    <div className="container-fluid px-4 ">
      <h1>Tournamnets</h1>

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
              <th scope="col">EVENT NAME</th>
              <th scope="col">COUNTRY</th>
              <th scope="col">CITY</th>
              <th scope="col">RULESET</th>
              <th scope="col">DATE</th>
              <th scope="col">IMAGE URL</th>
            </tr>
          </thead>
          <tbody>
            {tournaments.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{t.event_name}</td>
                <td>{t.country}</td>
                <td>{t.city}</td>
                <td>{t.ruleset}</td>
                <td>{t.date}</td>
                <td>{t.image_url}</td>
                <td>
                  <Link
                    to={`/admin/tournaments/${t.id}/edit`}
                    className="btn btn-success btn-sm"
                  >
                    Edit{" "}
                  </Link>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={(e) => deleteTournament(e, t.id)}
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
