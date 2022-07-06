import './App.css';
import React, {useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRouter from './customRouter/PrivateRouter'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Alert from "./component/alert/Alert"
import Header from './component/header/Header'
import {useSelector, useDispatch} from 'react-redux'
import {refreshToken} from './redux/actions/authAction'
import {getPosts} from './redux/actions/postAction'
import {getSuggestions} from './redux/actions/suggestionsAction'
import StatusModal from "./component/StatusModal";
import PageRender from "./customRouter/PageRender";
import Discover from "./pages/discover";
import Message from "./pages/message/Message";


function App() {
    const {auth, status, modal} = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(refreshToken())
    }, [dispatch])

    useEffect(() => {
        if (auth.token) {
            dispatch(getPosts(auth.token))
            dispatch(getSuggestions(auth.token))
        }
    }, [dispatch, auth.token])

    return (
        <Router>
            <Alert/>

            <input type="checkbox" id="theme"/>
            <div className={`App ${(status || modal) && 'mode'}`}>
                <div className="main">
                    {auth.token && <Header/>}
                    {status && <StatusModal/>}

                    <Routes>
                        <Route path={"/"} element={auth.token ? <Home/> : <Login/>}/>
                        <Route path={"/register"} element={<Register/>}/>
                        <Route path={"/discover"} element={<Discover/>}/>
                        <Route path={"/message"} element={<Message/>}/>
                        <Route path={"/post/:id"} element={
                            <PrivateRouter>
                                <PageRender/>
                            </PrivateRouter>
                        }/>
                        <Route exact path="/:page/:id" element={
                            <PrivateRouter>
                                <PageRender/>
                            </PrivateRouter>
                        }/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
