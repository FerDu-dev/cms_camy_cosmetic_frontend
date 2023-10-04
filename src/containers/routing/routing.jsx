import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { HomePage } from '../../pages/Home/HomePage';
import { useState } from 'react';
import { ModalNotLogin } from '../../components/Modals/Modals';



export const Routing = () => {
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);
    const location = useLocation();

   

    return (
        <>
            <ModalNotLogin showModal={showModal} handleClose={handleClose} />
            {location.pathname !== '/login' ? (
                <HomePage />
            ) : (
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            )}
        </>
    )
}
