import {Navigate} from "react-router-dom";

const PrivateRouter = ({children}) => {
    const login = localStorage.getItem('firstLogin')
    if (!login) {
        return <Navigate to={"/"} replace/>
    }
    return children
}

export default PrivateRouter