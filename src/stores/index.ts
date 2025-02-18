import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
import { bookReducer } from "./reducers/bookReducer";

// Объединяем редюсеры через combineReducers
const rootReducer = combineReducers({
    user: userReducer,
    book: bookReducer
});

// Создаем store
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk),
});

// Определяем тип `RootState`
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
