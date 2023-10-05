import { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getProductTypes, createProductType } from '../../api/brands&types'; 

export const ProductTypeForm = () => {
  const [productType, setProductType] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productTypes, setProductTypes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const fetchProductTypes = async () => {
      const fetchedProductTypes = await getProductTypes(currentPage, productsPerPage); 
      setProductTypes(fetchedProductTypes.data);
    };
    fetchProductTypes();
  }, [currentPage]);
  

  const handleUpload = ({ fileList }) => {
    const file = fileList[0].originFileObj;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64Image = reader.result;
      const [prefix, file_string] = base64Image.split(',');
      const [firstPart] = prefix.split(';');
      const [_, file_extension] = firstPart.split('/');
      if (['png', 'jpeg', 'jpg', 'svg'].includes(file_extension)) {
        const file_name = 'image';
        setProductImage({ file_string, file_name, file_type: file_extension });
      } else {
        alert('Formato de imagen no válido. Por favor, sube una imagen PNG, JPEG, JPG o SVG.');
      }
    };
  };
  
  
  
  

  const handleProductTypeSubmit = async () => {
    console.log("product image:",productImage)
    try {
      const newProductType = { 
        name: productType, 
        picture: productImage
      }; 
      await createProductType(newProductType);
      setProductTypes([...productTypes, newProductType]);
      setProductType('');
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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

  return (
    <div>
      <h2>Tipos de productos</h2>
      <Button type="primary" onClick={showModal}>
        Agregar tipo de producto
      </Button>
      <Table columns={columns} dataSource={productTypes} rowKey="id" style={{marginTop:"1rem"}} pagination={{current: currentPage, total: productTypes.length, pageSize: productsPerPage, onChange: (page) => setCurrentPage(page)}} />
      <Modal title="Agregar Tipo de producto" visible={isModalVisible} onOk={handleProductTypeSubmit} onCancel={handleCancel}>
        <Form onFinish={handleProductTypeSubmit}>
          <Form.Item>
            <Input placeholder="Tipo de producto" value={productType} onChange={(e) => setProductType(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Upload accept="image/*" beforeUpload={() => false} onChange={handleUpload} maxCount={1}>
              <Button icon={<UploadOutlined />}>Subir imagen</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
