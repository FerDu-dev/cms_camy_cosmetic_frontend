import React, { useState, useEffect } from 'react';
import { getProductTypes, getBrands } from '../../api/brands&types';
import { Button, Drawer, Form, Input, Select, Upload, AutoComplete, Modal, InputNumber, Tooltip } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import {emptyFields} from '../../helpers/constantFunctions'
import fetchOptions from '../../api/autocomplete';
import { createProduct } from '../../api/products';
import TextArea from 'antd/es/input/TextArea';
import CustomOptions from '../CustomOptions';
import AddBrand from '../AddBrand/AddBrand';
import AddProductType from '../AddProductType/AddProductType';

const { Option } = Select;


export const AddProductForm = ({
  fetchProducts = () => {}
}) => {
  const [step, setStep] = useState(0);
  const [product, setProduct] = useState({
    name: '',
    type: '',
    brand: '',
    price: '',
  });
  const [variants, setVariants] = useState([]);
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
  const [modalType, setModalType] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState({ name: '', image: '' });


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

  const handleOpenModal = () => setVisible(true);
  const handleCloseModal = () => setVisible(false);



  
 

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

  const handleMainImageUpload = ({ fileList }) => {
    if (fileList.length > 0) {
      fileToBase64(fileList[0].originFileObj)
        .then(base64Image => setMainImage(base64Image))
        .catch(error => alert(error));
    } else {
      setMainImage(null);
    }
  };

  const handleVariantImageUpload = ({ fileList }) => {
    if (fileList.length > 0) {
      fileToBase64(fileList[0].originFileObj)
        .then(base64Image => setVariant({ ...variant, image: base64Image }))
        .catch(error => alert(error));
    } else {
      setVariant({ ...variant, image: '' });
    }
  };

  const handleSubmit = async () => {
    if (step === 1) {
      const { name, price, commentary, quantity, minQuantity } = product;
      
      if (true || !isButtonDisabled) {
        const productCreated = {
          name,
          productTypeID: parseInt(productTypeID),
          brandID,
          commentary: values.commentary,
          price: parseFloat(price),
          mainImage: mainImage,
          pictures: images,
          quantity: parseInt(quantity),
          minQuantity: parseInt(minQuantity),
          variants,
        };
        console.log("product created",productCreated)
    
        await createProduct(productCreated);
        fetchProducts();
        setVisible(false);
      }
    }
  };
  
  

const handleSearch = async (value, type_model) => {
  const results = await fetchOptions(value || '', type_model);
 
  if (type_model === 'product_type') {
    setProductTypes(results);
  } else if (type_model === 'brand') {
    setBrands(results);
  }
};

const handleFocus = (type_model) => {
  handleSearch('', type_model);
};

const handleNext = () => {
  if (step === 0) {
    form.validateFields().then(values => {
      setProduct(values);
      setStep(1);
    }).catch(info => {
      console.log('Validation failed:', info);
    });
  } else if (step === 1) {
    form.validateFields().then(values => {
      setVariants(values.variants); 
      handleSubmit();
    }).catch(info => {
      console.log('Validation failed:', info);
    });
  }
};

const addVariant = () => {
  setVariants([...variants, variant]);
  setVariant({ name: '', image: '' });
};


return (
  <>
    <Button type="primary" onClick={() => setVisible(true)} style={{marginBottom:"0.5rem"}}>
      Agregar Producto
    </Button>
    
    <Modal title="Agregar un producto" visible={visible} onOk={handleSubmit} onCancel={() => setVisible(false)}>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        {step === 0 && (
          <>
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

            
            <Form.Item label="Cantidad" name="quantity">
              <InputNumber />
            </Form.Item>
          
            <Form.Item label="Cantidad mínima" name="minQuantity">
              <InputNumber />
            </Form.Item>

            <Form.Item label='Comentarios' name='commentary'>
              <TextArea />
            </Form.Item>
           
          </>
        )}

        {step === 1 && (
          <>
          <Form.Item label="Nombre de la variante">
            <Input value={variant.name} onChange={(e) => handleVariantChange(e, 'name')} />
          </Form.Item>

          <Form.Item label="Imagen de la variante">
            <Upload 
              accept="image/*" 
              beforeUpload={() => false} 
              onChange={handleVariantImageUpload} 
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Subir Imagen</Button>
            </Upload>
          </Form.Item>

          <Tooltip title="Agregar más variantes">
            <Button type="primary" icon={<PlusOutlined />} onClick={addVariant} />
          </Tooltip>
            
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
            
            
            <Form.Item label="Imágenes" name="images">
              <Upload onChange={handleUpload}>
                <Button icon={<UploadOutlined />}>Subir varias Imagen</Button>
              </Upload>
            </Form.Item>
          </>
        )}
        
        <Button type="primary" onClick={handleNext}>
          {step === 0 ? 'Siguiente' : 'Agregar'}
        </Button>
      </Form>
    </Modal>
  </>
);
}

export default AddProductForm;




