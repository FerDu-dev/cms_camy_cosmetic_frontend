import httpClient from "../config/httpClient";

export const getStores = async (page, limit) => {
    try {
        const response = await httpClient.get(`/store?page=${page}&limit=${limit}`)
        return response.data;
    } catch (e) {
        console.log(e)
    }
}



export const createStore = async (body) => {
    try {
        const response = await httpClient.post('/store', body)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const updateStore = async (body) => {
    try {
        const response = await httpClient.put('/store', body)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const getUsersFromStore = async (storeID) => {
    try {
        const response = await httpClient.get(`/store/users/?storeID=${storeID}`)
        return response.data
    } catch(e) {
        console.log(e);
        return {
            'data': [],
            'error': true
        }
    }
}