import httpClient from "../config/httpClient";

export const getProducts = async (limit, page, filter = null) => {
  let url = `/product/?limit=${limit}&page=${page}`
  if (filter) {
    if (filter.search) url+=`&search=${filter.search}`
    if (filter.brand_filter) url+=`&brand_filter=${filter.brand_filter}`
    if (filter.product_type_filter) url+=`&product_type_filter=${filter.product_type_filter}`
    if (filter.priceFilter) url+=`&price_filter=${filter.priceFilter}`
  }
  const response = await httpClient.get(url);
  return response.data;
};

export const createProduct = async (body) => {
  const response = await httpClient.post('/product/', body);
  return response.data;
};

export const editProduct = async (body) => {
  const response = await httpClient.put('/product/', body);
  return response.data;
};

export const getProductById = async (id) => {
  try {
    const response = await httpClient.get(`/product/?productID=${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await httpClient.delete(`/product/${id}`);
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


export const getFilteredProducts = async (filters) => {
    try {
        const response = await httpClient.get(`get_products?page=${query? `&${query}`: ''}`)
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
