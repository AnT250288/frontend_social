import Posts from "../component/Posts";
import Info from "../component/Info";
import About from "../component/About";
import "../styles/profile.css"
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../redux/actions/profileAction";
import {useEffect, useState} from "react";

const Profile = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const {auth, profile} = useSelector(state => state)
    const [userData, setUserData] = useState([])


    useEffect(() => {
        if (auth && auth.user && id === auth.user._id) {
            setUserData([auth.user])
        } else {
            dispatch(getUserProfile({users: profile.users, id, auth}))
            const newData = profile.users.filter(user => user._id === id)
            setUserData(newData)
        }
    }, [id, auth, profile.users, dispatch])
    return (
        <div className={"profile"}>
            <Info userData={userData} profile={profile} auth={auth} id={id}/>
            <div className={"profileBody"}>
                <div className={"profileBodyLeft"}>
                    <About userData={userData} profile={profile} auth={auth} id={id}/>
                </div>
                <div className={"profileBodyCenter"}>
                    <Posts/>
                </div>
                <div className={"profileBodyRight"}>
                    <Posts/>
                </div>
            </div>

        </div>
    )
}

export default Profile