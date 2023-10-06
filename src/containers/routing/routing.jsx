import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { HomePage } from '../../pages/Home/HomePage';
import { SalesPage } from '../../pages/SalesPage/sales-page';
import { SettingsPage } from '../../pages/SettingsPage';
import BrandSetting from '../../pages/BrandSetting/BrandSetting';
import ProductTypeSetting from '../../pages/ProductTypeSetting/ProductTypeSetting';
import Product from '../../pages/Product';
import StorePage from '../../pages/StorePage';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ModalNotLogin } from '../../components/Modals/Modals';
import PrivateRoute from './private-routes';
import Page from '../Page/Page';
import { UserOutlined, HomeOutlined, KeyOutlined, TableOutlined, SettingOutlined } from "@ant-design/icons";

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
        title: 'Configuracion',
        icon: <SettingOutlined />,
        menu: true,
        haveSubMenu: true,
        element: <PrivateRoute><Page><SettingsPage /></Page></PrivateRoute>,
        path: '/setting',
        children: [
            {
                title: 'Marca',
                path: 'marca',
                element: <PrivateRoute> <BrandSetting /></PrivateRoute>,
                subMenu: true,
                index: true,
            }, 
            {
                title: 'Tipo Producto',
                path: 'tipo_producto',
                subMenu: true,
                element: <PrivateRoute> <ProductTypeSetting /></PrivateRoute>
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
                                    route.children.map(routeChild => (
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

