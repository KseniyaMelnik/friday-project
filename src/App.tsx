import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import {Login} from "./components/Login";
import {Registration} from "./components/Registration";
import {Profile} from "./components/Profile";
import {NewPassword} from "./components/NewPassword";
import {PasswordRetrieval} from "./components/PasswordRetrieval";
import {Test} from "./components/Test";
import Error404 from "./components/Error404/Error404";

function App() {
  return (
    <div className="App">
     <Routes >
         <Route path={"/login"} element={<Login />} />
         <Route path={"/registration"} element={<Registration />} />
         <Route path={"/profile"} element={<Profile />} />
         <Route path={"/new_password"} element={<NewPassword />} />
         <Route path={"/retrieval"} element={<PasswordRetrieval />} />
         <Route path={"/*"} element={<Error404 />} />
         <Route path={"/test"} element={<Test />} />
     </Routes>
    </div>
  );
}

export default App;
