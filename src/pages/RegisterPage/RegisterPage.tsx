import React, { FC } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';
import { useValidationRules } from "../../hooks/useValidationRules";
import { IRegisterFormValues } from '../../types'
import styles from './registerpage.module.css'

const { Title } = Typography;

const RegisterPage: FC = () => {
    const { onRegister, loading } = useRegister();

    const handleFinish = (values: IRegisterFormValues) => {
        onRegister(values);
    };
    const validationRules = useValidationRules();

    return (
        <Flex style={{ height: '100vh' }} justify="center" align="center">
            <Form<IRegisterFormValues>
                name="register"
                initialValues={{ remember: true }}
                className={styles['register-page-form']}
                onFinish={handleFinish}
            >
                <Title level={3} style={{ marginBottom: 20 }}>Регистрация</Title>

                <Form.Item name="email" rules={validationRules.email}>
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item name="password" rules={validationRules.password}>
                    <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
                </Form.Item>

                <Form.Item name="confirm" dependencies={['password']} rules={validationRules.confirmPassword}>
                    <Input.Password prefix={<LockOutlined />} placeholder="Подтвердите пароль" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading} disabled={loading}>
                        Зарегистрироваться
                    </Button>
                    <div style={{ marginTop: 10 }}>
                        Уже есть аккаунт? <Link to="/login">Войти</Link>
                    </div>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default RegisterPage;


