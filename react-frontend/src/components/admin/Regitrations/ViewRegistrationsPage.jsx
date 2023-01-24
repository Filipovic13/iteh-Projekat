import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function ViewRegistrationsPage() {
   const [registrations, setRegistrations] = useState([]);
   const [loadind, setLoading] = useState(true);
   useEffect(() => {
      var data = {
         method: "get",
         url: "api/admin/registrations",
         headers: {
            Authorization:
               "Bearer " + window.sessionStorage.getItem("auth_token"),
         },
      };

      axios(data)
         .then(function (response) {
            console.log(response.data);
            setRegistrations(response.data);
            setLoading(false);
         })
         .catch(function (error) {
            console.log(error);
            setLoading(false);
         });
   }, []);

   return (
      <div className="container-fluid px-4 ">
         <h1>Registrations</h1>

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
                     <th scope="col">NAME</th>
                     <th scope="col">SURNAME</th>
                     <th scope="col">CATEGORY</th>
                     <th scope="col">BELT</th>
                     <th scope="col">EVENT NAME</th>
                     <th scope="col">COUNTRY</th>
                     <th scope="col">CITY</th>
                     <th scope="col">RULESET</th>
                     <th scope="col">DATE</th>
                  </tr>
               </thead>
               <tbody>
                  {registrations.map((r, index) => (
                     <tr key={index}>
                        <td>{r.name}</td>
                        <td>{r.surname}</td>
                        <td>{r.category}</td>
                        <td>{r.belt}</td>
                        <td>{r.event_name}</td>
                        <td>{r.country}</td>
                        <td>{r.city}</td>
                        <td>{r.ruleset}</td>
                        <td>{r.date}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default ViewRegistrationsPage;
