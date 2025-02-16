import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography, Flex } from 'antd';

const { Title } = Typography;

const LoginPage = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
                    Login
                </Title>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your Email!' },
                        { type: 'email', message: 'Please enter a valid Email!' }
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Flex>
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                    or <a href="/registration">Register now!</a>
                </Form.Item>
            </Form>
        </Flex>
    );
};

export default LoginPage;
