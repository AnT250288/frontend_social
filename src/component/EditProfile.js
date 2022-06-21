import {useState} from "react";
import {useSelector} from "react-redux";
import "../styles/editProfile.css"

const EditProfile = ({user, setOnEdit}) => {
    const {auth} = useSelector(state => state)
    const initialState = {fullName: '', story: '', phone: '', address: ''}
    const [editData, setEditData] = useState(initialState)
    const {fullName, story, phone, address} = editData
    const [avatar, setAvatar] = useState('')

    const changeAvatar = () => {

    }

    const changeInputHandle = (e) => {
        const {name, value} = e.target
        setEditData({...editData, [name]: value})
    }


    return (
        <div className={"editProfile"}>
            <div className={"editProfileContent"}>
                <div className={"editProfileHead"}>
                    <h4 className={"editProfileHeadTitle"}>
                        Edit Your Profile
                    </h4>
                    <button className={"editProfileHeadClose"} onClick={() => setOnEdit(false)}>X</button>
                </div>
                <div className={"editProfileAvatar"}>
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt={"avatar"}/>
                    <i className={"fas fa-camera"}><p>Change avatar</p></i>
                    <span>
                    <input style={{display: 'none'}} type={"file"} id={"file-upload"} accept={"image/*"}
                           onChange={changeAvatar}/>
                </span>
                </div>
                <div className={"editProfileUserData"}>
                    <label htmlFor={"fullName"}>Full Name</label>
                    <div className={"editProfileUserDataFullName"}>
                        <input type={"text"} value={fullName} onChange={changeInputHandle}
                               name={"fullName"} placeholder={"Type your name"}/>
                        <p>{fullName.length}/25</p>
                    </div>
                    <label htmlFor={"address"}>Address</label>
                    <div className={"editProfileUserDataAddress"}>
                        <input type={"text"} value={address} onChange={changeInputHandle}
                               name={"address"} placeholder={"Type your address"}/>
                    </div>
                    <label htmlFor={"phone"}>Phone</label>
                    <div className={"editProfileUserDataPhone"}>
                        <input type={"text"} value={phone} onChange={changeInputHandle}
                               name={"phone"} placeholder={"Type your phone number"}/>
                    </div>
                    <label htmlFor={"story"}>Story</label>
                    <div className={"editProfileUserDataStory"}>
                        <input type={"text"} value={story} onChange={changeInputHandle}
                               name={"story"} placeholder={"Type your Bio"}/>
                        <p>{story.length}/200</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile