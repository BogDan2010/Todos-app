import { makeAutoObservable } from "mobx"

export default class TodoStore {
    constructor() {
        this._todos = []
        this._page = 1
        this._totalCount = 0
        this._sortField = "id"
        this._sortDirection = "asc"
        this._successMessage = false
        makeAutoObservable(this)
    }

    setTodos(todos) {
        this._todos = todos
    }

    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount = count
    }

    setSortField(sortField) {
        this._sortField = sortField
    }

    setSortDirection(sortDirection) {
        this._sortDirection = sortDirection
    }

    setSuccessMessage(bool) {
        this._successMessage = bool
    }

    get todos() {
        return this._todos
    }

    get page() {
        return this._page
    }

    get totalCount() {
        return this._totalCount
    }

    get sortField() {
        return this._sortField
    }

    get sortDirection() {
        return this._sortDirection
    }

    get successMessage() {
        return this._successMessage
    }
}
