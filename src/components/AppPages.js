import React, { useContext } from "react"
import { observer } from "mobx-react-lite"
import { Context } from ".."
import { Pagination } from "react-bootstrap"

const AppPages = observer(() => {
    const { todo } = useContext(Context)
    const pageCount = Math.ceil(todo.totalCount / 3)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    const paginationPrew = () => {
        todo.setPage(todo.page > 1 ? todo.page - 1 : 1)
    }

    const paginationNext = () => {
        todo.setPage(todo.page < pageCount ? todo.page + 1 : pageCount)
    }

    const paginationFirst = () => todo.setPage(1)

    const paginationLast = () => todo.setPage(pageCount)

    return (
        <Pagination className="d-flex flex-wrap">
            {todo.page > 1 && (
                <>
                    <Pagination.Item onClick={paginationFirst}>1</Pagination.Item>
                    <Pagination.Prev onClick={paginationPrew} />
                    <Pagination.Ellipsis disabled />
                </>
            )}
            <Pagination.Item active={todo.page}>{todo.page}</Pagination.Item>
            {todo.page + 1 <= pageCount && (
                <>
                    <Pagination.Ellipsis disabled />
                    <Pagination.Next onClick={paginationNext} />
                    <Pagination.Item onClick={paginationLast}>{pageCount}</Pagination.Item>
                </>
            )}
        </Pagination>
    )
})

export default AppPages
