import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

function EventRegistration({ loggedId }) {
  //console.log(loggedId["id"]);

  const [eventRegistration, setRegistrationData] = useState({
    name: "",
    surname: "",
    category: "",
    belt: "",
    event_name: "",
    tournament_id: "",
  });

  let location = useLocation();

  function handleHidden() {
    let newEventRegistration = eventRegistration;
    newEventRegistration["event_name"] =
      document.eventForm.elements["event_name"].value;

    newEventRegistration["tournament_id"] =
      document.eventForm.elements["tournament_id"].value;
    setRegistrationData(newEventRegistration);
  }

  function handleInput(e) {
    let newEventRegistration = eventRegistration;
    newEventRegistration[e.target.name] = e.target.value;
    console.log(e.target.value);
    setRegistrationData(newEventRegistration);
  }

  function handleEventRegistration(e) {
    e.preventDefault();
    console.log(eventRegistration);
    console.log(e);

    var config = {
      method: "post",
      url:
        "api/registrations?name=" +
        eventRegistration["name"] +
        "&surname=" +
        eventRegistration["surname"] +
        "&category=" +
        eventRegistration["category"] +
        "&belt=" +
        eventRegistration["belt"] +
        "&event_name=" +
        eventRegistration["event_name"] +
        "&tournament_id=" +
        eventRegistration["tournament_id"],

      headers: {
        Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="registerForm">
      <form onSubmit={handleEventRegistration} name="eventForm">
        <h2>
          Register for: <br /> {location.state.event_name}
        </h2>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            onInput={handleInput}
          />
        </div>

        <div className="mb-3">
          <label>surname</label>
          <input
            type="text"
            className="form-control"
            name="surname"
            onInput={handleInput}
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            onInput={handleInput}
          />
        </div>

        <div className="mb-3">
          <label>Belt</label>
          <input
            type="text"
            className="form-control"
            name="belt"
            onInput={handleInput}
          />
        </div>

        <div>
          <input
            type="hidden"
            name="event_name"
            value={location.state.event_name}
          />
        </div>

        {/* <div>
          <input type="hidden" name="user_id" value={loggedId["id"]} />
        </div> */}

        <div>
          <input type="hidden" name="tournament_id" value={location.state.id} />
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleHidden}
          >
            Register to the Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventRegistration;
