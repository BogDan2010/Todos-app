import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { Form } from "react-bootstrap"

const AppFilter = observer(() => {
    const { todo } = useContext(Context)

    const sortFieldHandler = (e) => todo.setSortField(e.target.value)

    const sortDirectionHandler = (e) => todo.setSortDirection(e.target.value)

    return (
        <Form.Group>
            <Form.Label className="mb-2 text-uppercase text-primary">Сортировка задач:</Form.Label>
            <Form.Select onChange={sortFieldHandler} className="mb-3">
                <option value="id">По id</option>
                <option value="username">По имени</option>
                <option value="email">По e-mail</option>
                <option value="status">По статусу</option>
            </Form.Select>
            <Form.Select onChange={sortDirectionHandler}>
                <option value="asc">По возрастанию</option>
                <option value="desc">По убыванию</option>
            </Form.Select>
        </Form.Group>
    )
})

export default AppFilter
