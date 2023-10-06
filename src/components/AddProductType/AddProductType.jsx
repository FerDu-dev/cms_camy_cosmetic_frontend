import React, { useState, useEffect} from 'react'
import { Modal, Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createBrand } from '../../api/brands&types';
import { createProductType } from '../../api/brands&types';

export const AddProductType = ({
    getProductTypes,
}) => {
    const [productType, setProductType] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

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
        setLoading(true)
        try {
          const newProductType = { 
            name: productType, 
            picture: productImage
          }; 
          await createProductType(newProductType);
          handleCancel()
          getProductTypes();
        } catch (error) {
          setLoading(false)
          console.log(error);
        }
      };

      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
        setProductType('')
        setLoading(false)
        setProductImage(null)
      };
      
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Agregar tipo de producto
            </Button>
            <Modal 
              title="Agregar Tipo de producto" 
              open={isModalVisible} 
              onOk={handleProductTypeSubmit} 
              onCancel={handleCancel}
              okButtonProps={{ disabled: !productType || !productImage || loading }}
              destroyOnClose={true}
              confirmLoading={loading}
            >
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
        </>
    )
      
}
export default AddProductType;