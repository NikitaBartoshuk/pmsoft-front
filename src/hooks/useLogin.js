import { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../stores/actions/userAction';

export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onLogin = useCallback(async (values) => {
        setLoading(true);
        try {
            const token = await dispatch(loginUser(values.email, values.password));
            if (token) {
                navigate('/main');
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false);
        }
    }, [dispatch, navigate]);

    const validationRules = useMemo(() => ({
        email: [
            { required: true, message: 'Введите Email!' },
            { type: 'email', message: 'Введите корректный Email!' },
        ],
        password: [{ required: true, message: 'Введите пароль!' }],
    }), []);

    return { onLogin, loading, validationRules };
};
