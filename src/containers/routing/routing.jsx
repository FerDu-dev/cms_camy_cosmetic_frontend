import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { HomePage } from '../../pages/Home/HomePage';
import { useState } from 'react';
import { ModalNotLogin } from '../../components/Modals/Modals';
import PrivateRoute from './private-routes';

export const Routing = () => {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const location = useLocation();

    return (
        <>
            <ModalNotLogin showModal={showModal} handleClose={handleClose} />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/home/*" element={<PrivateRoute><HomePage /></PrivateRoute>} />
            </Routes> 
        </>
    )
}

