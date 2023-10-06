import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Select, InputNumber, Input } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import AddProductForm from '../AddProductsForm/add-product-form';
import { getProducts } from '../../api/products';

const { Option } = Select;

export const ProductsTable = () => {
  
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Foto',
      dataIndex: 'icon',
      key: 'icon',
      render: icon => <img src={icon} alt="Producto" style={{width: '50px'}} />,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
   
  ];

  const fetchProducts = async () => {
    setLoading(true)
    const fetchedProduct = await getProducts(currentPage, productsPerPage); 
    console.log(fetchProducts)
    setProducts(fetchedProduct.data);
    setLoading(false)
  }

  useEffect(() => {
  
    fetchProducts();
  }, [currentPage]);

   return (
     <div>
      
      
       <Table loading={loading} columns={columns} dataSource={products} rowKey="id" style={{marginTop:"1rem"}} pagination={{current: currentPage, total: totalProducts, pageSize: productsPerPage, onChange: (page) => setCurrentPage(page)}} />
     </div>
   );
};


export default ProductsTable;

