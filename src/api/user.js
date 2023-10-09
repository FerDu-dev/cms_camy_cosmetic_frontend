import httpClient from "../config/httpClient";

export const createUser = async (body) => {
    try {
        const response = await httpClient.post('/user/', body)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const getUsers = async (page, limit) => {
    try {
        const response = await httpClient.get(`/user/?page=${page}&limit=${limit}`)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

