import "../styles/info.css"
import {useState} from "react";
import EditProfile from "./EditProfile";
import GlobalFriendsBtn from "./GlobalFriendsBtn";


const Info = ({userData, profile, auth, id}) => {

    const [onEdit, setOnEdit] = useState(false)

    return (
        <div className={"profileInfo"}>
            {userData.length > 0 && userData.map((user => (
                <div className={"profileInfoContainer"} key={user._id}>
                    <div className={"profileInfoTop"}>
                        <img src={user.coverPicture} alt={"avatar"}/>
                    </div>
                    <div className={"profileInfoCenter"}>
                        <img className={"profileInfoCenterAvatar"} src={user.avatar} alt={"avatar"}/>
                        {
                            user._id && auth && user._id === auth.user._id ?
                                <button className={"profileInfoCenterButton"}
                                        onClick={() => setOnEdit(true)}>EDIT PROFILE
                                </button>
                                : <GlobalFriendsBtn classBtn="profileInfoCenterButton"/>
                        }
                    </div>
                    <div className={"profileInfoBottom"}>
                        <div className={"profileInfoBottomLeft"}>
                            <div className={"profileInfoStat"}>
                                <h6 className={"profileInfoStatNumber"}>{user.friends.length}</h6>
                                <h6 className={"profileInfoStatDesc"}>Friends</h6>
                            </div>
                            <div className={"profileInfo-stat"}>
                                <h6 className={"profileInfoStatNumber"}>{user.following.length}</h6>
                                <h6 className={"profileInfoStatDesc"}>Following</h6>
                            </div>
                        </div>
                        <div className={"profileInfoBottomCenter"}>
                            <h3 className={"profileInfoFullName"}>{user.fullName}</h3>
                            <h5 className={"profileInfoUsername"}>{user.username}</h5>
                        </div>

                        <div className={"profileInfoBottomRight"}>
                            <div className={"profileInfoStat"}>
                                <h6 className={"profileInfoStatNumber"}>{user.friends.length}</h6>
                                <h6 className={"profileInfoStatDesc"}>POSTS</h6>
                            </div>
                        </div>
                    </div>
                    {
                        onEdit && <EditProfile user={user} setOnEdit={setOnEdit}/>
                    }
                </div>
            )))}
        </div>
    )
}

export default Info