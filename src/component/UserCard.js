import {Avatar} from "@material-ui/core";
import {Link} from "react-router-dom";

const UserCard = ({user, closeHandle}) => {
    const closeAllHandle = () => {
        if (closeHandle) closeHandle()
    }

    return (
        <div>
            <div style={{
                display: 'flex',
                padding: '10px',
                alignItems: 'center',
                borderBottom: "1px solid rgba(152, 238, 135, 0.87)"
            }}>
                < Link to={`profile/${user._id}`
                } onClick={closeAllHandle} key={user._id} style={{
                    display: 'flex',
                    padding: '10px',
                    alignItems: 'center'
                }}>
                    <Avatar src={user.avatar}/>
                    <div style={{marginLeft: '6px', color: 'white'}}>
                        <span style={{display: 'block'}}>{user.fullName}</span>
                        <small>{user.username}</small>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default UserCard