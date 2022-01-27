import React from "react"
import { Route, Routes } from "react-router-dom"
import { appRoutes } from "../routes"

const AppRoutes = () => {
    return (
        <Routes>
            {appRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} exact />
            ))}
        </Routes>
    )
}

export default AppRoutes
