import axios from 'axios';
import { API } from '../../utils/consts'

export const registerUser = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API.user.registration}`, {
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
        } catch (error) {
            throw error.response?.data?.message || 'Ошибка при регистрации';
        }
    };
};



export const loginUser = (email, password) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API.user.login}`, {
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
        } catch (error) {
            throw error.response?.data?.message || 'Ошибка при входе';
        }
    };
};


export const checkAuth = () => async (dispatch) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(`${API.user.auth}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        dispatch({
            type: 'LOGIN_USER',
            payload: response.data.token
        });
        localStorage.setItem('token', response.data.token);
    } catch (error) {
        console.error("Ошибка проверки авторизации:", error.response?.data?.message || error.message);
        localStorage.removeItem('token');
    }
};
