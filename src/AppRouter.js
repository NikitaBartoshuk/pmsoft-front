import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import { LOGIN_ROUTE } from "./utils/consts";

const AppRouter = () => {
    const isAuth = false;

    return (
        <Routes>
            {routes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} exact />
            ))}
            <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;
