import React from 'react';
import { useContextAuth } from '../../context/AuthContext';
import Register from '../auth/Register';
import SignIn from '../auth/SignIn';
import { Navigate } from 'react-router-dom';
import SpinnerCus from '../feature/Spinner';

const Auth = ({ login }) => {
  const { authState: {loading, isAuthenticated} } = useContextAuth();

  const checkAuth = loading ? <SpinnerCus /> : 
                    isAuthenticated ? <Navigate to={'/dashboard'} /> : 
                    login ? <SignIn /> : <Register />;

  return (
    <>
      <div className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1>Learn It</h1>
            <h4>Keep track of what are you learning</h4>
            {checkAuth}
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth