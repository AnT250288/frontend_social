import {PROFILE_TYPES} from "../actions/profileAction";
import {DeleteData, EditData} from "../actions/alertAction";

const initialState = {
    loading: false,
    users: [],
    posts: [],
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case PROFILE_TYPES.GET_USER:
            return {
                ...state,
                users: [...state.users, action.payload.user]
            }

        case PROFILE_TYPES.FRIEND:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
            }

        case PROFILE_TYPES.UNFRIEND:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload)
            }

        default:
            return state
    }
}

export default profileReducer