import React, {useEffect, useState} from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { createProduct } from '../../api/products';
import { fetchOptions } from '../../api/autocomplete';
import TextArea from 'antd/es/input/TextArea';


export const AddVariantForm = ({product}) => {
  const [variant, setVariant] = useState({
    name: '',
    commentary: '',
    price: '',
    minimunQuantity: '',
    mainImage: null,
  });
  const [form] = Form.useForm();

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split('base64,')[1]);
      reader.onerror = error => reject(error);
    });
  };

  useEffect(() => {
    if (product.price) {
      const auxiliarObj = {...variant}
      setVariant({...auxiliarObj, price: product.price})
    }
  }, [product.price])

  useEffect(() => {
    if (product.minimunQuantity) {
      const auxiliarObj = {...variant}
      setVariant({...auxiliarObj, minimunQuantity: product.price})
    }
  }, [product.minimunQuantity])

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
          setVariant({ ...variant, mainImage: { file_string, file_name, file_type: file_extension } });
        } else {
          alert('Formato de imagen no válido. Por favor, sube una imagen PNG, JPEG, JPG o SVG.');
        }
      };
    } else {
      setVariant({ ...variant, mainImage: null });
    }
  };

  const handleSubmit = async (values) => {
    console.log("Valores enviados:", values); 
    console.log(product)
    const variantCreated = {
      ...variant,
      price: Number(variant.price),
      minimunQuantity: Number(variant.minimunQuantity),
      brandID: product.brandID,
      productTypeID: product.productTypeID,
      parentProductID: product.productID,
      main_picture: variant.mainImage,
    };
    
    console.log("variant created", variantCreated)
    
    await createProduct(variantCreated);
    
    form.resetFields();
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <Form.Item label="Nombre de la variante" name="name">
        <Input 
          value={variant.name} 
          onChange={(e) => setVariant({ ...variant, name: e.target.value })}
        />
      </Form.Item>

      <Form.Item label='Comentarios' name='commentary'>
        <TextArea 
          value={variant.commentary}
          onChange={(e) => setVariant({ ...variant, commentary: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Precio" name="price">
        <Input 
          value={variant.price}
          onChange={(e) => setVariant({ ...variant, price: e.target.value })}
        />
      </Form.Item>

      <Form.Item label="Cantidad mínima" name="minQuantity">
        <Input
          value={variant.minimunQuantity}
          onChange={(e) => setVariant({ ...variant, minimunQuantity: e.target.value })}
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

      <Button type="primary" htmlType="submit">
        Agregar
      </Button>
    </Form>
  );
};


  