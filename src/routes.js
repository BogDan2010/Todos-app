import Home from "./pages/Home"
import Login from "./pages/Login"

export const appRoutes = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]
