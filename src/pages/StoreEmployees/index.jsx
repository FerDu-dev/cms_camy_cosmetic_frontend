import React, {useEffect, useState} from "react";
import { Table, Pagination } from "antd";
import { getUsersFromStore } from "../../api/store";
export const StoreEmployees = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [changedPage, setChangedPage] = useState(false)
    const [limit, setLimit] = useState(6)
    const [total, setTotal] = useState(0)


    const columns = [
        
        {
            title: 'Nombre y Apellido',
            dataIndex: 'first_name',
            key: 'first_name', 
        },
        {
            title: 'Correo',
            dataIndex: 'email',
            key: 'email',
            
        },
        {
            title: 'Cedula',
            dataIndex: 'identification_document',
            key: 'identification_document',
        },
        {
            title: 'Telefono',
            dataIndex: 'phonenumber',
            key: 'phonenumber'
        },
    
    ]
    const selectedStore = localStorage.getItem('selectedStore')? 
        JSON.parse(localStorage.getItem('selectedStore')) 
        : 
        null;
    const fetchUsers = async () => {
        setLoading(true)
        const response = await getUsersFromStore(selectedStore.id)
        console.log(response)
        setUsers(response.data.map(user => ({ ...user, key: user.id, first_name: `${user.first_name} ${user.last_name}`})))
        setTotal(response.total)
        setLoading(false)
    }

    const handlePage = (page) => {
        setCurrentPage(page)
        setChangedPage(true)
      }

      useEffect(() => {
        fetchUsers()
    }, [])

    useEffect(() => {
        if (changedPage) {
            fetchUsers()
            setChangedPage(false)
        }
    }, [changedPage])

    return (
        <>
            <Table dataSource={users} columns={columns} loading={loading} pagination={false} />
            <Pagination total={total} pageSize={limit} current={currentPage} onChange={handlePage} />
        </>
    )
}

export default StoreEmployees;