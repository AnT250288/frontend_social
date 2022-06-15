import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path={"/"} element={<Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/post/:id"} element={<Post/>}/>
                    <Route element={<NotFound/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
