import httpClient from "../config/httpClient";

export const login = async (body) => {  
    try {
        const response = await httpClient.post('/login/', body)
        if (response.data && response.data.token) {
            localStorage.setItem('token_user', response.data.token);
        }
        return response.data
    } catch (e) {
        console.log(e)
        return {error: e}
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token_user');
    localStorage.removeItem('selectedStore');
    localStorage.removeItem('storeOptions');
};

export const verifyAdmin = async () => {
    try {
        const response = await httpClient.get('/user/first_admin/');
        return response.data;
    } catch (e) {
        console.log(e);
    }
}








