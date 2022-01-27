import React, { useState } from "react"
import Modal from "react-bootstrap/Modal"
import { Button, Form } from "react-bootstrap"
import { createTodo } from "../../http/todoAPI"
import { observer } from "mobx-react-lite"

const CreateTodo = observer(({ show, onHide, todo }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")
    const [errorName, setErrorName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorText, setErrorText] = useState(false)

    const changeNameHandler = (e) => setName(e.target.value)

    const changeEmailHandler = (e) => setEmail(e.target.value)

    const changeTextHandler = (e) => setText(e.target.value)

    const sendTodo = () => {
        const formData = new FormData()
        formData.append("username", name)
        formData.append("email", email)
        formData.append("text", text)
        createTodo(formData).then((data) => {
            if (data.status === "error") {
                setErrorName(data.message.username)
                setErrorEmail(data.message.email)
                setErrorText(data.message.text)
            } else {
                closeCreateTodo()
                todo.setSuccessMessage(true)
            }
        })
    }

    const closeCreateTodo = () => {
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Добавить задачу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={changeNameHandler}
                        className="mt-3"
                        placeholder="Введите ваше имя"
                    />
                    {errorName && <p className="m-1 text-danger">{errorName}</p>}
                    <Form.Control
                        value={email}
                        onChange={changeEmailHandler}
                        className="mt-3"
                        placeholder="Введите ваш e-mail"
                    />
                    {errorEmail && <p className="m-1 text-danger">{errorEmail}</p>}
                    <Form.Control
                        value={text}
                        onChange={changeTextHandler}
                        className="mt-3"
                        placeholder="Введите описание задачи"
                        as="textarea"
                    />
                    {errorText && <p className="m-1 text-danger">{errorText}</p>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={closeCreateTodo}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={sendTodo}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default CreateTodo
