import httpClient from "../config/httpClient";

export const getStores = async (page, limit) => {
    try {
        const response = await httpClient.get(`/store?page=${page}&limit=${limit}`)
        return response.data;
    } catch (e) {
        console.log(e)
    }
}

export const getStoreInventory = async (page, limit, storeID) => {
    try {
        const response = await httpClient.get(`/store/product_inventary/?page=${page}&limit=${limit}&storeID=${storeID}`)
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

export const addProductToStore = async (body) => {
    try {
        const response = await httpClient.post('/store/users/add_product', body)
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

export const getStoresFromTransfer = async (storeID) => {
    try {
        const response = await httpClient.get(`/store/product_inventary/transfer/?storeID=${storeID}`)
        return response.data
    } catch(e) {
        console.log(e);
        return {
            'data': [],
            'error': true
        }
    }
}

export const createTransferToOtherStore = async (body) => {
    try {
        const response = await httpClient.post('/store/product_inventary/transfer/', body)
        return response.data
    } catch(e) {
        console.log(e);
        return {
            'data': [],
            'error': true
        }
    }
}

export const editProductQuantityInStore = async (body) => {
    try {
        const response = await httpClient.put('/store/product_inventary/', body)
        return response.data
    } catch(e) {
        console.log(e);
        return {
            'data': [],
            'error': true
        }
    }
}


export const getProductHistory = async (page, limit, storeID) => {
    try {
        const response = await httpClient.get(`/store/historial/transfer?page=${page}&limit=${limit}&originStoreID=${storeID}`)
        return response.data;
    } catch (e) {
        console.log(e)
    }
}