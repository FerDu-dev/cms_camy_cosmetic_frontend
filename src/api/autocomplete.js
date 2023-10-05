
import httpClient from "../config/httpClient";



export const fetchOptions = async (value, type_model) => {
  try {
    const response = await httpClient.get(`/input/autocomplete?type_model=${type_model}&search=${value}`);
    console.log(response.data.data)
    if (type_model == 'brand') return response.data.data.map(item => ({ value: item.name }));
    if(type_model == 'product_type') return response.data.data.map(item => ({ value: item.productTypeName }));
  } catch (e) {
    console.log(e);
  }
};

export default fetchOptions;
