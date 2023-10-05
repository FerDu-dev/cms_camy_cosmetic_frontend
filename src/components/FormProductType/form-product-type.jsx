import { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Table, Upload, message, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getProductTypes, createProductType } from '../../api/brands&types'; 

export const ProductTypeForm = () => {
  const [form] = Form.useForm();
   const [isLoading, setIsLoading] = useState(false);
  const [productType, setProductType] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productTypes, setProductTypes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

 useEffect(() => {
    fetchProductTypes();
  }, [currentPage]);

  const fetchProductTypes = async () => {
    setIsLoading(true);
    const fetchedProductTypes = await getProductTypes(currentPage, productsPerPage); 
    setProductTypes(fetchedProductTypes.data);
    setIsLoading(false);
  };
  

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
    setIsLoading(true);
    try {
      const newProductType = { 
        name: productType, 
        picture: productImage
      }; 
      await createProductType(newProductType);
      await fetchProductTypes(); 
      setProductTypes([...productTypes, newProductType]);
      setProductType('');
      setIsModalVisible(false);
      closeModalAndResetForm();
    } catch (error) {
      console.log(error);
    }
     setIsLoading(false);
  };
  
  
  
  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const closeModalAndResetForm = () => {
    setIsModalVisible(false);
    form.resetFields();
    setProductType('');
    setProductImage(null);
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
      <Spin spinning={isLoading}> 
        <Table 
          columns={columns} 
          dataSource={productTypes} 
          rowKey="id" 
          style={{marginTop:"1rem"}} 
          pagination={{
            current: currentPage, 
            total: productTypes.length, 
            pageSize: productsPerPage, 
            onChange: (page) => setCurrentPage(page)}} 
            />
      </Spin>
      <Modal 
         title="Agregar Tipo de producto" 
        open={isModalVisible} 
        onOk={handleProductTypeSubmit} 
        onCancel={closeModalAndResetForm}
        destroyOnClose={true}
        okButtonProps={{ disabled: !productType || !productImage }}
        confirmLoading={isLoading} 
        >
         <Form form={form} onFinish={handleProductTypeSubmit}>
          <Form.Item>
          <Input placeholder="Tipo de producto" value={productType} onChange={(e) => setProductType(e.target.value)} />
          </Form.Item>
          <Form.Item>
          <Upload accept="image/*" beforeUpload={() => false} onChange={handleUpload} maxCount={1} fileList={productImage ? [productImage] : []}>
              <Button icon={<UploadOutlined />}>Subir imagen</Button>
          </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
