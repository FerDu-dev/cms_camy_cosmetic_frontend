import httpClient from "../config/httpClient";

const simulatedBrands = [
    { id:1, name: 'Marca 1' },
    { id:2, name: 'Marca 2' },
   
  ];
  
  const simulatedProductTypes = [
    { id:1, name: 'Tipo 1' },
    { id:2, name: 'Tipo 2' },
   
  ];
  
 

  export const getProductTypes = async (page, limit) => {
    try {
      const response = await httpClient.get(`/settings/products_type?page=${page}&limit=${limit}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  

export const createProductType = async (newProductType) => {
  try {
    const response = await httpClient.post('/settings/products_type', newProductType);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

  export const getBrands = async (page,limit) => {
    try {
      const response = await httpClient.get(`/settings/brand?page=${page}&limit=${limit}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  
  
  export const createBrand = async (brand) => {
    try {
      const response = await httpClient.post('/settings/brand', brand);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  
  