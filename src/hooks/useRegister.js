import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../stores/actions/userAction';

export const useRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onRegister = useCallback(async (values) => {
        setLoading(true);
        try {
            const token = await dispatch(registerUser(values.email, values.password));
            if (token) {
                navigate('/main');
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }, [dispatch, navigate]);

    return { onRegister, loading };
};
