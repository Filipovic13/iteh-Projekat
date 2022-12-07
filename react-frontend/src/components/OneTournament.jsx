import React from "react";
import { useNavigate } from "react-router-dom";

function OneTournament({ tournament }) {
  let navigate = useNavigate();
  function handleRegClick(id, event_name) {
    navigate("/registrations", {
      state: { id: id, event_name: event_name },
    });
  }

  return (
    <div className="cardTournament">
      <div className="row g-0">
        <div className="col-3 ">
          <img
            src={tournament.image_url}
            className="img-fluid w-100"
            alt="img"
          />
        </div>
        <div className="col-6 ">
          <div className="card-body">
            <h3 className="card-title">{tournament.event_name}</h3>
            <p className="card-text">Country: {tournament.country}</p>
            <p className="card-text">City: {tournament.city}</p>
            <p className="card-text">Ruleset: {tournament.ruleset}</p>
            <p className="card-text">Date of thr event: {tournament.date}</p>
          </div>
        </div>
        <div
          className="col-3"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="btn btn-light"
            onClick={() => handleRegClick(tournament.id, tournament.event_name)}
          >
            Register to the event
          </button>
        </div>
      </div>
    </div>
  );
}

export default OneTournament;
