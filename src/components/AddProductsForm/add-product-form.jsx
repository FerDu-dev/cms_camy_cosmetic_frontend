import React, { useState, useEffect } from 'react';
import { getProductTypes, getBrands } from '../../api/brands&types';
import { Button, Drawer, Form, Input, Select, Upload, AutoComplete } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {emptyFields} from '../../helpers/constantFunctions'
import fetchOptions from '../../api/autocomplete';
import { createProduct } from '../../api/products';
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;

export const AddProductForm = ({
  fetchProducts = () => {}
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    type: '',
    brand: '',
    price: '',
  });
  const [images, setImages] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypeID, setProductTypeID] = useState(null);
  const [brandID, setBrandID] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [validation, setValidation] = useState({name: false, type: false, brand: false, price: false, quantity: false, variant: false});
  const [submitted, setSubmitted] = useState(false);
  const [options, setOptions] = useState([]);
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

  useEffect(() => {
    const fieldsAreValid = emptyFields(product);
    // setIsButtonDisabled(!fieldsAreValid);
    // if (submitted) {
    //   setValidation({
    //     name: !product.name,
    //     type: !product.type,
    //     brand: !product.brand,
    //     price: !product.price,
    //   });
    // }
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
    form.resetFields();
  };

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (value, name) => {
    let selectedId;
    if (name === 'type') {
      const selectedType = productTypes.find(type => type.value === value);
      selectedId = selectedType.id;
      setProductTypeID(selectedId);
    } else if (name === 'brand') {
      const selectedBrand = brands.find(brand => brand.value === value);
      selectedId = selectedBrand.id;
      setBrandID(selectedId);
    }
    setProduct({
      ...product,
      [name]: value
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

  const handleUpload = ({ fileList }) => {
    const newImages = fileList.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onloadend = () => {
          const base64Image = reader.result;
          const [prefix, file_string] = base64Image.split(',');
          const [firstPart] = prefix.split(';');
          const [_, file_extension] = firstPart.split('/');
          if (['png', 'jpeg', 'jpg', 'svg'].includes(file_extension)) {
            const file_name = 'image';
            resolve({ file_string, file_name, file_type: file_extension });
          } else {
            reject('Formato de imagen no válido. Por favor, sube una imagen PNG, JPEG, JPG o SVG.');
          }
        };
      });
    });
  
    Promise.all(newImages)
      .then(base64Images => {
        setImages(base64Images);
      })
      .catch(error => alert(error));
  };

  const handleImageChange = async ({ fileList }) => {
    const newImages = await Promise.all(fileList.map(file => fileToBase64(file.originFileObj)));
    setImages(newImages);
  };

  const handleSubmit =async (values) => {
    setSubmitted(true)
    const { name, price, commentary } = values
    if (true || !isButtonDisabled) {
      const productCreated = {
      name,
      productTypeID: parseInt(productTypeID),
      brandID,
      commentary: values.commentary,
      price: parseFloat(price),
      pictures: images,  
      };
      console.log("producto creado:", productCreated);

      await createProduct(productCreated) 
      fetchProducts()
      handleCloseDrawer();
    }
  }

const handleSearch = async (value, type_model) => {
  const results = await fetchOptions(value || '', type_model);
  console.log("res",results)
  if (type_model === 'product_type') {
    setProductTypes(results);
  } else if (type_model === 'brand') {
    setBrands(results);
  }
};

const handleFocus = (type_model) => {
  handleSearch('', type_model);
};

  return (
    <>
      <Button type="primary" onClick={handleOpenDrawer} style={{marginBottom:"0.5rem"}}>
        Agregar Producto
      </Button>
      
      <Drawer title="Agregar un producto" placement="right" onClose={handleCloseDrawer} open={drawerOpen}>
        <Form 
          layout="vertical" 
          onFinish={handleSubmit} 
          form={form}
        >
          <Form.Item label="Nombre del producto" name="name">
            <Input />
          </Form.Item>
          
          <Form.Item label="Tipo de producto" name="type">
            <AutoComplete
              options={productTypes}
              onSearch={(value) => handleSearch(value, 'product_type')}
              onSelect={(value) => handleSelectChange(value, 'type')}
              onFocus={() => handleFocus('product_type')}
            />
          </Form.Item>
          
          <Form.Item label="Marca" name="brand">
            <AutoComplete
              options={brands}
              onSearch={(value) => handleSearch(value, 'brand')}
              onSelect={(value) => handleSelectChange(value, 'brand')}
              onFocus={() => handleFocus('brand')}
            />
          </Form.Item>
          
          <Form.Item label="Precio" name="price">
            <Input />
          </Form.Item>

          <Form.Item label='Comentarios' name='commentary'>
            <TextArea />
          </Form.Item>
          
          
          <Form.Item label="Imágenes" name="images">
          <Upload onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Subir Imagen</Button>
          </Upload>
        </Form.Item>
          
          <Button type="primary" htmlType="submit" disabled={false && isButtonDisabled}>
            Agregar 
          </Button>
        </Form>
      </Drawer>
    </>
  );
}

export default AddProductForm;




