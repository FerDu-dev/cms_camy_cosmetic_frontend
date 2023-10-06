import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getProductTypes } from '../../api/brands&types'; 
import AddProductType from '../../components/AddProductType/AddProductType';
export const ProductTypeSetting = () => {
    const [productTypes, setProductTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;
    const columns = [
        {
          title: 'Foto',
          dataIndex: 'icon',
          key: 'icon',
          render: icon => <img src={icon} alt="Tipo de producto" style={{width: '50px'}} />,
        },
        {
          title: 'Nombre',
          dataIndex: 'productTypeName',
          key: 'productTypeName',
        },
      ];
    const fetchProductTypes = async () => {
        const fetchedProductTypes = await getProductTypes(currentPage, productsPerPage); 
        setProductTypes(fetchedProductTypes.data);
      };



    useEffect(() => {
        
        fetchProductTypes();
      }, [currentPage]);
    
      return (
        <div>
          <h2>Tipos de productos</h2>
          <AddProductType getProductTypes={fetchProductTypes} />
          <Table columns={columns} dataSource={productTypes} rowKey="id" style={{marginTop:"1rem"}} pagination={{current: currentPage, total: productTypes.length, pageSize: productsPerPage, onChange: (page) => setCurrentPage(page)}} />
          
        </div>
      );

}

export default ProductTypeSetting;