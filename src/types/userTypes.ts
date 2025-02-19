import { ThunkAction } from 'redux-thunk';
import { RootState } from '../stores/index';
import { Dispatch } from 'redux';

// Enum для экшенов
export enum UserActionTypes {
    REG_USER = "REG_USER",
    LOGIN_USER = "LOGIN_USER"
}

// Состояние пользователя
export interface IUserState {
    token: string;
}

// Экшены
export interface IRegUserAction {
    type: UserActionTypes.REG_USER;
    payload: string;
}

export interface ILoginUserAction {
    type: UserActionTypes.LOGIN_USER;
    payload: string;
}

export type UserAction = IRegUserAction | ILoginUserAction;

// Thunk для асинхронных экшенов
export type AuthThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UserAction>;

// Тип Dispatch для экшенов аутентификации
export type AuthDispatch = Dispatch<UserAction>;

