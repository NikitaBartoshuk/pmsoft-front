import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, Flex } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../stores/actions/userAction';

const { Title } = Typography;

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const token = await dispatch(loginUser(values.email, values.password));
            if (token) {
                navigate('/main'); // Перенаправление на главную страницу
            }
        } catch (error) {
            alert(error); // Показываем сообщение от сервера
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex
            style={{ height: '100vh' }}
            justify="center"
            align="center"
        >
            <Form
                name="login"
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
                <Title level={3} style={{ marginBottom: 20 }}>
                    Вход
                </Title>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Введите Email!' },
                        { type: 'email', message: 'Введите корректный Email!' }
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Запомнить меня</Checkbox>
                        </Form.Item>
                    </Flex>
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading}>
                        Войти
                    </Button>
                    или <a href="/registration">Зарегистрироваться</a>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default LoginPage;




