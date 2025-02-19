import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';
import { useValidationRules } from "../../utils/validationRules";
import { RegisterFormValues } from '../../types'

const { Title } = Typography;

const RegisterPage: React.FC = () => {
    const { onRegister, loading } = useRegister();

    const handleFinish = (values: RegisterFormValues) => {
        onRegister(values);
    };
    const validationRules = useValidationRules();

    return (
        <Flex style={{ height: '100vh' }} justify="center" align="center">
            <Form<RegisterFormValues>
                name="register"
                initialValues={{ remember: true }}
                style={{
                    width: 360,
                    padding: 24,
                    borderRadius: 12,
                    border: '1px solid #d9d9d9',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    background: 'white',
                    textAlign: 'center'
                }}
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


