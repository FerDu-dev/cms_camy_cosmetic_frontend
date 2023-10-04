const simulatedBrands = [
    { id:1, name: 'Marca 1' },
    { id:2, name: 'Marca 2' },
   
  ];
  
  const simulatedProductTypes = [
    { id:1, name: 'Tipo 1' },
    { id:2, name: 'Tipo 2' },
   
  ];
  
  export const getBrands = async () => {
    try {
     
      return simulatedBrands;
  
    
    } catch (e) {
      console.log(e);
    }
  };
  
  export const getProductTypes = async () => {
    try {
      
      return simulatedProductTypes;
  
     
    } catch (e) {
      console.log(e);
    }
  };
  
  export const createBrand = async (brand) => {
    try {
     
      simulatedBrands.push(brand);
      return brand;
  
      
    } catch (e) {
      console.log(e);
    }
  };
  
  export const createProductType = async (productType) => {
    try {
    
      simulatedProductTypes.push(productType);
      return productType;
  
    } catch (e) {
      console.log(e);
    }
  };
  