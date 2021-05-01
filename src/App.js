import './App.css';
import React, { useState, useEffect } from 'react';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import property from "./components/Property";
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";
import PropertyCollection from "./components/propertyCollection"
import ComplistCollection from "./components/ComplistCollection"

// import { useHistory } from "react-router-dom";


// const homesUrl = "http://localhost:3000/properties"
function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [properties, setProperties] = useState([])
  // const [complists, setComplists] = useState([])

  const handleUpdateComplist = (updatedComplist) => {
  //   const newComplist = complists.map(complist => {
  //     if (complist.id === updatedComplist.id) {
  //       return updatedComplist
  //     }else{
  //       return complist
  //     }
  //   })
  //   setComplists(newComplist)
  // }

  // function handleAddComplist(newComplist){
  //   console.log("new Item", newComplist)
  //   console.log("full List", complists)
  //   const updatedComplistsArr = [...complists, newComplist]
  //   setComplists(updatedComplistsArr)
  // }

  useEffect(() => {
    // const token = true
    const userId = localStorage.getItem("userId")
    if (userId) {
      setCurrentUser(userId)
    }

  }, [])

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId")
  //   if (userId){
  //     fetch(`http://localhost:3000/users/${userId}`)
  //     .then((r) => r.json())
  //     .then((data) => setComplists(data.complists))
  //   } 
  // }, [])

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup">
            <SignUp setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path="/login">
            <Login setCurrentUser={setCurrentUser} />
          </Route>
          <Route exact path="/complists">
            <ComplistCollection 
              currentUser={currentUser}
            />
            </Route>
            <Route exact path="/">
              {currentUser ? 
                (<> 
                  <h1 className="letter"> Welcome, {currentUser.username} </h1>
                  <PropertyCollection property={properties} onAddComplist={handleAddComplist} currentUser={currentUser} /> 
                </>) 
                : 
                (<h1 className="letter"> Please Login or SignUp </h1>)}
          </Route>
        </Switch>  
      </BrowserRouter>  
    </div>
  )
}

export default App;
