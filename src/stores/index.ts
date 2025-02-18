import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
import { bookReducer } from "./reducers/bookReducer";

const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
