import { observer } from "mobx-react-lite"
import React, { useState, useContext, useEffect } from "react"
import { Row, Col, Container, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Context } from ".."
import AppFilter from "../components/AppFilter"
import AppPages from "../components/AppPages"
import CreateTodo from "../components/Modals/CreateTodo"
import UpdateTodo from "../components/Modals/UpdateTodo"
import { fetchTodos } from "../http/todoAPI"
import { statusText, statusColor } from "../utils/statusConverter"

const Home = observer(() => {
    const { todo, admin } = useContext(Context)

    const navigate = useNavigate()

    const [createVisible, setCreateVisible] = useState(false)
    const [updateVisible, setUpdateVisible] = useState(false)
    const [dataTodo, setDataTodo] = useState({})

    useEffect(() => {
        localStorage.getItem("token") ? admin.setIsAdmin(true) : admin.setIsAdmin(false)
    }, [admin])

    useEffect(() => {
        fetchTodos(todo.page, todo.sortField, todo.sortDirection).then((data) => {
            const message = data.message
            todo.setTodos(message.tasks)
            todo.setTotalCount(message.total_task_count)
        })
        todo.setSuccessMessage(false)
    }, [todo, todo.page, todo.sortField, todo.sortDirection, createVisible, updateVisible])

    const createHandler = () => setCreateVisible(!createVisible)

    const updateHandler = () => setUpdateVisible(!updateVisible)

    const openAdminPanel = () => navigate("/login")

    const closeAdminPanel = () => {
        localStorage.clear()
        admin.setIsAdmin(false)
    }

    return (
        <Container className="w-75 pt-5" fluid="md">
            <Row sm="auto" className="d-flex justify-content-between">
                <Col className="mb-5" xs="auto">
                    <AppFilter />
                </Col>
                <Col>
                    <Button variant={"outline-success"} className="m-2 p-2" onClick={createHandler}>
                        Добавить задачу
                    </Button>
                    {!admin.isAdmin ? (
                        <Button variant={"outline-primary"} className="m-2 p-2" onClick={openAdminPanel}>
                            Админ панель
                        </Button>
                    ) : (
                        <Button variant={"outline-danger"} className="m-2 p-2" onClick={closeAdminPanel}>
                            Выйти из админ панели
                        </Button>
                    )}
                </Col>
            </Row>
            {todo.successMessage && <h3 className="text-success text-center">Задача успешно добавлена!</h3>}
            <CreateTodo show={createVisible} onHide={createHandler} todo={todo} />
            <UpdateTodo show={updateVisible} onHide={updateHandler} todo={todo} dataTodo={dataTodo} />

            <hr className="w-100 mb-5" />
            <Row>
                <Col md={{ span: 5, offset: 5 }}>
                    <AppPages />
                </Col>
            </Row>

            <Row xs={1}>
                {todo &&
                    todo.todos.map((el) => (
                        <Col key={el.id} className="my-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{el.username}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{el.email}</Card.Subtitle>
                                    <Card.Text>{el.text}</Card.Text>
                                </Card.Body>
                                <Card.Footer className="d-md-flex align-items-center justify-content-between">
                                    <Card.Subtitle className="mx-1" style={{ color: statusColor(el.status) }}>
                                        {statusText(el.status)}
                                    </Card.Subtitle>
                                    {admin.isAdmin && (
                                        <Button
                                            className="my-3"
                                            variant="primary"
                                            onClick={() => {
                                                setUpdateVisible(true)
                                                setDataTodo(el)
                                            }}
                                        >
                                            Редактировать
                                        </Button>
                                    )}
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </Container>
    )
})

export default Home
