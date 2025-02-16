import React from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Flex, Typography } from 'antd';

const { Title } = Typography;

const RegisterPage = () => {
    const onFinish = (values) => {
        console.log('Registration successful:', values);
    };

    return (
        <Flex
            style={{ height: '100vh' }}
            justify="center"
            align="center"
        >
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
                {/* Заголовок "Register" */}
                <Title level={3} style={{ marginBottom: 20 }}>
                    Register
                </Title>

                {/* Поле Email */}
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        { type: 'email', message: 'Please enter a valid Email!' }
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                {/* Поле Password */}
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                {/* Поле Confirm Password */}
                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your Password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Passwords do not match!'));
                            }
                        })
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                </Form.Item>

                {/* Кнопка регистрации */}
                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Register
                    </Button>
                    <div style={{ marginTop: 10 }}>
                        Already have an account? <a href="/login">Login</a>
                    </div>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default RegisterPage;
