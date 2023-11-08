import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAdmin = false }) => {
  const navigate = useNavigate();
  if (!localStorage.getItem('token_user')) {
    localStorage.clear()
    navigate('/login', { replace: true });
    return null;
  }
  if (isAdmin) {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user.role == 1) {
      navigate('/tienda')
    } 
  }
  return children;
};

export default PrivateRoute;





