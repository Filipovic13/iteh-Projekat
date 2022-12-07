import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

export default function AddTournamentPage() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // const response = await axios.get("api/tournaments");
      // console.log(response.data.tournaments);
      // setData(response.data.tournaments);

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
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    loadData();
  }, []);

  const [tournament, setTournament] = useState({
    event_name: "",
    country: "",
    city: "",
    ruleset: "",
    date: "",
    image_url: "",
  });

  function handleInput(e) {
    let newTournament = tournament;
    newTournament[e.target.name] = e.target.value;
    console.log(e.target.value);
    setTournament(newTournament);
  }

  function handleAddedTournament(e) {
    e.preventDefault();
    console.log(tournament);
    console.log(e);

    var config = {
      method: "post",
      url:
        "api/admin/tournaments?event_name=" +
        tournament["event_name"] +
        "&country=" +
        tournament["country"] +
        "&city=" +
        tournament["city"] +
        "&ruleset=" +
        tournament["ruleset"] +
        "&date=" +
        tournament["date"] +
        "&image_url=" +
        tournament["image_url"],
      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.status === 200) {
          swal("Success", response.data.message, "success");
          document.getElementById("formAddTournament").reset();
        } else if (response.data.status === 400) {
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="view-all-tab"
              data-bs-toggle="tab"
              data-bs-target="#view-all-tab-pane"
              type="button"
              role="tab"
              aria-controls="view-all-tab-pane"
              aria-selected="true"
            >
              View all
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="add-new-tab"
              data-bs-toggle="tab"
              data-bs-target="#add-new-tab-pane"
              type="button"
              role="tab"
              aria-controls="add-new-tab-pane"
              aria-selected="false"
            >
              Add new
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="view-all-tab-pane"
            role="tabpanel"
            aria-labelledby="view-all-tab"
            tabIndex="0"
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className="tab-pane fade"
            id="add-new-tab-pane"
            role="tabpanel"
            aria-labelledby="add-new-tab"
            tabIndex="0"
          >
            <form
              onSubmit={handleAddedTournament}
              id="formAddTournament"
              className="form-group"
              style={{ color: "black" }}
            >
              <div className="form-group">
                <label>Event name</label>
                <input
                  type="text"
                  className="form-control"
                  name="event_name"
                  placeholder="Name of the event - tournament"
                  onInput={handleInput}
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  placeholder="Country where event is taking place"
                  onInput={handleInput}
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  placeholder="City"
                  onInput={handleInput}
                />
              </div>

              <div className="form-group">
                <label>Ruleset</label>
                <input
                  type="text"
                  className="form-control"
                  name="ruleset"
                  placeholder="ADCC / Submission / Grappling / IBJF"
                  onInput={handleInput}
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  onInput={handleInput}
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  name="image_url"
                  placeholder="URL of the image"
                  onInput={handleInput}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
