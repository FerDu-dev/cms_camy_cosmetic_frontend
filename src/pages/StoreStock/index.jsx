import React, { useState, useEffect} from "react";
import { Table, Button, Pagination, Modal, Tooltip, Form } from "antd";
import { SwapOutlined} from '@ant-design/icons';
import { Navigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getStoreInventory, getProductHistory } from "../../api/store";
import TransferProducts from "../../components/TransferProducts";
import EditQuantityProductInStore from "../../components/EditQuantityProductInStore";
import { useNavigate } from "react-router-dom";

export const StoreStock = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [productIDTransfer, setProductID] = useState(null)
    const [productVariantIDTransfer, setProductVariantID] = useState(null)
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [total, setTotal] = useState(0)
    const [changedPage, setChangedPage] = useState(false);
    const [openTransfer, setOpenTransfer] = useState(false)
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'))
    const columns = user.role == 0 ? [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price' 
        },
        {
            title: 'Cantidad',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, {quantity, key}) => (
              <EditQuantityProductInStore quantity={quantity} productInStoreID={key} fetchProducts={fetchProducts} />
            ) 
        },
        {
            title: 'Acciones',
            key:'key',
            dataIndex: 'key',
            render: (key) => (
                <span>
                  <Tooltip title='Transferir a otra tienda' ><SwapOutlined style={{ color: 'blue', marginRight:'5px' }} onClick={() => handleTransfer(key)} /></Tooltip>
                </span>
            )
        }
    ] :
    [
      {
          title: 'Nombre',
          dataIndex: 'name',
          key: 'name',
      },
      {
          title: 'Precio',
          dataIndex: 'price',
          key: 'price' 
      },
      {
          title: 'Cantidad',
          dataIndex: 'quantity',
          key: 'quantity',
        
      },
  ]

      const selectedStore = localStorage.getItem('selectedStore')? 
      JSON.parse(localStorage.getItem('selectedStore')) 
      : 
      null;
      const fetchProducts = async () => {
        setLoading(true)
        const response = await getStoreInventory(currentPage, limit, selectedStore.id)
        console.log(response.data)
        
        
        const dataStockTable = response.data.map(item => ({
            ...item ,
            key: item.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            productVariantID: item.productVariantID == 'None' || item.productVariantID == null ? null : item.productVariantID,
        }));
    
        setProducts(dataStockTable); 
        setLoading(false)
        await getProductHistory(1, 10, selectedStore.id)
    }

      const handlePage = (page) => {
        setCurrentPage(page)
        setChangedPage(true)
      }

      const handleTransfer = (key) => {
        const item = products.filter(product => product.key == key)[0]
        setProductID(item.productID)
        setProductVariantID(item.productVariantID)
        setOpenTransfer(true);
      };

      useEffect(() => {
        fetchProducts()
      }, [])

      useEffect(() => {
        if (changedPage) {
            fetchProducts()
            setChangedPage(false)
        }
    }, [changedPage])


    return (
        <>
          {location.pathname === '/tienda/inventario'?
           (
            <>
            <h1>Inventario Tienda {selectedStore.name}</h1>
            <Button type="primary" style={{marginBottom:"0.5rem"}} onClick={() => navigate('/tienda/historial-productos-transferidos')}>Historial Productos Transferidos</Button>
            <Table style={{marginBlock: '1rem'}} loading={loading} dataSource={products} columns={columns} pagination={false} /> 
            <Pagination total={total} pageSize={limit} current={currentPage} onChange={(handlePage)} />
            <TransferProducts
              openTransfer={openTransfer}
              setOpenTransfer={setOpenTransfer}
              fetchProducts={fetchProducts}
              productIDTransfer={productIDTransfer}
              setProductID={setProductID}
              productVariantIDTransfer={productVariantIDTransfer}
              setProductVariantID={setProductVariantID}
             />
              
            </>
           )

           : 

           <Outlet/>}  
        </>
    )
}

export default StoreStock;