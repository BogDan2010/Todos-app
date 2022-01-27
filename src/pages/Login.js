import React, { useContext, useState } from "react"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { Button, Card, Container, Form, Row } from "react-bootstrap"
import { login } from "../http/adminAPI"
import { Context } from "../index"

const Login = observer(() => {
    const { admin } = useContext(Context)

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errorName, setErrorName] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    const navigate = useNavigate()

    const changeNameHandler = (e) => setName(e.target.value)
    const changePasswordHandler = (e) => setPassword(e.target.value)
    const closeloginPanel = () => navigate("/")

    const addAdmin = () => {
        const formData = new FormData()
        formData.append("username", name)
        formData.append("password", password)
        login(formData).then((data) => {
            if (data.status === "error") {
                setErrorName(data.message.username)
                setErrorPassword(data.message.password)
                admin.setIsAdmin(false)
            } else {
                navigate("/")
                admin.setIsAdmin(true)
            }
        })
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5 justify-content-between">
                <h2 className="m-auto">Авторизация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите имя..."
                        value={name}
                        onChange={changeNameHandler}
                    />
                    {errorName && <p className="m-1 text-danger">{errorName}</p>}
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите пароль..."
                        value={password}
                        onChange={changePasswordHandler}
                        type="password"
                    />
                    {errorPassword && <p className="m-1 text-danger">{errorPassword}</p>}
                </Form>
                <Row className="mt-4">
                    <div className="w-50">
                        <Button onClick={closeloginPanel} variant={"outline-danger"} className="my-2 w-100">
                            Отмена
                        </Button>
                    </div>
                    <div className="w-50 d-flex justify-content-end">
                        <Button onClick={addAdmin} variant={"outline-success"} className="my-2 w-100">
                            Войти
                        </Button>
                    </div>
                </Row>
            </Card>
        </Container>
    )
})

export default Login
