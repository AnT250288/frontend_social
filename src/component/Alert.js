import {useDispatch, useSelector} from "react-redux";
import {Loading} from "./Loading";
import Toast from "./Toast";
import {ALERT_TYPES} from "../redux/actions/alertAction";


const Alert = () => {
    const {alert} = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div>
            {alert.loading && <Loading/>}

            {alert.error &&
                <Toast message={{title: "Error", body: alert.error}}
                       showHandle={() => dispatch({type: ALERT_TYPES.ALERT, payload: {}})}
                       bgColor={"bg-danger"}/>}

            {alert.success &&
                <Toast message={{title: "Success", body: alert.success}}
                       showHandle={() => dispatch({type: ALERT_TYPES.ALERT, payload: {}})}
                       bgColor={"bg-success"}
                />}
        </div>
    )
}

export default Alert