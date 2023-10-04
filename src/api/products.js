import httpClient from "../config/httpClient";

const simulatedProducts = [
  { id:1, name: 'labial', productType: 'Tipo 1', brand: 'Marca 1', quantity: 10, price: 10 },
  { id:2, name: 'polvo', productType: 'Tipo 2', brand: 'Marca 2', quantity: 15, price: 20 },
  { id:3, name: 'labial', productType: 'Tipo 3', brand: 'Marca 3', quantity: 20, price: 40 },
  { id:4, name: 'rubor', productType: 'Tipo 4', brand: 'Marca 4', quantity: 25, price: 15 },
  { id:5, name: 'lapiz', productType: 'Tipo 5', brand: 'Marca 5', quantity: 30, price: 80 },
  { id:6, name: 'pintura', productType: 'Tipo 1', brand: 'Marca 1', quantity: 10, price: 10 },
  { id:7, name: 'rubor', productType: 'Tipo 2', brand: 'Marca 2', quantity: 15, price: 20 },
  { id:8, name: 'moppa', productType: 'Tipo 3', brand: 'Marca 3', quantity: 20, price: 40 },
  { id:9, name: 'rubor', productType: 'Tipo 4', brand: 'Marca 4', quantity: 25, price: 15 },
  { id:10, name: 'lapiz', productType: 'Tipo 5', brand: 'Marca 5', quantity: 30, price: 80 },
];

export const getProducts = async () => {
  try {
   
    return simulatedProducts;

  
  } catch (e) {
    console.log(e);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await httpClient.get(`/get_products/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const createProduct = async (product) => {
  try {
    const response = await httpClient.post('/create_product', product);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await httpClient.put(`/update_product/${id}`, product);
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
