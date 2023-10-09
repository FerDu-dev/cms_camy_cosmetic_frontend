import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getProductById } from '../../api/products';
import { Descriptions, Form, Input } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import PhotosProduct from '../PhotosProduct';
import ProductVariants from '../VariantsProduct';


const ProductDetail = ({ product, view, setView }) => {
    const [loading, setLoading] = useState(false)
    const [productById, setProductById] = useState(null);
    


    const itemsInfo = [
        {
          key: '1',
          label: 'Marca',
          children: product.brand.name,
        },
        {
          key: '2',
          label: 'Tipo de Producto',
          children: product.productType.productTypeName,
        },
       
      ];
      


    const fetchProductById = async () => {
        setLoading(true)
        const response = await getProductById(product.key)
        setProductById(response.data)
        
        console.log("product by id",productById)
        setLoading(false)
    }

    useEffect(() => {
        fetchProductById()
      }, [])

  return (
   <>
    {view === 'detail' ? (
    <div style={{paddingLeft:"1rem"}}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
            <span style={{fontSize:"16px"}}>Nombre del producto:</span>
            <h1 style={{fontSize:"16px", marginTop:"10px", marginLeft:"10px"}} > {product.name}</h1>
        </div>
      <span style={{ fontSize:"16px"}}>Imagenes:</span>
      {productById && productById.productPictures && (
        <PhotosProduct productById={productById}/>
        )}
    
      <Descriptions title="Informacion" items={itemsInfo} />
      <h1 style={{fontSize:"16px", marginBottom:"2rem"}}>Variantes:</h1>
      <Button onClick={() => setView('form')}>Agregar Variante</Button>
      {productById && productById.productVariants && (
        <ProductVariants variants={productById.productVariants} />
        )}
     
    </div>
    ) : (
        <>
       
        <LeftOutlined style={{marginBottom:"1rem"}} onClick={() => setView('detail')} />
        <h1 style={{fontSize:"16px", marginBlock:"2rem"}}>Agregar una nueva variante:</h1>
        <Form style={{display:"flex", flexDirection:"column"}}>
        <Form.Item
          label="Nombre de la variante"
          name="variantName"
          rules={[{ required: true, message: 'Por favor ingresa el nombre de la variante' }]}
        >
          <Input />
        </Form.Item>
    
        <Form.Item
          label="Descripción"
          name="description"
          rules={[{ required: true, message: 'Por favor ingresa una descripción' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Precio especifico"
          name="price"
          
        >
          <Input />
        </Form.Item>
    
      
    
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Agregar
          </Button>
        </Form.Item>
      </Form>
      </>
    )}
    </>
  );
    
};

export default ProductDetail;

