import { useState, useEffect } from 'react';
import { Form, Input, Button, List } from 'antd';
import { getBrands, createBrand } from '../../api/brands&types'; 

export const BrandForm = () => {
  const [brand, setBrand] = useState('');
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands = await getBrands();
      setBrands(fetchedBrands);
    };
    fetchBrands();
  }, []);

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
