import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";

export const routes = [
    {
        path: REGISTRATION_ROUTE,
        Component: RegisterPage
    },
    {
        path: LOGIN_ROUTE,
        Component: LoginPage
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage
    }
]