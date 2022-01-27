import { $url } from "./index"

export const fetchTodos = async (page, sortField, sortDirection) => {
    const { data } = await $url.get("/?developer=Bogdan", {
        params: {
            page,
            sort_field: sortField,
            sort_direction: sortDirection,
        },
    })
    return data
}

export const createTodo = async (formData) => {
    const { data } = await $url.post("/create?developer=Bogdan", formData, {
        headers: { "Content-Type": `multipart/form-data; boundary=${formData}` },
    })
    return data
}

export const updateTodo = async (id, formData) => {
    const { data } = await $url.post(`/edit/${id}?developer=Bogdan`, formData, {
        headers: {
            "Content-Type": `multipart/form-data; boundary=${formData}`,
        },
    })
    return data
}
