import React, { useContext, useState } from "react"
import Modal from "react-bootstrap/Modal"
import { Button, Form } from "react-bootstrap"
import { observer } from "mobx-react-lite"
import { updateTodo } from "../../http/todoAPI"
import { statusMessages } from "../../utils/statusConverter"
import { Context } from "../.."

const UpdateTodo = observer(({ show, onHide, dataTodo }) => {
    const { admin } = useContext(Context)

    const [text, setText] = useState("")
    const [status, setStatus] = useState()
    const [errorAdmin, setErrorAdmin] = useState(false)

    const defaultState = () => {
        setText("")
        onHide()
    }

    const closeUpdateTodo = () => defaultState()

    const textHandler = (e) => {
        if (e.target.value !== dataTodo.text) {
            setStatus(dataTodo.status + 1)
        }
        setText(e.target.value)
    }

    const statusHandler = (e) => setStatus(e.target.value)

    const sendUpdateTodo = () => {
        const formData = new FormData()
        formData.append("text", text)
        formData.append("status", status)
        formData.append("token", localStorage.getItem("token"))
        updateTodo(dataTodo.id, formData).then((data) => {
            if (data.status === "error") {
                setErrorAdmin("Ошибка авторизации: " + data.message.token)
                admin.setIsAdmin(false)
            } else {
                closeUpdateTodo()
            }
        })
    }

    return (
        <Modal show={show} onHide={closeUpdateTodo} centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">Измнить пост</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={text ? text : dataTodo.text}
                        onChange={textHandler}
                        className="mt-3"
                        placeholder={dataTodo.text}
                        as="textarea"
                    />
                    <Form.Select onChange={statusHandler} className="mt-3" defaultValue={dataTodo.status}>
                        {statusMessages.map((el) =>
                            el.id % 2 === 0 ? (
                                <option key={el.id} value={el.id}>
                                    {el.message}
                                </option>
                            ) : null
                        )}
                    </Form.Select>
                    {errorAdmin && <p className="m-1 text-danger">{errorAdmin}</p>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={closeUpdateTodo}>
                    Закрыть
                </Button>
                <Button variant="outline-success" onClick={sendUpdateTodo}>
                    Редактировать
                </Button>
            </Modal.Footer>
        </Modal>
    )
})

export default UpdateTodo
