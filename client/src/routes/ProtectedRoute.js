import { Navigate, Outlet } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useContextAuth } from '../context/AuthContext';
import NavbarMenu from '../components/layout/NavbarMenu';
const ProtectedRoute = () => {
    const { authState, logout } = useContextAuth();

    let main = authState.isAuthenticated ? <>
        <NavbarMenu username={authState.user.username} logout={logout} />
        <Outlet/>
    </> : <Navigate to={'/login'} />;
    let pro = (authState.loading) ? (<>
        <div className="spinner-container">
            <Spinner animation='border' varient='info' />
        </div>
    </>) : main;

    return pro;
}

export default ProtectedRoute