import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { getProductById } from '../../api/products';
import { Descriptions, Form, Input, Table } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import PhotosProduct from '../PhotosProduct';
import ProductVariants from '../VariantsProduct';
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined, PlusCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';

const ProductDetail = ({ product, view, setView }) => {
    const [loading, setLoading] = useState(false)
    const [productById, setProductById] = useState(null);
    


    const columns = [
      {
        title: 'Imagen',
        dataIndex: 'image',
        key: 'image',
        render: (text, record) => <img width={80} height={80} src={record.image} alt="Variante del producto" />
      },
      {
        title: 'Nombre',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Acciones',
        key:'acciones',
        dataIndex: 'key',
        render: (key, __, record) => (
          <span>
            <DeleteOutlined style={{ color: 'red', marginRight: '5px' }} onClick={() => handleDelete(record.key)} />
          </span>
        )
      }
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
        },
        {
          key:8,
          label: 'Variante del producto:',
        },
        {

          key:9,
         
          children:  <Table dataSource={productById?.productsVariants} columns={columns} />,
        }

      ]
      


    const fetchProductById = async () => {
        setLoading(true)
        const response = await getProductById(product.key)
        setProductById(response.data)
        
        setLoading(false)
    }

    useEffect(() => {
        fetchProductById()
      }, [])

       const handleDelete = (key) => {
        confirm({
          title: 'Estas seguro de eliminar este producto?',
          icon: <ExclamationCircleFilled />,
          content: <span>Producto: {productById.products.name}</span>,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: async() => {
           await deleteProduct(productById.products.productID)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

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

