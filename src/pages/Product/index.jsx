import React, { useState, useEffect} from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import AddProductForm from "../../components/AddProductsForm/add-product-form";
import ProductsFilter from "../../components/ProductsFilter/products-filter";
import ProductDetail from "../../components/ProductDetail";
import ProductsTable from "../../components/ProductsTable/products-table";
import { getProducts } from "../../api/products";
import { Table, Button, Pagination, Modal, Tooltip } from "antd";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";



export const Product = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [changedPage, setChangedPage] = useState(false);
    const [limit, setLimit] = useState(6);
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const location = useLocation();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [view, setView] = useState('detail');
    const columns = [
        {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
          
        },
        {
          title: 'Marca',
          dataIndex: 'brand',
          key: 'brand',
          render: brand => <span>{brand.name}</span>
        },
        {
          title: 'Tipo',
          dataIndex: 'productType',
          key: 'productType',
          render: productType => <span>{productType.productTypeName}</span>
        },
        {
          title: 'Precio',
          dataIndex: 'price',
          key: 'price' 
        },
        {
          title: 'Acciones',
          key:'acciones',
          dataIndex: 'key',
          render: (key) => (
            <span>
              <Tooltip title='Ver detalle' ><EyeOutlined style={{ color: 'blue', marginRight:'5px' }} onClick={() => handleView(key)} /></Tooltip>
              <Tooltip title={'Agregar a tienda'}><PlusOutlined style={{cursor: 'pointer', marginInline:'2px'}} /></Tooltip>
              <EditOutlined style={{ color: 'green', marginRight:'5px' }} onClick={() => handleEdit(key)} />
              <DeleteOutlined style={{ color: 'red' }} onClick={() => handleDelete(key)} />
            </span>
          )
        }
        
      ];

      const fetchProducts = async () => {
        setLoading(true)
        const response = await getProducts(limit, currentPage)
        console.log(response.data)
        setProducts(response.data.map(product => (
          { ...product, key: product.productID}
        )))
        setTotal(response.total)
        setLoading(false)
      }

      const handlePage = (page) => {
        setCurrentPage(page)
        setChangedPage(true)
      }

      useEffect(() => {
        fetchProducts()
      }, [])

      const handleView = (key) => {
        const product = products.find(product => product.key === key);
        setCurrentProduct(product);
        setIsModalVisible(true);
      };
      const handleEdit = (key) => {
        console.log(key)
      };
      
      const handleDelete = (key) => {
       console.log(key)
      };

    return (
        <>
          {location.pathname === '/producto'?
           (
            <>
                <AddProductForm fetchProducts={fetchProducts} />
                <ProductsFilter />
                <Table style={{marginBlock: '1rem'}} loading={loading} dataSource={products} columns={columns} pagination={false} /> 
                <Pagination total={total} pageSize={limit} current={currentPage} onChange={(handlePage)} />
                <Modal 
                  title="Detalles del producto" 
                  open={isModalVisible} 
                  onCancel={() => setIsModalVisible(false)}
                  footer={
                    view === 'detail' ? (
                      <Button type="primary" onClick={() => setIsModalVisible(false)}>
                        Ok
                      </Button>
                    ) : null
                  }
                  >
                  {currentProduct && <ProductDetail product={currentProduct} view={view} setView={setView}/>}
                </Modal>
                
            </>
           )

           : 

           <Outlet/>}  
        </>
    )

}

export default Product;