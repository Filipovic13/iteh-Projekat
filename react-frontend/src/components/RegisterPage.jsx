import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {

  const [userData, setUserData] = useState({
    name:"",
    surname:"",
    country:"",
    city:"",
    club:"",
    email:"",
    password:"",
  });
  let navigate = useNavigate();

  function handleInput(e){
    let newUserData =userData;
    newUserData[e.target.name] = e.target.value;
    //console.log(newUserData);
    setUserData(newUserData);
  }

  function handleRegister(e){
    e.preventDefault();
    axios.post("api/register", userData).then((res)=>{
      console.log(res.data);
      navigate("/login")
     
    }).catch((e)=>{
      console.log(e);
    })
  }
  return (
    <div className='registerForm'>
    <form onSubmit={handleRegister}>
      <h3>Welcome!</h3>
      <h2>Register now</h2>

      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your name"
          name='name'
          onInput={handleInput}
        />
      </div>

      <div className="mb-3">
        <label>surname</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your lastname"
          name='surname'
          onInput={handleInput}
        />
      </div>

      <div className="mb-3">
        <label>Country</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter country where are you coming from"
          name='country'
          onInput={handleInput}
        />
      </div>

      <div className="mb-3">
        <label>City</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter city where you live"
          name='city'
          onInput={handleInput}
        />
      </div>

      <div className="mb-3">
        <label>Club</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name of the club"
          name='club'
          onInput={handleInput}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name='email'
          onInput={handleInput}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name='password'
          onInput={(e)=>handleInput(e)}
        />
      </div>
     
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
  </form>
</div>
  )
}
