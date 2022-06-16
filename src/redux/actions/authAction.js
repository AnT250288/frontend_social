import {postDataApi} from "../../utils/fetchApi";
import {ALERT_TYPES} from "./alertAction";

export const TYPES = {
    AUTH: "AUTH"
}

export const login = (data) => async (dispatch) => {
    try {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: {loading: true}
        })
        const res = await postDataApi("login", data)
        dispatch({
            type: "AUTH",
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        localStorage.setItem('login', true)
        dispatch({
            type: "ALERT",
            payload: {success: res.data.msg}
        })
    } catch (error) {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: {
                error: error.response.data.msg
            }
        })
    }
}

export const refreshToken = () => async (dispatch) => {
    const login = localStorage.getItem('login')
    if (login)
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: {loading: true}
        })
    try {
        const res = await postDataApi('refresh_token')
        dispatch({
            type: TYPES.AUTH,
            payload: {
                token: res.data.access_token,
                user: res.data.user
            }
        })
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: {success: res.data.msg}
        })
    } catch (error) {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: {error: error.response.data.msg}
        })
    }
}

export const register = (data) => async (dispatch) => {
    try {
        const res = await postDataApi('register', data)
    } catch (error) {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: {
                error: error.response.data.msg
            }
        })
    }
}
