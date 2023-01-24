import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function LocationInfo() {
   const [countries] = useState([
      { name: "Austria", code: "AT" },
      { name: "Bosnia and Herzegovina", code: "BA" },
      { name: "Croatia", code: "HR" },
      { name: "Serbia", code: "RS" },
      { name: "Slovakia", code: "SK" },
   ]);
   const [cities, setCities] = useState([]);
   const [cityCode, setCityCode] = useState([]);
   const style = {
      backgroundColor: "white",
      opacity: 0.97,
      textAlign: "center",
      borderRadius: "25px",
      border: "2px solid grey",
      marginTop: "50px",
      marginBottom: "60px",
      marginRight: "20px",
      marginLeft: "20px",

    };
   const onChangeComboBox = (e) => {
      const countryID = e.target.value;
      setCityCode(e.target.value);
      console.log(e.target.value);

      const options = {
         method: "GET",
         url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
         params: { countryIds: countryID },
         headers: {
            "X-RapidAPI-Key":
               "49c4f4f5f5msh1c7d46e8ba824fep11da76jsnea122c26994c",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
         },
      };

      axios
         .request(options)
         .then(function (response) {
            console.log(response.data.data);
            setCities(response.data.data);
         })
         .catch(function (error) {
            console.error(error);
         });
   };

   const onChnageInput = (e) => {
      const options = {
         method: "GET",
         url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
         params: { countryIds: cityCode, namePrefix: e.target.value },
         headers: {
            "X-RapidAPI-Key":
               "49c4f4f5f5msh1c7d46e8ba824fep11da76jsnea122c26994c",
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
         },
      };

      axios
         .request(options)
         .then(function (response) {
            console.log(response.data.data);
            setCities(response.data.data);
         })
         .catch(function (error) {
            console.error(error);
         });
   };

   return (
      <div className="container mt-5">
         <div>
            <select
               onChange={(e) => {
                  onChangeComboBox(e);
               }}
            >
               {countries.map((country, code) => (
                  <option key={code} value={country.code}>
                     {" "}
                     {country.name}
                  </option>
               ))}
            </select>{" "}
            <input
               type="text"
               onChange={(e) => {
                  onChnageInput(e);
               }}
            />
         </div>

         <div>
         <div style={style}>
            <table className="table mt-5">
               <thead>
                  <tr style={{ color: "black" }}>
                     <th scope="col">CITY</th>
                     <th scope="col">REGION</th>
                     <th scope="col">COUNTRY CODE</th>
                     <th scope="col">LATITUDE</th>
                     <th scope="col">LONGITUDE</th>
                     <th scope="col">COUNTRY</th>
                  </tr>
               </thead>
               <tbody>
                  {cities.map((city) => (
                     <tr key={city.id}>
                        <td className="citiesTD">{city.city}</td>
                        <td className="citiesTD">{city.region}</td>
                        <td className="citiesTD">{city.countryCode}</td>
                        <td className="citiesTD">{city.latitude}</td>
                        <td className="citiesTD">{city.longitude}</td>
                        <td className="citiesTD">{city.country}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
            </div>
         </div>
      </div>
   );
}

export default LocationInfo;
