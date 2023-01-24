import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import JokeComponent from "./JokeComponent";

export default function ChuckNorrisJokes() {
   const [categories, setCategories] = useState([]);
   const [jokes, setJokes] = useState([]);

   useEffect(() => {
      const loadData = async () => {
         const options = {
            method: "GET",
            url: "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/categories",
            headers: {
               accept: "application/json",
               "X-RapidAPI-Key":
                  "49c4f4f5f5msh1c7d46e8ba824fep11da76jsnea122c26994c",
               "X-RapidAPI-Host":
                  "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
            },
         };

         axios(options)
            .then(function (response) {
               console.log(response.data);
               setCategories(response.data);
            })
            .catch(function (error) {
               console.error(error);
            });
      };

      loadData();
   }, []);

   const onChangeComboBox = (e) => {
      const selectedCategorie = e.target.value;
      console.log(selectedCategorie);

      const options = {
         method: "GET",
         url: "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/search",
         params: { query: selectedCategorie },
         headers: {
            accept: "application/json",
            "X-RapidAPI-Key":
               "49c4f4f5f5msh1c7d46e8ba824fep11da76jsnea122c26994c",
            "X-RapidAPI-Host":
               "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
         },
      };

      axios
         .request(options)
         .then(function (response) {
            console.log(response.data.result);
            setJokes(response.data.result);
         })
         .catch(function (error) {
            console.error(error);
         });
   };
   return (
      <div style={{ color: "white" }} className="container my-5">
         <div>
            {" "}
            Categories of jokes:{"  "}
            <select
               name="custom-select"
               onChange={(e) => {
                  onChangeComboBox(e);
               }}
            >
               {categories.map((categoie) => (
                  <option key={categoie}> {categoie} </option>
               ))}
            </select>
         </div>

         <ul>
            {jokes == null ? (
               <></>
            ) : (
               jokes.map((joke) => {
                  return <JokeComponent key={joke.id} joke={joke} />;
               })
            )}
         </ul>
      </div>
   );
}
