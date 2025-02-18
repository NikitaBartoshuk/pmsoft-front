import React from "react";
import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";
import logo from '../../../assets/logo.png'
import styles from './appheader.module.css'

const { Header } = Layout;
const { Title } = Typography;

const AppHeader: React.FC = () => {
    return (
        <Header className={styles['header-container']}>
            <img
                src={logo}
                alt="Logo"
                className={styles['header-logo']}
            />
            <Title level={3} className={styles['header-title']}>
                <Link to="/main" className={styles['header-link']}>
                    LoveBooks
                </Link>
            </Title>
        </Header>
    );
};

export default AppHeader;

