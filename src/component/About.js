import "../styles/profileAbout.css"

const About = ({userData, profile, auth, id}) => {

    return (
        <div className={"profileAbout"}>
            {userData.length > 0 && userData.map(user => (
                <div className={"profileAboutContainer"} key={user._id}>
                    <div className={"profileAboutContentTop"}>
                        <h4 className={"profileAboutContentTopHead"}>About Me: </h4>

                    </div>
                    <div className={"profileAboutContainerCenter"}>
                        <p className={"profileAboutContainerCenterStory"}>{user.story}</p>
                    </div>
                    <div className={"profileAboutContainerBottom"}>
                        <div className={"profileAboutContainerBottomInfo"}>
                            <h6 className={"profileAboutContainerBottomInfoHead"}> Joined </h6>
                            <p className={"profileAboutContainerBottomInfoBody"}>{user.createdAt}</p>
                        </div>
                        <div className={"profileAboutContainerBottomInfo"}>
                            <h6 className={"profileAboutContainerBottomInfoHead"}> Phone </h6>
                            <p className={"profileAboutContainerBottomInfoBody"}>{user.phone}</p>
                        </div>
                        <div className={"profileAboutContainerBottomInfo"}>
                            <h6 className={"profileAboutContainerBottomInfoHead"}> Address </h6>
                            <p className={"profileAboutContainerBottomInfoBody"}>{user.address}</p>
                        </div>
                        <div className={"profileAboutContainerBottomInfo"}>
                            <h6 className={"profileAboutContainerBottomInfoHead"}> Gender </h6>
                            <p className={"profileAboutContainerBottomInfoBody"}>{user.gender}</p>
                        </div>
                        <div className={"profileAboutContainerBottomInfo"}>
                            <h6 className={"profileAboutContainerBottomInfoHead"}> Email </h6>
                            <p className={"profileAboutContainerBottomInfoBody"}>{user.email}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default About