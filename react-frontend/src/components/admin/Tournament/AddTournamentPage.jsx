import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

export default function AddTournamentPage() {
   //const [loading, setLoading] = useState(true);

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
            Authorization:
               "Bearer " + window.sessionStorage.getItem("auth_token"),
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

   // if (loading) {
   //   return <h4>Loading All Tournaments</h4>;
   // }
   return (
      <div className="container-fluid px-4 ">
         <h1>Add Tournamnet</h1>

         <div
            style={{
               backgroundColor: "white",
               borderRadius: "33px",
               padding: "20px",
            }}
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
   );
}
