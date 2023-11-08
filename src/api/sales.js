
import httpClient from "../config/httpClient";



export const getSales = async (limit, page, storeID, filter = null) => {

  let url = `/store/sale?limit=${limit}&page=${page}&storeID=${storeID}`
  if (filter) {
    if (filter.search) url+=`&search=${filter.search}`
    if (filter.justDate) url+=`&justDate=${filter.justDate}`
    if (filter.startDate && filter.endDate) url +=`&endDate=${filter.endDate}&startDate=${filter.startDate}`
  }
  try {
    const response = await httpClient.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const generateSale = async (sale) => {
    try {
      const response = await httpClient.post('/store/sale', sale);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };


export const getSalesItems = async (saleID) => {
  let url = `/store/sale/items?saleID=${saleID}`
  try {
    const response = await httpClient.get(url);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
  

