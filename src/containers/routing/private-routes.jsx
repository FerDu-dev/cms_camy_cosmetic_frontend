import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  if (!localStorage.getItem('token_user')) {
    navigate('/login', { replace: true });
    return null;
  }

  return children;
};

export default PrivateRoute;





