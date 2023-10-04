import React, { useState, useEffect } from 'react';
import { Button, Drawer, Form, Input, Select, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getProducts } from '../../api/products';
import { createSale } from '../../api/sales';

export const FormAddSale = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sale, setSale] = useState({
    customerName: '',
    sellerName: '',
    amount: 0,
    products: []
  });
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSale({
      customerName: '',
      sellerName: '',
      amount: 0,
      products: []
    });
  };

  const handleChange = (event) => {
    setSale({
      ...sale,
      [event.target.name]: event.target.value
    });
  };

  const handleAddProduct = () => {
    setSale({
      ...sale,
      products: [...sale.products, { product, quantity, amount }]
    });
    setProduct('');
    setQuantity('');
    setAmount('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(sale); // Aquí se muestra la venta en la consola
    try {
      const newSale = await createSale(sale);
        console.log(`Venta ${newSale.id} creada con éxito`);
      handleCloseDrawer();
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <Button type="primary" onClick={handleOpenDrawer}>
        <PlusOutlined /> Registrar Venta
      </Button>
      <Drawer title="Registrar una venta" placement="right" onClose={handleCloseDrawer} visible={drawerOpen}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Nombre del cliente" name="customerName">
            <Input onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Nombre del vendedor" name="sellerName">
            <Input onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Producto" name="product">
            <Select onChange={(value) => setProduct(value)}>
              {products.map((product, index) => (
                <Select.Option key={index} value={product.name}>{product.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Cantidad" name="quantity">
            <Input onChange={(e) => setQuantity(e.target.value)} />
          </Form.Item>
          <Form.Item label="Monto" name="amount">
            <Input onChange={(e) => setAmount(e.target.value)} />
          </Form.Item>
          <Button type="primary" onClick={handleAddProduct}>
            Agregar Producto
          </Button>
          {/* Aquí puedes mostrar la lista de productos agregados */}
          <List
            dataSource={sale.products}
            renderItem={(item, index) => (
              <List.Item key={index}>
                Producto: {item.product}, Cantidad: {item.quantity}, Monto: {item.amount}
              </List.Item>
            )}
          />
          <Button type="primary" htmlType="submit">
            Registrar 
          </Button>
        </Form>
      </Drawer>
    </>
  );
};

export default FormAddSale;


