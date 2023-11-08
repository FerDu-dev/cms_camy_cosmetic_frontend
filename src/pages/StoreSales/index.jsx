import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Pagination, Tooltip } from 'antd';
import SaleDetailModal from '../../components/SaleDetailModal';
import ProductsFilter from '../../components/ProductsFilter/products-filter';
import { Outlet, json, useLocation } from 'react-router-dom';
import { getProducts } from '../../api/products';
import SalesFilter from '../../components/SalesFilter';
import { getSales } from '../../api/sales';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment'
import SaleDetail from '../../components/SaleDetailModal';

export const StoreSales = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const [products, setProducts] = useState([]); 
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [saleDetails, setSaleDetails] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalProducts, setTotalProducts] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const limit = 10; 
    const [changedPage, setChangedPage] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [search, setSearch] = useState('')
    const [justDate, setJustDate] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [filterDates, setFilterDates] = useState(false)
    const [total, setTotal] = useState(0)
    const [productTypeFilter, setProductTypeFilter] = useState(null)
    const [brandFilter, setBrandFilter] = useState(null)
    const [priceFilter, setPriceFilter] = useState({
      price: null,
      range: 'greater',
    })

    const columns = [
      {
        title: 'Nombre del comprador',
        dataIndex: 'buyerName',
        key: 'buyerName',
      },
      {
        title: 'Telefono del comprador',
        dataIndex: 'buyerPhone',
        key: 'buyerPhone',
      },
      {
        title: 'Precio',
        dataIndex: 'amount',
        key: 'amount' 
      },  
      {
        title: 'Descuento',
        dataIndex: 'discount',
        key: 'discount',
      },
      {
        title: 'Fecha de Venta',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: createdAt => moment(createdAt).locale('es').format('DD MMM, YYYY')
      },
      {
        title: 'Acciones',
        key:'acciones',
        dataIndex: 'key',
        render: (key) => (
          <span style={{display:"flex", justifyContent:"center"}}>
            <Tooltip title='Ver detalle'><EyeOutlined style={{ color: 'blue', marginRight:'5px' }} onClick={() => handleView(key)} /></Tooltip>          
          </span>
        )
      }
      
      
    ];

    const selectedStore = localStorage.getItem('selectedStore')? 
    JSON.parse(localStorage.getItem('selectedStore')) 
    : 
    null;
    
    useEffect(() => {
      fetchProducts();
    }, []);
  
    useEffect(() => {
      if (changedPage) {
        fetchProducts();
      }
    }, [changedPage]);
    
    
    const fetchProducts = async () => {
        
        setLoading(true)
        const filters = search || justDate || endDate ? {} : null;
        if (search) filters.search = search
        if (filterDates) {
          if (justDate) filters.justDate = moment(justDate).format('YYYY-MM-DD');
          if (startDate && endDate) {
            filters.startDate = moment(startDate).format('YYYY-MM-DD');
            filters.endDate = moment(endDate).format('YYYY-MM-DD');
          }
        }
        const response = await getSales(limit, currentPage, selectedStore.id, filters)
      
        console.log(response.data)
        setProducts(response.data.map(product => (
          { ...product, key: product.id}
        )))
        console.log(products)
        setTotal(response.total)
        setLoading(false)
      };
    
      const handleProductSelect = (product, checked) => {
        if (checked) {
          setSelectedProducts(prevProducts => [...prevProducts, product]);
        } else {
          setSelectedProducts(prevProducts => prevProducts.filter(p => p.id !== product.id));
        }
      };
  
   
    const handleGenerateSale = () => {
        setSaleDetails(selectedProducts);
      };
  
   
      const handlePageChange = (page) => {
        setCurrentPage(page);
        setChangedPage(true);
      };

      const handleView = (key) => {
        const product = products.find(product => product.key === key);
        setCurrentProduct(product);
        setIsModalVisible(true);
      };
    
    
    return (
        <>
         {location.pathname === '/tienda/ventas'?
           (
          <>
          <Button type="primary" style={{marginBottom:"0.5rem"}} onClick={handleGenerateSale}>Generar Venta</Button>
            <h3 style={{marginTop:"1rem"}}>Ventas</h3>
            <SalesFilter 
              search={search} 
              setSearch={setSearch} 
              justDate={justDate} 
              setJustDate={setJustDate} 
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              fetchSales={fetchProducts}
              filterDates={filterDates}
              setFilterDates={setFilterDates}
              />
            <Table style={{marginBlock: '1rem'}} loading={loading} dataSource={products} columns={columns} pagination={false} /> 
            <Pagination current={currentPage} onChange={handlePageChange} total={totalProducts} pageSize={limit} />
            <Modal 
              title="Detalles de la venta" 
              open={isModalVisible} 
              onCancel={() => setIsModalVisible(false)}
              footer={
                  <Button type="primary" onClick={() => setIsModalVisible(false)}>
                    Cerrar
                  </Button>
              }
              >
              {currentProduct && <SaleDetail sale={currentProduct} />}
            </Modal>
          </>
           )
           :
           
           <Outlet/>}
        </>
      );
}

export default StoreSales;  