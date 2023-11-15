import React, { useState, useEffect} from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined, PlusCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import AddProductForm from "../../components/AddProductsForm/add-product-form";
import ProductsFilter from "../../components/ProductsFilter/products-filter";
import ProductDetail from "../../components/ProductDetail";
import ProductEdit from "../../components/ProductEdit";
import AddProductToStore from "../../components/AddProductToStore";
import { AddVariantForm } from "../../components/AddVariantForm";
import { getProducts } from "../../api/products";
import { Table, Button, Pagination, Modal, Tooltip, Form } from "antd";
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
    const [isModalAddToStore, setIsModalAddToStore] = useState(false)
    const [isModalEdit, setIsModalEdit] = useState(false)
    const [currentProduct, setCurrentProduct] = useState(null);
    const [areVariantProducts, setAreVariantProducts] = useState(false)
    const [search, setSearch] = useState('');
    const [productTypeFilter, setProductTypeFilter] = useState(null)
    const [brandFilter, setBrandFilter] = useState(null)
    const [isModalAddVariant, setIsModalAddVariant] = useState(false)
    const [priceFilter, setPriceFilter] = useState({
      price: null,
      range: 'greater',
    })
    const [view, setView] = useState('detail');
    const [form] = Form.useForm();
    const [productEdited, setProductEdited] = useState(false);
    const { confirm } = Modal
    const user = JSON.parse(localStorage.getItem('user'))
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
              <Tooltip title='Ver detalle'><EyeOutlined style={{ color: 'blue', marginRight:'5px' }} onClick={() => handleView(key)} /></Tooltip>
              {
                user.role == 0 && (<>

              <Tooltip title='Editar producto'>  <EditOutlined style={{ color: 'green', marginRight:'5px' }} onClick={() => handleEdit(key)} /></Tooltip>
              {/* <DeleteOutlined style={{ color: 'red' , marginRight:'5px'}} onClick={() => handleDelete(key)} /> */}
              <Tooltip title='Agregar producto a tienda'><PlusOutlined style={{cursor: 'pointer', marginInline:'2px'}} onClick={() => handleAddToStore(key)} /></Tooltip>
              <Tooltip title='Agregar variante'><PlusCircleOutlined style={{cursor: 'pointer', marginInline:'2px'}} onClick={() => handleAddVariant(key)} /></Tooltip>
                </>)
              }
            </span>
          )
        }
        
        
      ];

      useEffect(() => {
        
        fetchProducts()
      }, [])

      useEffect(() => {
        if (changedPage) {
            fetchProducts()
            setChangedPage(false)
        }
    }, [changedPage])

      const fetchProducts = async () => {
        setLoading(true)
        const filters = {};
        if (search) filters.search = search;
        if (brandFilter) filters.brand_filter = brandFilter
        if (productTypeFilter) filters.product_type_filter = productTypeFilter;
        if (priceFilter.price) filters.priceFilter = JSON.stringify(priceFilter);
        console.log(filters)
        const response = search || brandFilter || productTypeFilter || priceFilter.price ?  
        await getProducts(limit, currentPage, filters)
        :
        await getProducts(limit, currentPage)
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

    
      const handleView = (key) => {
        const product = products.find(product => product.key === key);
        setCurrentProduct(product);
        setIsModalVisible(true);
      };

      const handleEdit = (key) => {
        const product = products.find(product => product.key === key);
        setCurrentProduct(product);
        setIsModalEdit(true);
      };

      const handleAddToStore = (key) => {
        const product = products.find(product => product.key === key);
        setCurrentProduct(product);
        setIsModalAddToStore(true);
      } 
      
      const handleDelete = (key) => {
        const product = products.find(product => product.key === key);
        confirm({
          title: 'Estas seguro de eliminar este producto?',
          icon: <ExclamationCircleFilled />,
          content: <span>Producto: {product.name}</span>,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log("key de eliminar",key);
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };

      const handleAddVariant = (key) => {
        const product = products.find(product => product.key === key);
        console.log("product en variante:",product)
        setCurrentProduct(product);
        setIsModalAddVariant(true);
      };

      

    return (
        <>
          {location.pathname === '/producto'?
           (
            <>
               { user.role == 0 && <AddProductForm fetchProducts={fetchProducts} /> } 
                <ProductsFilter 
                  areVariantProducts={areVariantProducts}
                  setAreVariantProducts={setAreVariantProducts}
                  search={search}
                  setSearch={setSearch}
                  productTypeFilter={productTypeFilter}
                  setProductTypeFilter={setProductTypeFilter}
                  brandFilter={brandFilter}
                  setBrandFilter={setBrandFilter}
                  priceFilter={priceFilter}
                  setPriceFilter={setPriceFilter}
                  fetchProducts={fetchProducts}
                />
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
                <Modal 
                  title="Agregar variante de producto" 
                  visible={isModalAddVariant} 
                  onCancel={() => setIsModalAddVariant(false)}
                  footer={null}
                >
                  {currentProduct && 
                    <AddVariantForm 
                      product={currentProduct} 
                    />
                  }
                </Modal>
                <Modal 
                  title="Editar producto" 
                  open={isModalEdit} 
                  onCancel={() => setIsModalEdit(false)}
                  footer={
                      <Button type="primary" 
                      onClick={() => { 
                        form.submit(); 
                        setIsModalEdit(false); 
                        
                        }}>
                        Guardar
                      </Button>
                  }
                >
                  {currentProduct && 
                    <ProductEdit 
                      product={currentProduct} 
                      form={form} 
                      onProductEdited={() => setProductEdited(true)} />
                  }
                </Modal>

                <Modal 
                  title="Agrega este producto a una tienda" 
                  open={isModalAddToStore} 
                  onCancel={() => {
                    setIsModalAddToStore(false);
                    form.resetFields();
                  }}
                  okText="Agregar"
                  footer={null}
                  >
                  {currentProduct && 
                  <AddProductToStore  
                      product={currentProduct} 
                      setIsModalAddToStore={setIsModalAddToStore} 
                      form={form}
                      />
                  }
                </Modal>
                
            </>
           )

           : 

           <Outlet/>}  
        </>
    )

}

export default Product;