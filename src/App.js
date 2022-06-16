import './App.css';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Post from "./pages/Post";
import NotFound from "./pages/NotFound";
import Alert from "./component/Alert";
import {useDispatch, useSelector} from "react-redux";
import Home from "./pages/Home";
import {refreshToken} from "./redux/actions/authAction";
import Register from "./pages/Register";


function App() {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(refreshToken())
    }, [dispatch])

    return (
        <Router>
            <Alert/>
            <div className="App">
                <Routes>
                    <Route path={"/"} element={auth.token ? <Home/> : <Login/>}/>
                    <Route path={"/register"} element={<Register/>}/>
                    <Route path={"/post/:id"} element={<Post/>}/>
                    <Route element={<NotFound/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
