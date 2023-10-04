import React, { useState, useEffect } from 'react';
import { getProductTypes, getBrands } from '../../api/brands&types';
import { Button, Drawer, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {emptyFields} from '../../helpers/constantFunctions'

const { Option } = Select;

export const AddProductForm = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    type: '',
    brand: '',
    price: '',
    quantity: '',
    variant: ''
  });
  const [images, setImages] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [validation, setValidation] = useState({name: false, type: false, brand: false, price: false, quantity: false, variant: false});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchProductTypesAndBrands = async () => {
      const fetchedProductTypes = await getProductTypes();
      const fetchedBrands = await getBrands();
      setProductTypes(fetchedProductTypes);
      setBrands(fetchedBrands);
    };
    fetchProductTypesAndBrands();
  }, []);

  useEffect(() => {
    const fieldsAreValid = emptyFields(product);
    setIsButtonDisabled(!fieldsAreValid);
    if (submitted) {
      setValidation({
        name: !product.name,
        type: !product.type,
        brand: !product.brand,
        price: !product.price,
        quantity: !product.quantity,
        variant: !product.variant
      });
    }
  }, [product, submitted]);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setProduct({
      name: '',
      type: '',
      brand: '',
      price: '',
      quantity: '',
      variant: ''
    });
    setValidation({
      name: false,
      type: false,
      brand: false,
      price: false,
      quantity: false,
      variant: false
    });
    setSubmitted(false);
  };

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value, name) => {
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleImageChange = ({ fileList }) => {
    const newImages = fileList.map(file => {
      if (file.originFileObj) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
    });

    Promise.all(newImages)
      .then(base64Images => {
        console.log(base64Images); // Ver las imágenes en base64 en la consola
        setImages(base64Images);
      })
      .catch(error => console.error(error));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    
    if (!isButtonDisabled) {
      const imagesWithoutPrefix = images.map(image => image.split('base64,')[1]);
      const productWithImages = {
        ...product,
        images: imagesWithoutPrefix, 
      };
  
      console.log("producto creado:", JSON.stringify(productWithImages, null, 2));
      
      handleCloseDrawer();
    }
}

  return (
    <>
      <Button type="primary" onClick={handleOpenDrawer} style={{marginBottom:"0.5rem"}}>
        Agregar Producto
      </Button>
      
      <Drawer title="Agregar un producto" placement="right" onClose={handleCloseDrawer} open={drawerOpen}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Nombre del producto" name="name">
            <Input name="name" onChange={handleInputChange} />
          </Form.Item>
          
          <Form.Item label="Tipo de producto" name="type">
            <Select name="type" onChange={(value) => handleSelectChange(value, 'type')}>
              {productTypes && productTypes.map((type) => (
                <Option key={type.id} value={type.id}>{type.name}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item label="Marca" name="brand">
            <Select name="brand" onChange={(value) => handleSelectChange(value, 'brand')}>
              {brands && brands.map((brand) => (
                <Option key={brand.id} value={brand.id}>{brand.name}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item label="Precio" name="price">
            <Input name="price" onChange={handleInputChange} />
          </Form.Item>
          
          <Form.Item label="Cantidad" name="quantity">
            <Input name="quantity" onChange={handleInputChange} />
          </Form.Item>
          
          <Form.Item label="Variante" name="variant">
            <Input name="variant" onChange={handleInputChange} />
          </Form.Item>
          
          <Form.Item label="Imágenes" name="images">
            <Upload onChange={handleImageChange}>
              <Button icon={<UploadOutlined />}>Subir Imagen</Button>
            </Upload>
          </Form.Item>
          
          <Button type="primary" htmlType="submit" disabled={isButtonDisabled}>
            Agregar 
          </Button>
        </Form>
      </Drawer>
    </>
  );
}

export default AddProductForm;




