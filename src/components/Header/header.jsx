import { Layout, Tooltip, Dropdown, Menu } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuOutlined } from "@ant-design/icons";
import './header.css'

const text = <span>Cerrar sesion</span>;
const textTienda = <span>Cambiar Tienda</span>;
const { Header } = Layout;

export const AppHeader = ({showDrawer, windowWidth}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const handleStoreChange = (e) => {
   
    console.log(e)
  };

  const storeMenu = (
    <Menu onClick={handleStoreChange}>
      <Menu.Item key="store1">Tienda 1</Menu.Item>
      <Menu.Item key="store2">Tienda 2</Menu.Item>
      <Menu.Item key="store3">Tienda 3</Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ height: '74px', backgroundColor: '#FAEBD7', display: 'flex', justifyContent: 'flex-end' }}>
      {windowWidth <= 768 && (
        <MenuOutlined style={{ color: 'black', fontSize: '20px', marginRight:"2rem" }} onClick={showDrawer}/>
      )}
      <Tooltip placement="bottom" title={textTienda}> 
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





