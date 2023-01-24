import React from "react";

function JokeComponent({ joke }) {
   return (
      <div className="container my-5">
         <p className="joke">{joke.value}</p>
      </div>
   );
}

export default JokeComponent;
