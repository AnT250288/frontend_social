import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getUserProfile} from "../redux/actions/profileAction";
import {useEffect, useState} from "react";

const About = () => {

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
        <div className={"about"}>
            {userData.length> 0 && userData.map(user=>(
                <div className={"aboutContainer"} key={user._id}>
                    <div className={"aboutContentTop"}>
                        <h4>Bio</h4>
                        <p>{user.story}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default About