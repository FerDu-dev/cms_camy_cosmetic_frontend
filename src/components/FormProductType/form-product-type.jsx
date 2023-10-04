
import { useState, useEffect } from 'react';
import { Form, Input, Button, List } from 'antd';
import { getProductTypes, createProductType } from '../../api/brands&types'; 

export const ProductTypeForm = () => {
  const [productType, setProductType] = useState('');
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      const fetchedProductTypes = await getProductTypes();
      setProductTypes(fetchedProductTypes);
    };
    fetchProductTypes();
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
    </div>
  );
}
