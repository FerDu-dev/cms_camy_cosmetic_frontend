import { useState, useEffect } from 'react';
import { Layout, Tooltip, Dropdown, Menu } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuOutlined } from "@ant-design/icons";
import { getStores } from '../../api/store';
import './header.css'

const text = <span>Cerrar sesion</span>;
const textTienda = <span>Cambiar Tienda</span>;
const { Header } = Layout;

export const AppHeader = ({showDrawer, windowWidth}) => {
  const [stores, setStores] = useState([])
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  useEffect(() => {
    fetchStores()
  }, [])

  const handleStoreChange = (e) => {
    const selectedStore = stores.filter(store => store.id == e.key)
    if (selectedStore.length) localStorage.setItem('selectedStore', JSON.stringify(selectedStore[0]))
    window.location.reload()
  };

  const fetchStores = async () => {
    const response = await getStores(1, 20);
    setStores(response.data)
    console.log(response)
  }

  const storeMenu = (
    <Menu onClick={handleStoreChange}>
        {
          stores.map(store => (
            <Menu.Item onClick={(e) => handleStoreChange} key={store.id}>
                {`${store.name} - ${store.city}`}
            </Menu.Item>
          ))
        }
    </Menu>
  );

  return (
    <Header style={{ height: '74px', backgroundColor: '#FAEBD7', display: 'flex', justifyContent: 'flex-end' }}>
      {windowWidth <= 768 && (
        <MenuOutlined style={{ color: 'black', fontSize: '20px', marginRight:"2rem" }} onClick={showDrawer}/>
      )}
      <Tooltip placement="left" title={textTienda}> 
      <Dropdown overlay={storeMenu} placement="bottomCenter" trigger={['click']}>
        <ShopOutlined style={{ color: 'black', fontSize: '25px', marginRight:"2rem" }} />
      </Dropdown>
      </Tooltip>
      <Tooltip placement="bottom" title={text}>   
        <LogoutOutlined style={{ color: 'black', fontSize: '20px' }} onClick={handleLogout} />
      </Tooltip>
    </Header>
  );
};

export default AppHeader;





