import React, { useState } from 'react';
import {Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import Form from './components/User';

function App() {

  const [user, setUser] = useState(null);

  const loginComponent = (newVariable) =>{
    setUser(newVariable);
    
  };
  console.log(user)
  return (
    <Routes>
      <Route>
      <Route path="/" element={<Landing />} />
        <Route path="/verify" element={<Login onLogin={loginComponent}/>} />
        <Route path="/signup" element={<Signup/>} />
        {user?
        <Route>
        <Route path="/verify/dashboard" element={<Dashboard user={user}/>} />
        <Route path="/user" element={<Form/>} />
        </Route>: <></>}
      </Route>
    </Routes>
  );
}

export default App;
