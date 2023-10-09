import React, { useState, useEffect} from "react";
import { Table, Button, Pagination, Modal, Tooltip, Form } from "antd";
import { SwapOutlined} from '@ant-design/icons';
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getStoreInventory } from "../../api/store";

export const StoreStock = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [total, setTotal] = useState(0)
    const [changedPage, setChangedPage] = useState(false);
    const location = useLocation();

    const columns = [
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
            key: 'quantity' 
        },
        {
            title: 'Acciones',
            key:'acciones',
            dataIndex: 'key',
            render: (key) => (
                <span>
                  <Tooltip title='Transferir a otra tienda' ><SwapOutlined style={{ color: 'blue', marginRight:'5px' }} onClick={() => handleTransfer(key)} /></Tooltip>
                </span>
            )
        }
    ];
      useEffect(() => {
        fetchProducts()
      }, [])
      const selectedStore = localStorage.getItem('selectedStore')? 
      JSON.parse(localStorage.getItem('selectedStore')) 
      : 
      null;
      const fetchProducts = async () => {
        setLoading(true)
        const response = await getStoreInventory(currentPage, limit, selectedStore.id)
        console.log(response.data)
        
        
        const dataStockTable = response.data.map(item => ({
            key: item.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
        }));
    
        setProducts(dataStockTable); 
        setLoading(false)
    }

      const handlePage = (page) => {
        setCurrentPage(page)
        setChangedPage(true)
      }

      const handleTransfer = (key) => {
        console.log(key)
      };


    return (
        <>
          {location.pathname === '/tienda/inventario'?
           (
            <>
            <h1>Inventario Tienda {selectedStore.name}</h1>
            <Table style={{marginBlock: '1rem'}} loading={loading} dataSource={products} columns={columns} pagination={false} /> 
            <Pagination total={total} pageSize={limit} current={currentPage} onChange={(handlePage)} />
            </>
           )

           : 

           <Outlet/>}  
        </>
    )
}

export default StoreStock;