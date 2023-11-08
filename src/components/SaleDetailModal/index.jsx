import React, {useState, useEffect} from 'react';
import { Form, Button, Input, Descriptions, Table } from 'antd';
import { getSalesItems } from '../../api/sales';

const SaleDetail = ({ sale }) => {
  const [loading, setLoading] = useState(false)
  const [salesItems, setSalesItems] = useState(null);
  
  const fetchSale = async () => {
    setLoading(true)
    console.log(sale)
    const response = await getSalesItems(sale.id)
    setSalesItems(response.data)
    console.log("sales items: ",salesItems)
    setLoading(false)
  }

  useEffect(() => {
    console.log("sale",sale)
    fetchSale()
  }, [])

  const columns = [
    {
      title: 'Imagen',
      dataIndex: 'product',
      key: 'image',
      render: product => <img src={product.main_picture} alt="Producto" style={{ width: '80px', height:"80px" }} />
    },
    {
      title: 'Nombre del Producto',
      dataIndex: 'product',
      key: 'name',
      render: product => product.name
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Precio',
      dataIndex: 'product',
      key: 'price',
      render: product => product.price
    },
  ];

  return (
    <>
      <span>Productos vendidos</span>
      {salesItems && <Table dataSource={salesItems} columns={columns} pagination={false} />}
      <p>Venta total: ${sale.amount} </p>
    </>
  );
};

export default SaleDetail;