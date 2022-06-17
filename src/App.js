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
import Header from "./component/Header";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import PrivateRouter from "./utils/PrivateRouter";


function App() {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(refreshToken())
    }, [dispatch])

    return (
        <Router>
            <Alert/>
            {auth.token && <Header/>}
            <div className="App">
                <Routes>
                    <Route exact path={"/"} element={auth.token ? <Home/> : <Login/>}/>
                    <Route exact path={"/register"} element={<Register/>}/>
                    <Route exact path={"/message"} element={
                        <PrivateRouter>
                            <Messages/>
                        </PrivateRouter>
                    }/>
                    <Route exact path={"/notification"} element={
                        <PrivateRouter>
                            <Notifications/>
                        </PrivateRouter>
                    }/>
                    <Route exact path={"/explore"} element={
                        <PrivateRouter>
                            <Explore/>
                        </PrivateRouter>
                    }/>
                    <Route exact path={"/profile"} element={
                        <PrivateRouter>
                            <Profile/>
                        </PrivateRouter>
                    }/>
                    <Route path={"/post/:id"} element={
                        <PrivateRouter>
                            <Post/>
                        </PrivateRouter>
                    }/>
                    <Route path={"*"} element={<NotFound/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
