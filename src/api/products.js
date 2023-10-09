import httpClient from "../config/httpClient";

export const getProducts = async (limit, page) => {
  const response = await httpClient.get(`/product/?limit=${limit}&page=${page}`);
  return response.data;
};

export const createProduct = async (body) => {
  const response = await httpClient.post('/product/', body);
  return response.data;
};

export const getProductById = async (id) => {
  try {
    const response = await httpClient.get(`/get_products/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};



export const updateProduct = async (id, product) => {
  try {
    const response = await httpClient.put(`/update_product/`, product);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await httpClient.delete(`/delete_product/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getFilteredProducts = async (filters) => {
    try {
        const response = await httpClient.get(`get_products?page=${query? `&${query}`: ''}`)
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
