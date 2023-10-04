import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Select, InputNumber, Input } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import ProductsFilter from '../ProductsFilter/products-filter';
import AddProductForm from '../AddProductsForm/add-product-form';
import { getProducts, getFilteredProducts } from '../../api/products';

const { Option } = Select;

export const ProductsTable = () => {
  
  const [products, setProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [filters, setFilters] = useState({ search: '', type: '', brand: '', priceRange: [0, 100] });
  const productTypes = [...new Set(products.map(product => product.productType))];
  const brands = [...new Set(products.map(product => product.brand))];
 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      const productsData = await getProducts();
      setProducts(productsData);
    };
  
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      const fetchedProducts = await getFilteredProducts(filters);
      setProductsServer(fetchedProducts);
    };

    fetchFilteredProducts();
  }, [filters]);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const newCurrentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    setCurrentProducts(newCurrentProducts);
  }, [currentPage, products]);

  const handleSearch = (event) => setFilters({ ...filters, search: event.target.value });
  const handleTypeSelect = (value) => setFilters({ ...filters, type: value });
  const handleBrandSelect = (value) => setFilters({ ...filters, brand: value });
  const handlePriceRange = (value) => setFilters({ ...filters, priceRange: [0, value] });

 
   return (
     <div>
       <AddProductForm />

       <ProductsFilter />

       <Table dataSource={currentProducts} pagination={false}>
         <Table.Column title="Nombre" dataIndex="name" key="name" />
         <Table.Column title="Tipo de producto" dataIndex="productType" key="productType" />
         <Table.Column title="Marca" dataIndex="brand" key="brand" />
         <Table.Column title="Cantidad" dataIndex="quantity" key="quantity" />
         <Table.Column title="Precio" dataIndex="price" key="price" />
         <Table.Column
           title="Acciones"
           key="actions"
           render={() => (
             <>
               <EditOutlined style={{ marginRight: '10px' }} /> 
               <EyeOutlined style={{ marginRight: '10px' }} /> 
               <DeleteOutlined />
             </>
           )}
         />
       </Table>

       <Pagination current={currentPage} total={products.length} pageSize={productsPerPage} onChange={(page) => {
        setCurrentPage(page);
      }}  />
     </div>
   );
};


export default ProductsTable;

