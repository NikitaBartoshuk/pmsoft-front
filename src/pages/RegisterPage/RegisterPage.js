import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../stores/actions/userAction';

const { Title } = Typography;

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const token = await dispatch(registerUser(values.email, values.password));
            if (token) {
                navigate('/main'); // Переход на главную страницу
            }
        } catch (error) {
            alert(error); // Показываем сообщение от сервера
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex style={{ height: '100vh' }} justify="center" align="center">
            <Form
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
                onFinish={onFinish}
            >
                <Title level={3} style={{ marginBottom: 20 }}>Регистрация</Title>

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Введите Email!' },
                        { type: 'email', message: 'Введите корректный Email!' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Подтвердите пароль!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Пароли не совпадают!'));
                            }
                        })
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Подтвердите пароль" />
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading}>
                        Зарегистрироваться
                    </Button>
                    <div style={{ marginTop: 10 }}>
                        Уже есть аккаунт? <a href="/login">Войти</a>
                    </div>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default RegisterPage;
