import { useEffect, useState } from "react";
import AppHeader from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import { Layout } from 'antd'
import { useNavigate } from "react-router-dom";
import photo from '../../assets/profile-photo.jpg'

const { Content } = Layout;

export const Dashboard = () => {
    const navigate = useNavigate();
  
  
      const [visible, setVisible] = useState(false);
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    
      const showDrawer = () => {
        setVisible(true);
      };

      const onClose = () => {
        setVisible(false);
      };
    
      useEffect(() => {
        const handleResize = () => {
          setWindowWidth(window.innerWidth);
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
    

        
      

    const handleNavigation = (path) => {
        navigate(path);
        console.log(user)
    };

    return (
        <div style={{ display: 'flex' }}>
          <Sidebar 
            onNavigate={handleNavigation} 
            style={{ flex: 1 }}
            windowWidth={windowWidth}
            showDrawer={showDrawer} 
            onClose={onClose}
            visible={visible}
            />
          <div style={{ flex: 5, display: 'flex', flexDirection: 'column' }}>
            <AppHeader 
              showDrawer={showDrawer}
              windowWidth={windowWidth} 
              />
            <div style={{ flex: 1, boxShadow: '0px 0px 5px rgba(0,0,0,0.5) inset', padding: '20px' }}>

            </div>
          </div>
        </div>
      );
};


  