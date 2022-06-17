import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../styles/auth.css"
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/actions/authAction";

const Login = () => {
    const initialState = {email: "", password: ""}
    const [userData, setUserData] = useState(initialState)
    const [passShow, setPassShow] = useState(false)
    const {email, password} = userData

    const navigate = useNavigate();
    const {auth} = useSelector(state => state)
    const dispatch = useDispatch()

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
        dispatch(login(userData))
    }


    return (
        <div className={"authPage"}>
            <form onSubmit={submitHandle}>
                <h3 className={"text-uppercase text-center mb-4"}>Social Network</h3>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>

                    <input type="email"
                           className="form-control"
                           id="exampleInputEmail1"
                           aria-describedby="emailHelp"
                           onChange={changeInputHandle}
                           value={email}
                           name={"email"}
                    />

                    <small
                        className="form-text text-muted">
                        We'll never share your email with anyone else.
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
                        />
                        <small onClick={() => setPassShow(!passShow)}>{passShow ? "Hide" : "Show"}</small>
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={!(email && password)}>
                    LogIn
                </button>
                <p className={"my-2"}>
                    You don't have an account? <Link to="/register">Register now</Link>
                </p>
            </form>
        </div>
    )
}

export default Login