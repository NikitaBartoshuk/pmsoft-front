import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes } from './routes';
import { LOGIN_ROUTE } from '../utils/consts';

interface RouteType {
    path: string;
    Component: React.ComponentType;
}

const AppRouter: React.FC = () => {

    return (
        <Routes>
            {routes.map(({ path, Component }: RouteType) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;
