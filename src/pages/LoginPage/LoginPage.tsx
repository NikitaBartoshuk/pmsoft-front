import React, { FC } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import styles from "./loginpage.module.css";
import { useValidationRules } from "../../hooks/useValidationRules";
import { ILoginValues } from "../../types";

const { Title, Text } = Typography;

const LoginPage: FC = () => {
    const { onLogin, loading } = useLogin();
    const validationRules = useValidationRules();

    const onFinish = (values: ILoginValues) => {
        onLogin(values);
    };

    return (
        <div className={styles["login-page-container"]}>
            <Form
                name="login"
                initialValues={{ remember: true }}
                className={styles["login-page-form"]}
                onFinish={onFinish}
            >
                <Title level={3} className={styles["login-page-form-title"]}>
                    Вход
                </Title>
                <Form.Item name="email" rules={validationRules.email}>
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={validationRules.password}>
                    <Input.Password prefix={<LockOutlined />} placeholder="Пароль" />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button block type="primary" htmlType="submit" loading={loading} disabled={loading}>
                        Войти
                    </Button>
                    <Text className={styles["login-page-links"]}>
                        или <Link to="/registration">Зарегистрироваться</Link>
                    </Text>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginPage;


