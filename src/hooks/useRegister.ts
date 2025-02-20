import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../stores/actions/userAction";
import { useAppDispatch } from "../hooks/reduxHooks";
import { IRegisterValues, IUseRegisterReturn } from "../types";

export const useRegister = (): IUseRegisterReturn => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const onRegister = useCallback(async (values: IRegisterValues) => {
        setLoading(true);
        try {
            const token = await dispatch(registerUser(values.email, values.password));
            if (token) {
                navigate("/main");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    }, [dispatch, navigate]);

    return { onRegister, loading };
};

