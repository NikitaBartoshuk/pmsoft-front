import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, Flex } from 'antd';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';
import styles from './loginpage.module.css';

const { Title } = Typography;

const LoginPage = () => {
    const { onLogin, loading, validationRules } = useLogin();

    return (
        <Flex className={styles['login-page-container']} justify="center" align="center">
            <Form
                name="login"
                initialValues={{ remember: true }}
                className={styles['login-page-form']}
                onFinish={onLogin}
            >
                <Title level={3} className={styles['login-page-form-title']}>
                    Вход
                </Title>
                <Form.Item name="email" rules={validationRules.email}>
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={validationRules.password}>
                    <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
                </Form.Item>
                <Form.Item>
                    <Checkbox name="remember">Запомнить меня</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading} disabled={loading}>
                        Войти
                    </Button>
                    <div className={styles['login-page-links']}>
                        <span>или <Link to="/registration">Зарегистрироваться</Link></span>
                    </div>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default LoginPage;
