import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function EditTournamentPage() {
   const { tournamentId } = useParams();
   const navigate = useNavigate();

   const [loading, setLoading] = useState(true);
   const [tournamentInput, setTournamentInput] = useState({
      event_name: "",
      country: "",
      city: "",
      ruleset: "",
      date: "",
      image_url: "",
   });

   useEffect(() => {
      fetchTournamentData();
   }, []);

   const fetchTournamentData = async () => {
      await axios
         .get(`api/admin/tournaments/${tournamentId}/edit`)
         .then((response) => {
            setTournamentInput(response.data.tournament);
         })
         .catch(function (error) {
            console.log(error);
         });
      setLoading(false);
   };

   function handleInput(e) {
      setTournamentInput({
         ...tournamentInput,
         [e.target.name]: e.target.value,
      });
   }

   const updateTournament = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("event_name", tournamentInput.event_name);
      formData.append("country", tournamentInput.country);
      formData.append("city", tournamentInput.city);
      formData.append("ruleset", tournamentInput.ruleset);
      formData.append("date", tournamentInput.date);
      formData.append("image_url", tournamentInput.image_url);

      await axios
         .post("api/admin/tournaments/" + tournamentId, formData)
         .then((response) => {
            if (response.data.status === 200) {
               swal("Success", response.data.message, "success");
               navigate("/admin/tournaments");
            }
         })
         .catch((response) => {
            console.log(response);
         });
   };

   if (loading) {
      return <h4>Loading Tournament...</h4>;
   }

   return (
      <div className="container-fluid px-4">
         <h4>Edit Tournament</h4>
         <div
            style={{
               backgroundColor: "white",
               borderRadius: "33px",
               padding: "20px",
            }}
         >
            <form
               onSubmit={updateTournament}
               id="formEditTournament"
               className="form-group"
               style={{ color: "black" }}
            >
               <div className="form-group">
                  <label>Event name</label>
                  <input
                     type="text"
                     className="form-control"
                     name="event_name"
                     onChange={handleInput}
                     value={tournamentInput.event_name}
                  />
               </div>

               <div className="form-group">
                  <label>Country</label>
                  <input
                     type="text"
                     className="form-control"
                     name="country"
                     onChange={handleInput}
                     value={tournamentInput.country}
                  />
               </div>

               <div className="form-group">
                  <label>City</label>
                  <input
                     type="text"
                     className="form-control"
                     name="city"
                     onChange={handleInput}
                     value={tournamentInput.city}
                  />
               </div>

               <div className="form-group">
                  <label>Ruleset</label>
                  <input
                     type="text"
                     className="form-control"
                     name="ruleset"
                     onChange={handleInput}
                     value={tournamentInput.ruleset}
                  />
               </div>
               <div className="form-group">
                  <label>Date</label>
                  <input
                     type="date"
                     className="form-control"
                     name="date"
                     onChange={handleInput}
                     value={tournamentInput.date}
                  />
               </div>

               <div className="form-group">
                  <label>Image URL</label>
                  <input
                     type="text"
                     className="form-control"
                     name="image_url"
                     onChange={handleInput}
                     value={tournamentInput.image_url}
                  />
               </div>

               <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleInput}
               >
                  Update
               </button>
            </form>
         </div>
      </div>
   );
}

export default EditTournamentPage;
