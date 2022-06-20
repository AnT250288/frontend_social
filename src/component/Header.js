import "../styles/header.css"
import IconButton from "@material-ui/core/IconButton";
import {Avatar} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search"
import HomeIcon from "@material-ui/icons/Home"
import ExploreIcon from "@material-ui/icons/Explore"
import MessageIcon from "@material-ui/icons/Message"
import NotificationsIcon from "@material-ui/icons/Notifications"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/actions/authAction";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {getDataApi} from "../utils/fetchApi";
import {ALERT_TYPES} from "../redux/actions/alertAction";
import UserCard from "./UserCard";


const Header = () => {
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const {pathname} = useLocation()

    useEffect(() => {
        if (search && auth.token) {
            getDataApi(`search?username=${search}`, auth.token)
                .then(res => setUsers(res.data.users))
                .catch(err => {
                    dispatch({
                        type: ALERT_TYPES.ALERT,
                        payload: {error: err.response.data.msg}
                    })
                })
        }
    }, [search, auth.token, dispatch])

    const isActive = (pn) => {
        if (pn === pathname) {
            return '"active'
        }
    }

    return (
        <div className={"header"}>
            <div className={"headerRight"}>
                <h3>Social Network</h3>
            </div>

            <form className={"headerCenter"}>
                <input type={"text"} placeholder={"Search profiles"} value={search}
                       onChange={(e) => setSearch(e.target.value)}/>
                <SearchIcon/>
            </form>
            {
                users.length > 0 && users.map(user => (
                    <Link to={`profile/${user._id}`} key={user._id}>
                        <UserCard/>
                    </Link>
                ))
            }


            <div className={"headerLeft"}>
                <Link to={`profile/${auth.user._id}`}>
                    <div className={"headerLeftAvatar"}>
                        <Avatar src={auth.user.avatar}/>
                        <h3>{auth.user.fullName}</h3>
                    </div>
                </Link>

                <Link to={'/'}>
                    <IconButton>
                        <HomeIcon/>
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


