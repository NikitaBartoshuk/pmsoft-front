import { Rule } from 'antd/es/form';

export const validationRules = {
    email: [
        { required: true, message: 'Введите email' },
        { type: 'email' as const, message: 'Некорректный email' }
    ] as Rule[],
    password: [
        { required: true, message: 'Введите пароль' },
        { min: 6, message: 'Пароль должен содержать минимум 6 символов' }
    ] as Rule[],
    confirmPassword: [
        { required: true, message: 'Подтвердите пароль' },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('Пароли не совпадают'));
            },
        }),
    ] as Rule[],
};