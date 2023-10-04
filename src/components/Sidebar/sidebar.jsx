import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { UserOutlined, HomeOutlined, KeyOutlined, TableOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-makeup.webp'

const { Sider } = Layout;

const Sidebar = ({windowWidth, showDrawer, onClose, visible}) => {
 

 

  return (
    <div>
     
      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={visible}
      >
        <Menu theme="white" mode="inline" defaultSelectedKeys={["1"]} style={{height:"100vh", backgroundColor:"#FAEBD7"}}>
        <div className='logo-container'>
          <img src={logo} width='100' height='100'/>
        </div>
          <Menu.SubMenu key="sub1" icon={<TableOutlined />} title="Tienda">
            <Menu.Item key="1">
            <Link style={{textDecoration:"none", color:"black"}} to="/table-products">Inventario</Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link style={{textDecoration:"none", color:"black"}} to="/sales">Ventas</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon={<UserOutlined />} title="Profiles">
            <Menu.Item key="3">My profile</Menu.Item>
            <Menu.Item key="4">Employee</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub1" icon={<SettingOutlined />} title="Configuracion">
            <Menu.Item key="1">
            <Link style={{textDecoration:"none", color:"black"}} to="/product-brands">Inventario</Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link style={{textDecoration:"none", color:"black"}} to="/product-types">Ventas</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Drawer>
      {windowWidth > 768 && (
      <Sider  style={{height:"100vh"}}>
      <Menu  mode="inline" defaultSelectedKeys={["1"]} style={{height:"100vh", backgroundColor:"#FAEBD7"}}>
        <div className='logo-container'>
          {/* <img src={logo} width='100' height='100'/> */}
          <h3 style={{color:"#FFB6C1", fontWeight:"bold", padding:"5px"}}>Camy makeup</h3>
        </div>
          <Menu.Item key="1" icon={<TableOutlined />}>
            <Link style={{textDecoration:"none"}} to="/table-products">Inventario</Link>
          </Menu.Item>
          {/* <Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="Tienda">
            <Menu.Item key="1">
              <Link style={{textDecoration:"none"}} to="/table-products">Inventario</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link style={{textDecoration:"none"}} to="/sales">Ventas</Link>
            </Menu.Item>
          </Menu.SubMenu> */}
          <Menu.SubMenu key="sub2" icon={<UserOutlined />} title="Profiles">
            <Menu.Item key="3">My profile</Menu.Item>
            <Menu.Item key="4">Employee</Menu.Item>
          </Menu.SubMenu>

          <Menu.SubMenu key="sub3" icon={<SettingOutlined />} title="Configuracion">
            <Menu.Item key="6">
            <Link style={{textDecoration:"none", color:"black"}} to="/product-brands">Marcas</Link>
            </Menu.Item>
            <Menu.Item key="7">
            <Link style={{textDecoration:"none", color:"black"}} to="/product-types">Prductos</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
        
        )}
    </div>
  );
};

export default Sidebar;





