import axios from "axios"; 

const httpClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000',
    headers: {
      'Content-Type': 'application/json',
    },
});
  
httpClient.interceptors.request.use(
    config => {
      const token = localStorage.getItem("token_user");
  
      if (token) {
        config.headers['x-access-tokens'] = token;
      }
      return config;
    },
  
    error => Promise.reject(error)
);

export default httpClient;


