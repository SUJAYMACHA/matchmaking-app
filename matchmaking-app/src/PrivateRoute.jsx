import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
 
  const user = JSON.parse(localStorage.getItem('currentUser'));


  if (!user) {
    return <Navigate to="/" />;
  }


  return children;
};

export default PrivateRoute;
