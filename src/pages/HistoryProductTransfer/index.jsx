import React, { useState, useEffect} from "react";
import { Table, Button, Pagination, Modal, Tooltip, Form } from "antd";
import { SwapOutlined} from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getStoreInventory, getProductHistory } from "../../api/store";
import TransferProducts from "../../components/TransferProducts";
import EditQuantityProductInStore from "../../components/EditQuantityProductInStore";
import { useNavigate } from "react-router-dom";

export const HistoryProductTransfer = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [productIDTransfer, setProductID] = useState(null)
    const [productstransfer, setProductsTransfer] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [total, setTotal] = useState(0)
    const [changedPage, setChangedPage] = useState(false);
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'))
    const columns =  [
        {
            title: 'Imagen del producto',
            dataIndex: 'productImage',
            key: 'productImage',
            render: (text, record) => <img src={record.productImage} alt={record.name} style={{width: '50px', height: '50px'}}/>
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Tienda de origen',
            dataIndex: 'originStore',
            key: 'originStore',
        },
        {
            title: 'Tienda de destino',
            dataIndex: 'destinyStore',
            key: 'destinyStore',
        },
        {
            title: 'Cantidad enviada',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Cantidad en origen',
            dataIndex: 'quantityOrigin',
            key: 'quantityOrigin',
        },
        {
            title: 'Cantidad en destino',
            dataIndex: 'quantityDestiny',
            key: 'quantityDestiny',
        },
    ]
  
      const selectedStore = localStorage.getItem('selectedStore')? 
      JSON.parse(localStorage.getItem('selectedStore')) 
      : 
      null;

      const fetchProductsTransfer = async () => {
        setLoading(true)
        
        const productHistory = await getProductHistory(1, 10, selectedStore.id)
        
        const formattedProductHistory = productHistory.data.map(item => ({
            key: item.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantitySend,
            originStore: item.originStore.name,
            destinyStore: item.destinyStore.name,
            quantityOrigin: item.quantityOrigin,
            quantityDestiny: item.quantityDestiny,
            productImage: item.product.main_picture,
        }))
        
        setLoading(false)
       
        setProductsTransfer(formattedProductHistory); 
    }

      const handlePage = (page) => {
        setCurrentPage(page)
        setChangedPage(true)
      }

     

      useEffect(() => {
        fetchProductsTransfer()
      }, [])

      useEffect(() => {
        if (changedPage) {
            fetchProductsTransfer()
            setChangedPage(false)
        }
    }, [changedPage])


    return (
        <>
          {location.pathname === '/tienda/historial-productos-transferidos'?
           (
            <>
            <h1>Inventario Tienda {selectedStore.name}</h1>
            <Button type="primary" style={{marginBottom:"0.5rem"}} onClick={() => navigate('/tienda/inventario')}>Inventario</Button>
            <Table style={{marginBlock: '1rem'}} loading={loading} dataSource={productstransfer} columns={columns} pagination={false} /> 
            <Pagination total={total} pageSize={limit} current={currentPage} onChange={(handlePage)} />
           
            </>
           )

           : 

           <Outlet/>}  
        </>
    )
}

export default HistoryProductTransfer;