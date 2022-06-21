import Posts from "../component/Posts";
import Info from "../component/Info";
import About from "../component/About";
import "../styles/profile.css"

const Profile = () => {
    return (
        <div className={"profile"}>
            <Info/>
            <div className={"profileBody"}>
                <div className={"profileBody-left"}>
                    <About/>
                </div>
                <div className={"profileBody-center"}>
                    <Posts/>
                </div>
                <div className={"profileBody-right"}>
                    <Posts/>
                </div>
            </div>

        </div>
    )
}

export default Profile