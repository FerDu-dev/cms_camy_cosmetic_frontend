import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { HomePage } from '../../pages/Home/HomePage';
import { SalesPage } from '../../pages/SalesPage/sales-page';
import { SettingsPage } from '../../pages/SettingsPage';
import AddStoreInMenu from '../../components/AddStoreInMenu';
import BrandSetting from '../../pages/BrandSetting/BrandSetting';
import ProductTypeSetting from '../../pages/ProductTypeSetting/ProductTypeSetting';
import Product from '../../pages/Product';
import StorePage from '../../pages/StorePage';
import StoreEmployees from '../../pages/StoreEmployees';
import StoreSales from '../../pages/StoreSales';
import StoreStock from '../../pages/StoreStock';
import StoreConfiguration from '../../pages/StoreConfiguration';
import { Users } from '../../pages/Users';
import UserDetail from '../../components/UserDetail';
import GenerateSaleForm from '../../pages/GenerateSale';
import { HistoryProductTransfer } from '../../pages/HistoryProductTransfer';

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ModalNotLogin } from '../../components/Modals/Modals';
import PrivateRoute from './private-routes';
import Page from '../Page/Page';
import { UserOutlined, HomeOutlined, KeyOutlined, TableOutlined, SettingOutlined, ShopOutlined } from "@ant-design/icons";

const selectedStore = localStorage.getItem('selectedStore')
export const routes = [
    {
        path: '/login',
        element: <LoginPage />,
        
    },
    {
        path: '/producto',
        title: 'Producto',
        icon: <TableOutlined />,
        menu: true,
        element: <PrivateRoute><Page><Product /></Page></PrivateRoute>
    },
    {
        path: '/tienda',
        title: 'Tienda',
        icon: <ShopOutlined />,
        menu: true,
        haveSubMenu: true,
        element: <PrivateRoute><Page><StorePage/></Page></PrivateRoute>,
        children : [
            {
                title: 'Inventario',
                path: 'inventario',
                element: <StoreStock/>,
                subMenu: selectedStore,
            },
            {
                title: 'Ventas',
                path: 'ventas',
                element: <StoreSales />,
                subMenu:selectedStore,
            },
            {
                title: 'Generar Ventas',
                path: 'generar-venta',
                element: <GenerateSaleForm />,
                subMenu:selectedStore,
            },
            {
                title: 'Empleados',
                path: 'empleados',
                element: <StoreEmployees />,
                justAdmin: true,
                subMenu: selectedStore,
            },
            {
                title: 'Configuracion',
                path: 'configuracion',
                justAdmin: true,
                element: <StoreConfiguration/>,
                subMenu: selectedStore,
            },
            {
                title: 'Historial Productos Transferidos',
                path: 'historial-productos-transferidos',
                justAdmin: true,
                element: <HistoryProductTransfer/>,
                subMenu: selectedStore,
            },
            {
                title: 'Anadir Tienda',
                notRouting: true,
                justAdmin: true,
                subMenu: true,
                childrenElement: <AddStoreInMenu />
            }
        ]
        
    },
    {
        title: 'Configuracion',
        icon: <SettingOutlined />,
        menu: true,
        haveSubMenu: true,
        justAdmin: true,
        element: <PrivateRoute><Page><SettingsPage /></Page></PrivateRoute>,
        path: '/configuracion',
        children: [
            {
                title: 'Marca',
                path: 'marca',
                justAdmin: true,
                element: <PrivateRoute> <BrandSetting /></PrivateRoute>,
                subMenu: true,
                index: true,
            }, 
            {
                title: 'Tipo Producto',
                path: 'tipo_producto',
                subMenu: true,
                justAdmin: true,
                element: <PrivateRoute> <ProductTypeSetting /></PrivateRoute>
            }
        ]
    },
    {
        path: '/usuario',
        icon: <UserOutlined />,
        title: 'Usuarios',
        justAdmin: true,
        menu: true,
        element:<PrivateRoute><Page> <Users /></Page></PrivateRoute>,
        children: [
            {
                path: ':userID',
                element: <UserDetail />
            }
        ]
    },
]


export const Routing = () => {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const location = useLocation();

    return (
        <>
                        
            <ModalNotLogin showModal={showModal} handleClose={handleClose} />
            <Routes>
                {
                    routes.map(route => (
                        route.children && route.children.length? 
                        
                            <Route path={route.path} element={route.element}>
                                { 
                                    route.children.filter(child => !child.notRouting).map(routeChild => (
                                    <Route 
                                        path={routeChild.path} 
                                        element={routeChild.element} 
                                        
                                        />
                                    ))
                                }
                            </Route>
                        
                        :
                        <Route path={route.path} element={route.element} />
                    ))
                }
                {/* <Route path="/login" element={<LoginPage />} />
                <Route path="/home/*" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                <Route path="table-products" element={<ProductsTablePage />} />
                <Route path="/sales" element={<PrivateRoute><SalesPage /></PrivateRoute>} />
                <Route path="/product-brands" element={<PrivateRoute><BrandForm /></PrivateRoute>} />
                <Route path="/product-types" element={<PrivateRoute><ProductTypeForm /></PrivateRoute>} /> */}
            </Routes> 
        </>
    )
}

