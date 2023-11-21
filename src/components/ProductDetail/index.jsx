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
        {
          key: '3',
          label: 'Precio',
          children: product.price,
        },
        {
          key: '4',
          label: 'Comentarios',
          children: product.commentary,
        },
        {
          key: '5',
          label: 'Cantidad Mínima',
          children: product.minimunQuantity,
        },
       
      ];

      const infoDetail = [
        {
          key: 1,
          label: 'Nombre del producto',
          children: product.name,
        },
        {
          key: 2,
          label: 'Tipo de Producto',
          children: product.productType.productTypeName,
        },
        {
          key: 3,
          label: 'Marca',
          children: product.brand.name,
        },
        {
          key: 4,
          label: 'Precio',
          children: product.price,
        },
        {
          key: 5,
          label: 'Comentarios',
          children: product.commentary,
        },
        {
          key: 6,
          label: 'Cantidad Mínima',
          children: product.minimunQuantity,
        },
        {
          key:7,
          label: 'Imagen del producto',
          children: product.main_picture,
        }
      ]
      


    const fetchProductById = async () => {
        setLoading(true)
        const response = await getProductById(product.key)
        setProductById(response.data)
        
        console.log("product by id",productById)
        setLoading(false)
    }

    useEffect(() => {
        fetchProductById()
        console.log('product in detail', product)
      }, [])

  return (
   <>
   
    <div style={{paddingLeft:"1rem"}}>
    {infoDetail.map((item) => (
    <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
        <span style={{fontSize:"16px"}}>{item.label}:</span>
        {item.label === 'Imagen del producto' ? (
            <img width={80} height={80} src={item.children} alt="Producto" style={{marginTop:"10px", marginLeft:"10px"}} />
        ) : (
            <h1 style={{fontSize:"16px", marginTop:"10px", marginLeft:"10px"}}>{item.children}</h1>
        )}
    </div>
    ))}
       
          
     
    </div>
   
    </>
  );
    
};

export default ProductDetail;

