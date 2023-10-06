import Sidebar from "../../components/Sidebar/sidebar"
import AppHeader from "../../components/Header/header";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react'

export const Page = ({children}) => {
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
                { children}
            </div>
          </div>
        </div>
    )
}

export default Page;