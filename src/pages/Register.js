import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import {register} from "../redux/actions/authAction";

const Register = () => {
    const {auth, alert} = useSelector(state => state)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const initialState = {
        fullName: "", userName: "", email: "", password: "", cf_password: "", sex: "male"
    }
    const [userData, setUserData] = useState(initialState)
    const [passShow, setPassShow] = useState(false)
    const [passCFShow, setCFPassShow] = useState(false)
    const {fullName, userName, email, password, cf_password} = userData

    useEffect(() => {
        if (auth.token) {
            navigate("/")
        }
    }, [auth.token, navigate])

    const changeInputHandle = (e) => {
        const {name, value} = e.target
        setUserData({...userData, [name]: value})
    }

    const submitHandle = (event) => {
        event.preventDefault()
        dispatch(register(userData))
    }

    return (
        <div className={"authPage"}>
            <form onSubmit={submitHandle}>
                <h3 className={"text-uppercase text-center mb-4"}>Social Network</h3>

                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="fullName"
                           className="form-control"
                           id="fullName"
                           onChange={changeInputHandle}
                           value={fullName}
                           name={"fullName"}
                           style={{background: `${alert.fullName ? "#fd2d6a14" : ""}`}}/>
                    <small
                        className="form-text text-danger">
                        {alert.fullName ? alert.fullName : ""}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="userName">User Name</label>
                    <input type="userName"
                           className="form-control"
                           id="userName"
                           name={"userName"}
                           onChange={changeInputHandle}
                           value={userName.toLowerCase().replace(/ /g, '')}
                           style={{background: `${alert.userName ? "#fd2d6a14" : ""}`}}/>
                    <small
                        className="form-text text-danger">
                        {alert.userName ? alert.userName : ""}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="exampleInputEmail1"
                           onChange={changeInputHandle}
                           value={email}
                           name={"email"}
                           style={{background: `${alert.email ? "#fd2d6a14" : ""}`}}/>
                    <small
                        className="form-text text-danger">
                        {alert.email ? alert.email : ""}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <div className={"pass"}>
                        <input type={passShow ? "text" : "password"}
                               className="form-control"
                               id="exampleInputPassword1"
                               onChange={changeInputHandle}
                               value={password}
                               name={"password"}
                               style={{background: `${alert.password ? "#fd2d6a14" : ""}`}}
                        />
                        <small onClick={() => setPassShow(!passShow)}>{passShow ? "Hide" : "Show"}</small>
                    </div>
                    <small
                        className="form-text text-danger">
                        {alert.password ? alert.password : ""}
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm Password</label>
                    <div className={"pass"}>
                        <input type={passCFShow ? "text" : "password"}
                               className="form-control"
                               id="cf_password"
                               onChange={changeInputHandle}
                               value={cf_password}
                               name={"cf_password"}
                               style={{background: `${alert.cf_password ? "#fd2d6a14" : ""}`}}
                        />
                        <small onClick={() => setCFPassShow(!passCFShow)}>{passCFShow ? "Hide" : "Show"}</small>
                    </div>
                    <small
                        className="form-text text-danger">
                        {alert.cf_password ? alert.cf_password : ""}
                    </small>
                </div>

                <div className={"row justify-content-between mx-0 mb-1"}>
                    <label htmlFor={"male"}>
                        Male: <input type={"radio"} id={"male"} name={"sex"}
                                     value={"male"} defaultChecked onChange={changeInputHandle}/>
                    </label>
                    <label htmlFor={"female"}>
                        Female: <input type={"radio"} id={"female"} name={"sex"}
                                       value={"female"} onChange={changeInputHandle}/>
                    </label>
                    <label htmlFor={"other"}>
                        Other: <input type={"radio"} id={"other"} name={"sex"}
                                      value={"other"} onChange={changeInputHandle}/>
                    </label>
                </div>

                <button
                    type="submit"
                    className="btn btn-success w-100">
                    Registration
                </button>
                <p className={"my-2"}>
                    Already have an account? <Link to="/">Login now</Link>
                </p>
            </form>
        </div>
    )


}

export default Register