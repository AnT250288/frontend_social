import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addFriend, unFriends} from "../redux/actions/profileAction";

const GlobalFriendsBtn = ({classBtn, user}) => {
    const dispatch = useDispatch()
    const {auth, profile} = useSelector(state => state)
    const [friend, setFriend] = useState(false)

    useEffect(() => {
        if (auth.user.following.find(item => item._id === user._id)) {
            setFriend(true)
        }
    }, [auth.user.following, user._id])


    const follow = () => {
        setFriend(true)
        dispatch(addFriend({users: profile.users, user, auth}))
    }
    const unfollow = () => {
        setFriend(false)
        dispatch(unFriends({users: profile.users, user, auth}))
    }


    return (
        <>
            {friend ?
                <button className={classBtn}
                        onClick={unfollow}
                        style={{backgroundColor: 'crimson'}}>Remove Friend</button> :
                <button className={classBtn}
                        onClick={follow}>Add Friend</button>
            }
        </>
    )
}

export default GlobalFriendsBtn