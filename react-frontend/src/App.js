import './App.css';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NavBar from './components/NavBar';
import TournamentsPage from './components/TournamentsPage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState} from "react";
import EventRegistration from './components/EventRegistration';


function App() {
  const [token, setToken] = useState();
  const [loggedInUser, setLoggedUser] = useState({
    id:"",
    name:"",
    email:"",
  });

  function addLoggedData(logged_user){
    setLoggedUser(logged_user);
  }

  function addToken(auth_token){
    setToken(auth_token);
  }


  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path='/login' element={<LoginPage addToken={addToken} addLoggedData={addLoggedData} />} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/' element={<NavBar token={token} />} >
            <Route path="tournaments" element={<TournamentsPage/>} />
            <Route path="eventRegistration" element={<EventRegistration  loggedInUser={loggedInUser}/>} />
        </Route>
      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
