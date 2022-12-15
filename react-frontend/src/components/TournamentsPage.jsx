import React from "react";
import OneTournament from "./OneTournament";
import axios from "axios";
import { useState, useEffect } from "react";

function TournamentsPage() {
   const [data, setData] = useState([]);
   const [searchName, setSearchName] = useState("");

   useEffect(() => {
      const loadData = async () => {
         var config = {
            method: "get",
            url: "api/tournaments",
            headers: {
               Authorization:
                  "Bearer " + window.sessionStorage.getItem("auth_token"),
            },
         };

         axios(config)
            .then(function (response) {
               //console.log(JSON.stringify(response.data));
               setData(response.data.tournaments);
            })
            .catch(function (error) {
               console.log(error);
            });
      };

      loadData();
   }, []);

   return (
      <div>
         <div>
            <input
               type="text"
               placeholder="Search.."
               onChange={(e) => setSearchName(e.target.value)}
            />
         </div>
         <h3>These are all tournaments</h3>
         {data == null ? (
            <></>
         ) : (
            data
               .filter((value) => {
                  if (searchName === "") {
                     return value;
                  } else if (
                     value.event_name
                        .toLowerCase()
                        .includes(searchName.toLowerCase())
                  ) {
                     return value;
                  }
               })
               .map((tournament) => (
                  <OneTournament tournament={tournament} key={tournament.id} />
               ))
         )}
      </div>
   );
}

export default TournamentsPage;
