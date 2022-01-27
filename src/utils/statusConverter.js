export const statusMessages = [
    {
        id: 0,
        message: "Задача не выполнена",
        color: "red",
    },
    {
        id: 1,
        message: "Задача не выполнена, отредактирована админом",
        color: "red",
    },
    {
        id: 10,
        message: "Задача выполнена",
        color: "green",
    },
    {
        id: 11,
        message: "Задача отредактирована админом и выполнена",
        color: "green",
    },
]

export const statusText = (status) => statusMessages.find((el) => el.id === status).message

export const statusColor = (status) => statusMessages.find((el) => el.id === status).color
