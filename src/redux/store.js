import {createStore, applyMiddleware, combineReducers} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import {Provider} from "react-redux";
import authReducer from "./reducers/authReducer"
import thunk from "redux-thunk";
import alertReducer from "./reducers/alertReducer";
import profileReducer from "./reducers/profileReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    alert: alertReducer,
    profile: profileReducer,
})

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)))


const DataProvider = ({children}) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider