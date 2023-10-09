import React,{ useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AddUser from "../../components/AddUser";
import { getUsers } from "../../api/user";
import { Table, Pagination } from "antd";
export const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [changedPage, setChangedPage] = useState(false)
    const [limit, setLimit] = useState(6)
    const [total, setTotal] = useState(0)

    const location = useLocation()

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
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
            render: role => <span>{parseInt(role)? 'Empleado': 'Administrador'}</span>
        }
    
    ]
    
    const callUsers = async () => {
        setLoading(true)
        const response = await getUsers(currentPage, limit)
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
        callUsers()
    }, [])
    
    useEffect(() => {
        if (changedPage) {
            callUsers()
            setChangedPage(false)
        }
    }, [changedPage])

    return (    
        <>
            {
                location.pathname == '/usuario'?
                (<>
                    <AddUser />
                    <Table 
                        style={{marginBlock: '1rem'}} 
                        loading={loading}
                         dataSource={users} 
                         columns={columns} 
                        pagination={false}

                    />
                    <Pagination total={total} pageSize={limit} current={currentPage} onChange={handlePage}/>
                </>)
                :
                <Outlet />
            }
        </>
    )
};

export default Users;