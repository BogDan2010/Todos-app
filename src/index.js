import React, { createContext } from "react"
import ReactDOM from "react-dom"
import App from "./App"
import AdminStore from "./store/AdminStore"
import TodoStore from "./store/TodoStore"

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider
        value={{
            admin: new AdminStore(),
            todo: new TodoStore(),
        }}
    >
        <App />
    </Context.Provider>,
    document.getElementById("root")
)
