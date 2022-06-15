import "../styles/NotFound.css"
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className={"notFound"}>
            <h3 className={"notFoundText"}>404 | Not Found</h3>
            <p className={"notFoundFind"}>
                Go to Home Rage <Link to={"/"}> Here </Link>
            </p>
        </div>
    )
}

export default NotFound