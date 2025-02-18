import axios from 'axios';
import { API } from '../../utils/consts';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../index';

interface RegisterUserAction {
    type: 'REG_USER';
    payload: string;
}

interface LoginUserAction {
    type: 'LOGIN_USER';
    payload: string;
}

type AuthActionTypes = RegisterUserAction | LoginUserAction;

type AuthThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AuthActionTypes>;

export const registerUser = (email: string, password: string): AuthThunk<Promise<string>> => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        try {
            const response = await axios.post<{ token: string }>(`${API.user.registration}`, {
                email,
                password
            });

            if (response.data.token) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                dispatch({ type: 'REG_USER', payload: token });
                return token;
            } else {
                throw new Error('Ошибка регистрации');
            }
        } catch (error: any) {
            throw error.response?.data?.message || 'Ошибка при регистрации';
        }
    };
};

export const loginUser = (email: string, password: string): AuthThunk<Promise<string>> => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
        try {
            const response = await axios.post<{ token: string }>(`${API.user.login}`, {
                email,
                password
            });

            if (response.data.token) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                dispatch({ type: 'LOGIN_USER', payload: token });
                return token;
            } else {
                throw new Error('Ошибка авторизации');
            }
        } catch (error: any) {
            throw error.response?.data?.message || 'Ошибка при входе';
        }
    };
};

