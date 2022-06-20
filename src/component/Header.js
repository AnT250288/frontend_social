import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/actions/authAction";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getDataApi} from "../utils/fetchApi";
import "../styles/header.css";
import IconButton from "@material-ui/core/IconButton";
import {Avatar} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {ALERT_TYPES} from "../redux/actions/alertAction";
import UserCard from "./UserCard";
import LoadingIcon from "../images/loading.gif"


const Header = () => {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [load, setLoad] = useState(false)
    const {pathname} = useLocation()

    /*useEffect(() => {
        if (search && auth.token) {
            getDataApi(`search?username=${search}`, auth.token)
                .then(res => setUsers(res.data.users))
                .catch(err => {
                    dispatch({
                        type: ALERT_TYPES.ALERT,
                        payload: {error: err.response.data.msg}
                    })
                })
        } else {
            setUsers([])
        }
    }, [search, auth.token, dispatch])*/

    const isActive = (pn) => {
        if (pn === pathname) return 'active'
    }

    const closeHandle = () => {
        setSearch('')
        setUsers([])
    }

    const searchHandle = async (e) => {
        e.preventDefault()
        if (!search) return;
        try {
            setLoad(true)
            const res = await getDataApi(`search?username=${search}`, auth.token)
            setUsers(res.data.users)
            setLoad(false)
        } catch (err) {
            dispatch({
                type: ALERT_TYPES.ALERT,
                payload: {error: err.response.data.msg}
            })
        }
    }

    return (
        <div className={"header"}>
            <div className={"header-right"}>
                <h3>Social Network</h3>
            </div>

            <form className={"header-center"} onSubmit={searchHandle}>
                <input type={"text"} placeholder={"Search profiles"} value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
                <SearchIcon style={{opacity: users.length > 0 ? '0' : '1'}}/>
                <span className={"header-centerSearchClose"} onClick={closeHandle}
                      style={{opacity: users.length > 0 ? '1' : '0'}}
                >&times;</span>
                <button type={"submit"} style={{display: "none"}}>Search</button>

                <div className={"header-search"}>
                    {load && <img src={LoadingIcon} alt={"loading"} style={{width: "48px", height: "48px"}}/>}
                    {
                        search && users.length > 0 && users.map(user => (
                            <UserCard user={user} key={user._id} closeHandle={closeHandle}/>
                        ))
                    }
                </div>
            </form>


            <div className={"header-left"}>
                <Link to={`profile/${auth.user._id}`}>
                    <div className={"header-leftAvatar"}>
                        <Avatar src={auth.user.avatar}/>
                        <h4 style={{color: "white"}}>{auth.user.fullName}</h4>
                    </div>
                </Link>

                <Link to={'/'}>
                    <IconButton>
                        <HomeIcon className={`${isActive('/')}`}/>
                    </IconButton>
                </Link>

                <Link to={'/message'}>
                    <IconButton>
                        <MessageIcon className={`${isActive('/message')}`}/>
                    </IconButton>
                </Link>

                <Link to={"/notification"}>
                    <IconButton>
                        <NotificationsIcon className={`${isActive('/notification')}`}/>
                    </IconButton>
                </Link>

                <Link to={'/explore'}>
                    <IconButton>
                        <ExploreIcon className={`${isActive('/explore')}`}/>
                    </IconButton>
                </Link>

                <IconButton onClick={() => dispatch(logout())}>
                    <ExitToAppIcon/>
                </IconButton>


            </div>
        </div>
    )
}

export default Header


