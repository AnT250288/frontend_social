import {getDataApi, patchDataApi} from "../../utils/fetchApi";
import {ALERT_TYPES, DeleteData} from "./alertAction";
import {imageUpload} from "../../utils/imageUpload"
import {TYPES} from "./authAction";

export const PROFILE_TYPES = {
    LOADING: "LOADING",
    GET_USER: "GET_USER",
    FRIEND: "FRIEND",
    UNFRIEND: 'UNFRIEND',
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
                type: ALERT_TYPES.ALERT,
                payload: {
                    error: err.response.data.msg
                }
            })
        }
    }
}

export const updateProfile = ({editData, avatar, auth}) => async (dispatch) => {
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
        if (avatar) media = await imageUpload([avatar])

        const res = await patchDataApi('user', {
            ...editData,
            avatar: avatar ? media[0].secure_url : auth.user.avatar
        }, auth.token)

        dispatch({
            type: TYPES.AUTH,
            payload: {
                ...auth,
                user: {
                    ...auth.user, ...editData,
                    avatar: avatar ? media[0].secure_url : auth.user.avatar
                }
            }
        })
        dispatch({type: ALERT_TYPES.ALERT, payload: {success: res.data.msg}})

    } catch (err) {
        dispatch({
            type: ALERT_TYPES.ALERT,
            payload: {
                error: err.response.data.msg
            }
        })
    }
}

export const addFriend = ({users, user, auth}) => async (dispatch) => {
    const newUser = {...user, friends: [...user.friends, auth.user]}
    console.log(newUser)
    dispatch({
        type: PROFILE_TYPES.FRIEND,
        payload: newUser
    })

    dispatch({
        type: TYPES.AUTH,
        payload: {
            ...auth,
            user: {...auth.user, following: [...auth.user.following, newUser]}
        }
    })
}

export const unFriends = ({users, user, auth}) => async (dispatch) => {
    const newUser = {...user, friends: DeleteData(user.friends, auth.user._id)}
    dispatch({
        type: PROFILE_TYPES.UNFRIEND,
        payload: newUser
    })

    dispatch({
        type: TYPES.AUTH,
        payload: {
            ...auth,
            user: {
                ...auth.user,
                following: DeleteData(auth.user.following, newUser._id)
            }
        }
    })
}