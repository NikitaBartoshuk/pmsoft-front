import React from "react";
import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png'

const { Header } = Layout;
const { Title } = Typography;

const AppHeader = () => {
    return (
        <Header
            style={{
                display: "flex",
                alignItems: "center",
                background: "#001529",
                padding: "0 24px",
            }}
        >
            <img
                src={logo}
                alt="Logo"
                style={{ width: 40, height: 40, marginRight: 12 }}
            />
            <Title level={3} style={{ color: "#fff", margin: 0 }}>
                <Link to="/main" style={{ color: "inherit", textDecoration: "none" }}>
                    LoveBooks
                </Link>
            </Title>
        </Header>
    );
};

export default AppHeader;
