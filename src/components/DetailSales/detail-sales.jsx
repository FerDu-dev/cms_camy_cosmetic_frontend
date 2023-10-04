import React, { useState, useEffect } from 'react';
import { getSales } from '../../api/sales'; // Asume que tienes una función getSales en tu archivo sales.js
import { Collapse, Typography, List } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import AddSaleButton from '../ButtonAddSale/button-add-sale';

const { Panel } = Collapse;

export const DetailSales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const salesData = await getSales();
      setSales(salesData);
    };

    fetchSales();
  }, []);

  return (
    <div>
      <h1>Ventas</h1>
      <AddSaleButton/>
      <Collapse expandIcon={({ isActive }) => <DownOutlined rotate={isActive ? 180 : 0} />}>
        {sales.map((sale) => (
          <Panel header={`Cliente: ${sale.customerName}, Vendedor: ${sale.sellerName}, Monto: ${sale.amount}`} key={sale.id}>
            <Typography>
              Cliente: {sale.customerName}, Vendedor: {sale.sellerName}, Monto: {sale.amount}
              <List
                dataSource={sale.products}
                renderItem={item => (
                  <List.Item>
                    Nombre: {item.name}, Variante: {item.variant}, Cantidad: {item.quantity}, Monto: {item.amount}
                  </List.Item>
                )}
              />
              Total: {sale.products.reduce((total, product) => total + product.amount, 0)}
            </Typography>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
}

export default DetailSales;

