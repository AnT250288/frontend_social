import "../styles/info.css"
import {useState} from "react";
import EditProfile from "./EditProfile";


const Info = ({userData, profile, auth, id}) => {

    const [onEdit, setOnEdit] = useState(false)

    return (
        <div className={"profileInfo"}>
            {userData.length > 0 && userData.map((user => (
                <div className={"profileInfo-container"} key={user._id}>
                    <div className={"profileInfo-top"}>
                        <img src={user.coverPicture} alt={"avatar"}/>
                    </div>
                    <div className={"profileInfo-center"}>
                        <img className={"profileInfo-centerAvatar"} src={user.avatar} alt={"avatar"}/>
                        <button className={"profileInfo-centerButton"} onClick={() => setOnEdit(true)}>EDIT PROFILE
                        </button>
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
                    {
                        onEdit && <EditProfile user={user} setOnEdit={setOnEdit}/>
                    }
                </div>
            )))}
        </div>
    )
}

export default Info