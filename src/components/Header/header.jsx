import { Layout, Tooltip } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuOutlined } from "@ant-design/icons";
import './header.css'

const text = <span>Cerrar sesion</span>;
const { Header } = Layout;

export const AppHeader = ({showDrawer, windowWidth}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <Header style={{ height: '74px', backgroundColor: '#FAEBD7', display: 'flex', justifyContent: 'flex-end' }}>
       {windowWidth <= 768 && (
        <MenuOutlined style={{ color: '#fff', fontSize: '20px', marginRight:"2rem" }} onClick={showDrawer}/>
    )}
      <Tooltip placement="bottom" title={text}>   
        <LogoutOutlined style={{ color: 'black', fontSize: '20px' }} onClick={handleLogout} />
      </Tooltip>
    </Header>
  );
};

export default AppHeader;


