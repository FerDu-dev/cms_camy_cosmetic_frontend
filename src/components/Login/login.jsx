import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Alert } from 'antd';
import './login.css';
import logo from '../../assets/logo-makeup.webp'
import { emptyFields } from '../../helpers/constantFunctions';
import { login, verifyAdmin } from '../../api/auth';
import { useNavigate } from 'react-router-dom/dist';

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [validation, setValidation] = useState({email: false, password: false});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const verifyAdminUser = async () => {
            const adminUser = await verifyAdmin();
            console.log(adminUser);
        }
        verifyAdminUser();
    }, []);

    useEffect(() => {
        const fieldsAreValid = emptyFields({ email, password });
        setIsButtonDisabled(!fieldsAreValid);
        if (submitted) {
            setValidation({email: !email, password: !password});
        }
    }, [email, password, submitted]);

    const handleSubmit = async (event) => {
        setSubmitted(true);
        if (!isButtonDisabled) {
            try {
                const user = await login({ email, password });
                navigate('/home');
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    return (
     <>
        <div className='login-container'>
            <Form className='form-container' onFinish={handleSubmit}>
            <div className='logo-container'>
                <img src={logo} width='100' height='100'/>
            </div>
                <section>
                    <h1 style={{fontSize:"24px"}} >Login</h1>
                    <p>Iniciar sesión en su cuenta</p>
                </section>
                <Form.Item validateStatus={validation.email ? 'error' : ''} help={validation.email ? 'Please, enter the email' : ''}>
                    <Input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item validateStatus={validation.password ? 'error' : ''} help={validation.password ? 'Please, enter the password' : ''}>
                    <Input.Password type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>

                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}

                <Button type="primary" htmlType="submit" disabled={isButtonDisabled}>
                    Iniciar sesión
                </Button>
            </Form>
        </div>
     </>
    );
}

export default Login;

