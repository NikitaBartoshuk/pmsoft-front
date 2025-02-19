import axios from 'axios';
import { API } from '../../utils/consts';
import { AuthThunk, AuthDispatch, UserActionTypes } from '../../types';

export const registerUser = (email: string, password: string): AuthThunk<Promise<string>> => {
    return async (dispatch: AuthDispatch) => {
        try {
            const response = await axios.post<{ token: string }>(`${API.user.registration}`, { email, password });

            if (response.data.token) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                dispatch({ type: UserActionTypes.REG_USER, payload: token });
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
    return async (dispatch: AuthDispatch) => {
        try {
            const response = await axios.post<{ token: string }>(`${API.user.login}`, { email, password });

            if (response.data.token) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                dispatch({ type: UserActionTypes.LOGIN_USER, payload: token });
                return token;
            } else {
                throw new Error('Ошибка авторизации');
            }
        } catch (error: any) {
            throw error.response?.data?.message || 'Ошибка при входе';
        }
    };
};
