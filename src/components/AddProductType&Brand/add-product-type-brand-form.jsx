import { useState, useEffect } from 'react';
import { Form, Input, Button, List } from 'antd';
import { getBrands, getProductTypes, createBrand, createProductType } from '../../api/brands&types'; 

export const AddProductTypeAndBrandForm = () => {
  const [productType, setProductType] = useState('');
  const [brand, setBrand] = useState('');
  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchProductTypesAndBrands = async () => {
      const fetchedProductTypes = await getProductTypes();
      const fetchedBrands = await getBrands();
      setProductTypes(fetchedProductTypes);
      setBrands(fetchedBrands);
    };
    fetchProductTypesAndBrands();
  }, []);

  const handleProductTypeSubmit = async () => {
    try {
      const newProductType = { id: productTypes.length + 1, name: productType }; 
      await createProductType(newProductType);
      setProductTypes([...productTypes, newProductType]);
      setProductType('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleBrandSubmit = async () => {
    try {
      const newBrand = { id: brands.length + 1, name: brand }; 
      await createBrand(newBrand);
      setBrands([...brands, newBrand]);
      setBrand('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Tipos de productos</h2>
      <List
        bordered
        dataSource={productTypes}
        renderItem={item => (<List.Item>{item.name}</List.Item>)}
      />
      <Form onFinish={handleProductTypeSubmit} style={{marginTop:"1rem"}}>
        <Form.Item>
          <Input placeholder="Tipo de producto" value={productType} onChange={(e) => setProductType(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Agregar tipo de producto</Button>
        </Form.Item>
      </Form>

      <h2>Marcas</h2>
      <List
        bordered
        dataSource={brands}
        renderItem={item => (<List.Item>{item.name}</List.Item>)}
      />
      <Form onFinish={handleBrandSubmit} style={{marginTop:"1rem"}}>
        <Form.Item>
          <Input placeholder="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Agregar marca</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

  