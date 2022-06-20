import Posts from "../component/Posts";
import Info from "../component/Info";

const Profile = () => {
    return (
        <div className={"profile"}>
            <Info/>
            <Posts/>
        </div>
    )
}

export default Profile