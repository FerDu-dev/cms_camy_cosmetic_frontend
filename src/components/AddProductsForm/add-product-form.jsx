import React, { useState, useEffect } from 'react';
import { getProductTypes, getBrands } from '../../api/brands&types';
import { Button, Drawer, Form, Input, Select, Upload, AutoComplete, Modal, InputNumber, Tooltip } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import {emptyFields} from '../../helpers/constantFunctions'
import {fetchOptions} from '../../api/autocomplete';
import { createProduct } from '../../api/products';
import TextArea from 'antd/es/input/TextArea';
import CustomOptions from '../CustomOptions';
import AddBrand from '../AddBrand/AddBrand';
import AddProductType from '../AddProductType/AddProductType';

const { Option } = Select;

export const AddProductForm = ({ fetchProducts = () => {} }) => {
  const [product, setProduct] = useState({
    name: '',
    type: '',
    brand: '',
    price: '',
    commentary: '',
    minQuantity: ''
  });
  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypeID, setProductTypeID] = useState(null);
  const [brandID, setBrandID] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProductTypesAndBrands = async () => {
      const fetchedProductTypes = await getProductTypes();
      const fetchedBrands = await getBrands();
      setProductTypes(fetchedProductTypes);
      setBrands(fetchedBrands);
    };
    fetchProductTypesAndBrands();
  }, []);

  const handleSelectChange = (value, name) => {
    let selectedId;
    if (name === 'type') {
      const selectedType = productTypes.find(type => type.value === value);
      selectedId = selectedType ? selectedType.id : null;
      setProductTypeID(selectedId);
    } else if (name === 'brand') {
      const selectedBrand = brands.find(brand => brand.value === value);
      selectedId = selectedBrand ? selectedBrand.id : null;
      setBrandID(selectedId);
    }
    setProduct({
      ...product,
      [name]: selectedId ? value : null,
      [`${name}Id`]: selectedId,
    });
  };
  

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split('base64,')[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleMainImageUpload = ({ fileList }) => {
    if (fileList.length > 0) {
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
          setMainImage({ file_string, file_name, file_type: file_extension });
        } else {
          alert('Formato de imagen no válido. Por favor, sube una imagen PNG, JPEG, JPG o SVG.');
        }
      };
    } else {
      setMainImage(null);
    }
  };

  const handleSubmit = async (values) => {
    const { name, type, brand, price, commentary, minQuantity } = product;
    console.log(product)
    const productCreated = {
      name,
      commentary,
      price: parseFloat(price),
      main_picture: mainImage,
      minimunQuantity: Number(minQuantity),
    };
    
    

    if (productTypeID) productCreated.productTypeID = productTypeID
    else productCreated.productType = type;
    if (brandID) 
      productCreated.brandID = brandID;
    else productCreated.brand = brand
    
    
    console.log("product created",productCreated)
    
    await createProduct(productCreated);
    fetchProducts();
    setVisible(false);
  };
  
  const getAutoCompleteOptions = async (value, type) => {
    const response = await fetchOptions(value, type);
    if (type=='brand') setBrands(response)
    if (type =='product_type') setProductTypes(response)
 }
 

  useEffect(() => {
    if(product.brand) getAutoCompleteOptions(product.brand, 'brand')
  }, [product.brand])

  useEffect(() => {
    if (product.type) getAutoCompleteOptions(product.type, 'product_type')
  }, [product.type])

  

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)} style={{marginBottom:"0.5rem"}}>
        Agregar Producto
      </Button>
      
      <Modal title="Agregar un producto" open={visible} onOk={handleSubmit} onCancel={() => setVisible(false)}>
        <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item label="Nombre del producto" name="name">
            <Input 
              value={product.name} 
              onChange={(e) => {
                const auxiliarObj = {...product};
                setProduct({...auxiliarObj, name: e.target.value})
              }}/>
          </Form.Item>
          
          <Form.Item label="Tipo de producto" name="type">
            <AutoComplete
              options={productTypes}
              onSelect={(value) => handleSelectChange(value, 'type')}
              onChange={(value) => {
                const auxiliarObj = {...product};
                setProduct({...auxiliarObj, type: value})
              }}
            />
          </Form.Item>
          
          <Form.Item label="Marca" name="brand">
            <AutoComplete
              options={brands}
              onSelect={(value) => handleSelectChange(value, 'brand')}
              onChange={(value) => {
                const auxiliarObj = {...product}
                setProduct({...auxiliarObj, brand: value})
              }}
            />
          </Form.Item>
          
          <Form.Item label="Precio" name="price">
            <Input 
              value={product.price}
              onChange={(e) => {
                const auxiliarObj = {...product};
                setProduct({...auxiliarObj, price: e.target.value})
              }}
            />
          </Form.Item>

          <Form.Item label='Comentarios' name='commentary'>
            <TextArea 
              value={product.commentary}
              onChange={(e) => {
                const auxiliarObj = {...product};
                setProduct({...auxiliarObj, commentary: e.target.value})
              }}
            />
          </Form.Item>

          <Form.Item label="Cantidad mínima" name="minQuantity">
            <Input
              value={product.minQuantity}
              onChange={(e) => {
                const auxiliarObj = {...product};
                setProduct({...auxiliarObj, minQuantity: e.target.value})
              }}
            />
          </Form.Item>

          <Form.Item label="Imagen Principal" name="mainImage">
            <Upload 
              accept="image/*" 
              beforeUpload={() => false} 
              onChange={handleMainImageUpload} 
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Subir Imagen Principal</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddProductForm;




