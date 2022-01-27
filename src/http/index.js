import axios from "axios"

export const $url = axios.create({
    baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2",
})
