import React, { useState, useEffect} from 'react'
import { Modal, Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createBrand } from '../../api/brands&types';

export const AddBrand = ({ 
    getBrands 
}) => {
    const [brand, setBrand] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [brandImage, setBrandImage] = useState(null);
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
            setBrandImage({ file_string, file_name, file_type: file_extension });
          } else {
            alert('Formato de imagen no válido. Por favor, sube una imagen PNG, JPEG, JPG o SVG.');
          }
        };
      };

      const handleBrandSubmit = async () => {
        console.log("product image:",brandImage)
        setLoading(true)
        try {
          const newBrand = { 
            name: brand, 
            picture: brandImage
          }; 
          await createBrand(newBrand);
          getBrands()
          handleCancel()
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
        setBrand('');
        setLoading(false);
        setBrandImage(null)
      };
    
      return (
        <>
            <Button type="primary" onClick={showModal}>
                Agregar nueva marca
            </Button>
            <Modal 
                title="Agregar Marca" 
                open={isModalVisible} 
                onOk={handleBrandSubmit} 
                onCancel={handleCancel}
                okButtonProps={{ disabled: !brand || !brandImage || loading }}
                destroyOnClose={true}
                confirmLoading={loading}
                >
                <Form onFinish={handleBrandSubmit} preserve={false}>
                <Form.Item>
                    <Input placeholder="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Upload accept="image/*" beforeUpload={() => false} onChange={handleUpload} maxCount={1}>
                    <Button  icon={<UploadOutlined />}>Subir imagen</Button>
                    </Upload>
                </Form.Item>
                </Form>
            </Modal>
        </>
      )

}
export default AddBrand;