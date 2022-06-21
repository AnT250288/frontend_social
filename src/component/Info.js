import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import "../styles/info.css"
import {getUserProfile} from "../redux/actions/profileAction";

const Info = () => {
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
    }, [id, auth.user, auth, dispatch, profile.users])


    return (
        <div className={"profileInfo"}>
            {userData.length > 0 && userData.map((user => (
                <div className={"profileInfo-container"} key={user._id}>
                    <div className={"profileInfo-top"}>
                        <img src={user.coverPicture} alt={"avatar"}/>
                    </div>
                    <div className={"profileInfo-center"}>
                        <img className={"profileInfo-centerAvatar"} src={user.avatar} alt={"avatar"}/>
                        <button className={"profileInfo-centerButton"}>Add Friend</button>
                    </div>
                    <div className={"profileInfo-bottom"}>
                        <div className={"profileInfo-bottomLeft"}>
                            <div className={"profileInfo-stat"}>
                                <h6 className={"profileInfo-statNumber"}>{user.friends.length}</h6>
                                <h6 className={"profileInfo-statDesc"}>Friends</h6>
                            </div>
                            <div className={"profileInfo-stat"}>
                                <h6 className={"profileInfo-statNumber"}>{user.following.length}</h6>
                                <h6 className={"profileInfo-statDesc"}>Following</h6>
                            </div>
                        </div>
                        <div className={"profileInfo-bottomCenter"}>
                            <h3 className={"profileInfo-fullName"}>{user.fullName}</h3>
                            <h5 className={"profileInfo-username"}>{user.username}</h5>
                        </div>

                        <div className={"profileInfo-bottomRight"}>
                            <div className={"profileInfo-stat"}>
                                <h6 className={"profileInfo-statNumber"}>{user.friends.length}</h6>
                                <h6 className={"profileInfo-statDesc"}>POSTS</h6>
                            </div>
                        </div>

                    </div>
                </div>
            )))}
        </div>
    )
}

export default Info