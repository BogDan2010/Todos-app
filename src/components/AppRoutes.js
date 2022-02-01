import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { appRoutes } from "../routes"

const AppRoutes = () => {
    return (
        <Routes>
            {appRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} exact />
            ))}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}

export default AppRoutes
