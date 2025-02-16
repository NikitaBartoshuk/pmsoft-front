import {combineReducers, createStore, applyMiddleware} from "redux";
import {thunk} from 'redux-thunk';
import {userReducer} from "./reducers/userReducer";
import {bookReducer} from "./reducers/bookReducer";

const rootReducer = combineReducers(
    {
        user: userReducer,
        book: bookReducer
    }
)


export const store = createStore(rootReducer, applyMiddleware(thunk))