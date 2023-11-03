
import httpClient from "../config/httpClient";



export const getSales = async () => {
  try {
    
    //  cuando tenga el back listo
    // const response = await httpClient.get('/get_sales');
    // return response.data;
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
  

