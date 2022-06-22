import {getDataApi} from "../../utils/fetchApi";
import {ALERT_TYPES} from "./alertAction";
import {imageUpload} from "../../utils/imageUpload"

export const PROFILE_TYPES = {
    LOADING: "LOADING",
    GET_USER: "GET_USER",
}

export const getUserProfile = ({users, id, auth}) => async (dispatch) => {
    if (users.every(user => user._id !== id)) {
        try {
            dispatch({type: PROFILE_TYPES.LOADING, payload: {loading: true}})
            const res = await getDataApi(`user/${id}`, auth.token)
            dispatch({
                type: PROFILE_TYPES.GET_USER,
                payload: res.data
            })
            dispatch({type: PROFILE_TYPES.LOADING, payload: {loading: false}})
        } catch (err) {
            dispatch({
                type: "ALERT",
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const updateProfile = ({editData, avatar}) => async (dispatch) => {
    if (!editData.fullName) {
        return dispatch({type: ALERT_TYPES.ALERT, payload: {error: "Add your full name"}})
    }
    if (editData.fullName.length > 25) {
        return dispatch({type: ALERT_TYPES.ALERT, payload: {error: "Full name tooo long ))"}})
    }
    if (editData.story.length > 200) {
        return dispatch({type: ALERT_TYPES.ALERT, payload: {error: "Your story is tooooo long ))"}})
    }

    try {
        let media
        dispatch({type: ALERT_TYPES.ALERT, payload: {loading: true}})
        if (avatar) {
            media = await imageUpload([avatar])
        }
        dispatch({type: ALERT_TYPES.ALERT, payload: {loading: false}})

    } catch (err) {
        dispatch({
            type: "ALERT",
            payload: {
                error: err.response.data.msg
            }
        })
    }


}