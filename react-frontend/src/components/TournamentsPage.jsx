import React from "react";
import OneTournament from "./OneTournament";
import axios from "axios";
import { useState, useEffect } from "react";

function TournamentsPage() {
  const [tournaments, setTournaments] = useState();
  useEffect(() => {
    if (tournaments == null) {
      axios.get("api/tournaments").then((res) => {
        console.log(res.data);
        setTournaments(res.data.tournaments);
      });
    }
  }, [tournaments]);

  return (
    <div>
      <h3>These are all tournaments</h3>
      {tournaments == null ? (
        <></>
      ) : (
        tournaments.map((tournament) => (
          <OneTournament tournament={tournament} key={tournament.id} />
        ))
      )}
    </div>
  );
}

export default TournamentsPage;
