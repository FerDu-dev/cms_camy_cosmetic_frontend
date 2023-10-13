import React, { useState, useEffect } from 'react';
import { List, Checkbox, InputNumber, Modal, Button, Pagination, Input } from 'antd';
import SaleDetailModal from '../../components/SaleDetailModal';
import ProductsFilter from '../../components/ProductsFilter/products-filter';
import { Outlet, useLocation } from 'react-router-dom';
import { getProducts } from '../../api/products';


export const StoreSales = () => {
    const [loading, setLoading] = useState(false)
    const location = useLocation();
    const [products, setProducts] = useState([]); 
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [saleDetails, setSaleDetails] = useState(null); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalProducts, setTotalProducts] = useState(0);
    const limit = 10; 
    const [changedPage, setChangedPage] = useState(false);
    const [visible, setVisible] = useState(false)
    const [total, setTotal] = useState(0)
    const [search, setSearch] = useState('');
    const [productTypeFilter, setProductTypeFilter] = useState(null)
    const [brandFilter, setBrandFilter] = useState(null)
    const [priceFilter, setPriceFilter] = useState({
      price: null,
      range: 'greater',
    })
    
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
        setVisible(true);
      };
  
   
      const handlePageChange = (page) => {
        setCurrentPage(page);
        setChangedPage(true);
      };
    
    
    return (
        <>
         {location.pathname === '/tienda/ventas'?
           (
            <>
          <Button onClick={handleGenerateSale}>Generar Venta</Button>
          <ProductsFilter 
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
          <List
            itemLayout="horizontal"
            dataSource={products}
            renderItem={item => (
            <List.Item>
                <Checkbox onChange={() => handleProductSelect(item)}>Seleccionar</Checkbox>
                <List.Item.Meta
                avatar={<img src={item.image} />}
                title={item.name}
                description={item.variant}
                />
                <InputNumber defaultValue={1} min={1} max={10} />
                <InputNumber defaultValue={item.price} min={0} />
            </List.Item>
            )}
             />
            <Pagination current={currentPage} onChange={handlePageChange} total={totalProducts} pageSize={limit} />
          <SaleDetailModal saleDetails={saleDetails} setSaleDetails={setSaleDetails} />
          </>
           )
           :
           
           <Outlet/>}
        </>
      );
}

export default StoreSales;