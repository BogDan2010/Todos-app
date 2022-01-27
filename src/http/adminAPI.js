import { $url } from "./index"

export const login = async (formData) => {
    const { data } = await $url.post(`/login?developer=Bogdan`, formData, {
        headers: {
            "Content-Type": `multipart/form-data; boundary=${formData}`,
        },
    })
    localStorage.setItem("token", data.message.token)
    return data
}
