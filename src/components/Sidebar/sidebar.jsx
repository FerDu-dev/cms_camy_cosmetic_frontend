import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, Drawer } from "antd";
import { UserOutlined, HomeOutlined, KeyOutlined, TableOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import logo from '../../assets/logo-makeup.webp'
import { routes } from "../../containers/routing/routing";
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
        
          {
            routes.filter(route => route.menu).map((route, index) => (
              route.children?
                <Menu.SubMenu key={`sub${index}`} icon={route.icon? route.icon : null} title={route.title}>
                  {
                    route.children.map(child => (
                      child.childrenElement?
                      child.childrenElement
                      :
                      <Menu.Item key={'path'}>
                        <Link style={{textDecoration:"none", color:"black"}} to={`${route.path}/${child.path}`}>{child.title}</Link>
                      </Menu.Item>
                    ))
                  }
                </Menu.SubMenu>
              :
              <Menu.Item key={`sub${index}`} icon={route.icon? route.icon : null}>
              <Link style={{textDecoration:"none",  color:"black"}} to={`${route.path}`}>{route.title}</Link>
              </Menu.Item> 
            ))
          }
        </Menu>
      </Drawer>
      {windowWidth > 768 && (
      <Sider  style={{height:"100vh"}}>
      <Menu  mode="inline" defaultSelectedKeys={["1"]} style={{height:"100vh", backgroundColor:"#FAEBD7"}}>
        <div className='logo-container'>
         
          <h3 style={{color:"#FFB6C1", fontWeight:"bold", padding:"5px"}}>Camy makeup</h3>
        </div>
        {
            routes.filter(route => route.menu).map((route, index) => (
              route.children && route.haveSubMenu?
                <Menu.SubMenu key={`sub${index}`} icon={route.icon? route.icon : null} title={route.title}>
                  {
                    route.children.map(child => (
                      child.childrenElement?
                      child.childrenElement
                      :
                      <Menu.Item key={'path'}>
                        <Link style={{textDecoration:"none", color:"black"}} to={`${route.path}/${child.path}`}>{child.title}</Link>
                      </Menu.Item>
                    ))
                  }
                </Menu.SubMenu>
              :
              <Menu.Item key={`sub${index}`} icon={route.icon? route.icon : null}>
              <Link style={{textDecoration:"none",  color:"black"}} to={`${route.path}`}>{route.title}</Link>
              </Menu.Item>   
            ))
          }
        </Menu>
      </Sider>
        
        )}
    </div>
  );
};

export default Sidebar;





