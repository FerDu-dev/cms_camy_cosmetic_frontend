import { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Table, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBrands, createBrand } from '../../api/brands&types'; 

export const BrandForm = () => {
  const [brand, setBrand] = useState('');
  const [brandImage, setBrandImage] = useState(null);
  const [brands, setBrands] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const brandsPerPage = 6;

  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands = await getBrands(currentPage, brandsPerPage); 
      console.log(fetchedBrands)
      setBrands(fetchedBrands.data);
    };
    fetchBrands();
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
        setBrandImage({ file_string, file_name, file_type: file_extension });
      } else {
        alert('Formato de imagen no válido. Por favor, sube una imagen PNG, JPEG, JPG o SVG.');
      }
    };
  };
  
  
  
  

  const handleBrandSubmit = async () => {
    console.log("product image:",brandImage)
    try {
      const newBrand = { 
        name: brand, 
        picture: brandImage
      }; 
      await createBrand(newBrand);
      setBrands([...brands, newBrand]);
      setBrand('');
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
      dataIndex: 'picture_url',
      key: 'picture_url',
      render: picture_url => <img src={picture_url} alt="Brand" style={{width: '50px'}} />,
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <div>
      <h2>Brands</h2>
      <Button type="primary" onClick={showModal}>
        Agregar nueva marca
      </Button>
      <Table columns={columns} dataSource={brands} rowKey="id" style={{marginTop:"1rem"}} pagination={{current: currentPage, total: brands.length, pageSize: brandsPerPage, onChange: (page) => setCurrentPage(page)}} />
      <Modal 
        title="Agregar Marca" 
        open={isModalVisible} 
        onOk={handleBrandSubmit} 
        onCancel={handleCancel}
        destroyOnClose={true}
        >
        <Form onFinish={handleBrandSubmit} preserve={false}>
          <Form.Item>
            <Input placeholder="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} />
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

export default BrandForm;