import { useEffect, useState } from 'react';
import { getProductById } from '../../api/products';
import { Button, Drawer, Form, Input, Select, Upload, AutoComplete, Modal, InputNumber, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';  
import { getProductTypes, getBrands } from '../../api/brands&types';
import { editProduct } from '../../api/products';
import { getProducts } from '../../api/products';

const { Option } = Select;


const ProductEdit = ({ product, form, onProductEdited }) => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(null);
    const [brand, setBrand] = useState([]);
    const [productType, setProductType] = useState(null);
    const [productTypeID, setProductTypeID] = useState(product.productTypeID);
    const [brandID, setBrandID] = useState(product.brandID);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(6);

    useEffect(() => {
        console.log('product en edit',product)
      }, [])

      useEffect(() => {
        form.setFieldsValue({
            name: product.name,
            type: product.productType.productTypeName,
            brand: product.brand.name,
            price: product.price,
            commentary: product.commentary,
            minQuantity: product.minimunQuantity
        });
    }, [product, form]);

    useEffect(() => {
        const fetchProductTypesAndBrands = async () => {
          const fetchedProductTypes = await getProductTypes();
          const fetchedBrands = await getBrands();
          setProductType(fetchedProductTypes);
          setBrand(fetchedBrands);
        };
        fetchProductTypesAndBrands();
      }, []);

      const fetchProducts = async () => {
        const response = await await getProducts(limit, currentPage) // Asume que getProducts es la función que recupera los productos del backend
        setProducts(response.data); // Asume que tienes un estado llamado products que almacena los productos
    };

    const handleSelectChange = (value, name) => {
        let selectedId;
        if (name === 'type') {
          const selectedType = productType.find(type => type.value === value);
          selectedId = selectedType ? selectedType.id : null;
          setProductTypeID(selectedId);
        } else if (name === 'brand') {
          const selectedBrand = brand.find(brand => brand.value === value);
          selectedId = selectedBrand ? selectedBrand.id : null;
          setBrandID(selectedId);
        }
      };

    const handleSubmit = async (values) => {
        console.log("product created", values)
        const { name, price, commentary, minQuantity } = values;
        const productData = {
          productID: product.key,  
          name,
          price,
          commentary,
          minimunQuantity: parseInt(minQuantity),
          productTypeID,
          brandID
        };
        console.log(productData)
        await editProduct(productData);
        onProductEdited();
    };

  return (
   <>
   
   <Form layout="vertical" onFinish={handleSubmit} form={form}>
          <Form.Item label="Nombre del producto" name="name">
            <Input value={product.name} />
          </Form.Item>

          <Form.Item label="Tipo de producto" name="type">
            <AutoComplete
              value={product.productType.productTypeName}
              options={productType}
              onSelect={(value) => handleSelectChange(value, 'type')}
            />
          </Form.Item>
          
          <Form.Item label="Marca" name="brand">
            <AutoComplete
              value={product.brand.name}
              options={brand}
              onSelect={(value) => handleSelectChange(value, 'brand')}
            />
          </Form.Item>
          
          <Form.Item label="Precio" name="price">
            <Input 
              value={product.price}
            />
          </Form.Item>

          <Form.Item label='Comentarios' name='commentary'>
            <TextArea 
              value={product.commentary}
            />
          </Form.Item>

          <Form.Item label="Cantidad mínima" name="minQuantity">
            <Input
              value={product.minimunQuantity}
            />
          </Form.Item>

          {/* <Form.Item label="Imagen Principal" name="mainImage">
            <Upload 
              accept="image/*" 
              beforeUpload={() => false} 
              onChange={handleMainImageUpload} 
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Subir Imagen Principal</Button>
            </Upload>
          </Form.Item> */}
    </Form>
   
    </>
  );
    
};

export default ProductEdit;