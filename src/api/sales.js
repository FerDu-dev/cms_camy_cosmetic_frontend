
import httpClient from "../config/httpClient";

// datos simulados
const simulatedSales = [
    {
      "id": 1,
      "customerName": "Maria",
      "sellerName": "Juan",
      "amount": 150,
      "products": [
        {
          "id": 1,
          "name": "Labial rojo",
          "variant": "Mate",
          "quantity": 2,
          "amount": 50
        },
        {
          "id": 2,
          "name": "Base líquida",
          "variant": "Tono natural",
          "quantity": 1,
          "amount": 100
        }
      ]
    },
    {
      "id": 2,
      "customerName": "Ana",
      "sellerName": "Pedro",
      "amount": 200,
      "products": [
        {
          "id": 3,
          "name": "Máscara de pestañas",
          "variant": "Negro intenso",
          "quantity": 1,
          "amount": 100
        },
        {
          "id": 4,
          "name": "Paleta de sombras",
          "variant": "Colores tierra",
          "quantity": 1,
          "amount": 100
        }
      ]
    }
  ];
  

export const getSales = async () => {
  try {
    // usando datos simuladow
    return simulatedSales;

    //  cuando tenga el servidor listo
    // const response = await httpClient.get('/get_sales');
    // return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const createSale = async (sale) => {
    try {
     
      return { id: Math.random(), ...sale };
  
      //  cuando tenga el servidor listo
      // const response = await httpClient.post('/create_sale', sale);
      // return response.data;
    } catch (e) {
      console.log(e);
    }
  };
  

