import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../stores/actions/userAction";
import { useAppDispatch } from "../hooks/reduxHooks";
import { LoginValues, UseLoginReturn } from "../types";

export const useLogin = (): UseLoginReturn => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const onLogin = useCallback(async (values: LoginValues) => {
        setLoading(true);
        try {
            const token = await dispatch(loginUser(values.email, values.password));
            if (token) {
                navigate("/main");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }, [dispatch, navigate]);

    return { onLogin, loading };
};

