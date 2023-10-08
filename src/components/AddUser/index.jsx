import { useState } from "react";
import { Button, Form, Input, Upload, Select, Modal } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { createUser } from "../../api/user";

export const AddUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [role, setRole] = useState(null)
    const [identification_document, setIdentificationNumber] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [storeID, setStoreID] = useState(null)
    const [storeOptions, setStoreOptions] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
      };
    
    const handleClose = () => {
        setIsModalVisible(false)
        cleanInputs()
    }

    const cleanInputs = () => {
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setFirstName('')
        setLastName('')
        setRole(null)
        setIdentificationNumber('')
        setPhonenumber('')
        setStoreID(null)
    }

    const handleUserSubmit = async () => {
        if ( password !== confirmPassword ) {
            console.log('wrong password')
        }
        const data = {
            email,
            password,
            first_name,
            last_name,
            role,
            identification_document,
            phonenumber,
        }
        if (storeID) data.storeID = storeID
        const response = await createUser(data)
        handleClose()

    }

    return (<>
        <Button type="primary" onClick={showModal}>
            Agregar usuario
        </Button>
        <Modal 
                title="Agregar Usuario" 
                open={isModalVisible} 
                onOk={handleUserSubmit} 
                onCancel={handleClose}
                okButtonProps={{ disabled: loading }}
                destroyOnClose={true}
                confirmLoading={loading}
                >
                <Form onFinish={handleUserSubmit} preserve={false}>
                <Form.Item label='Correo'>
                    <Input  placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item label='Nombre'>
                    <Input  placeholder="Nombre" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Item>
                <Form.Item label='Apellido'>
                    <Input  placeholder="Apellido" value={last_name} onChange={(e) => setLastName(e.target.value)} />
                </Form.Item>
                <Form.Item  label='Cedula'>
                    <Input placeholder="Cedula" value={identification_document} onChange={(e) => setIdentificationNumber(e.target.value)} />
                </Form.Item>
                <Form.Item label='Numero de Telefono'>
                    <Input  placeholder="Numero de telefono" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
                </Form.Item>
                <Form.Item label='Rol'>
                    <Select 
                        value={role} 
                        onChange={(value) => setRole(value)} 
                    >
                        <Select.Option value={null}>
                            Seleccione un rol
                        </Select.Option>
                        <Select.Option value={1}>
                            Empleado
                        </Select.Option>
                        <Select.Option value={0}>
                            Administrador
                        </Select.Option>
                    </Select>
                </Form.Item>
                {
                    role == 1 ?
                    (
                        <Form.Item label='Tienda'>
                            <Select
                                value={storeID}
                                onChange={(value) => setRole(value)}
                            >
                                <Select.Option value={null}>
                                    Seleccione una tienda
                                </Select.Option>
                                {storeOptions.map(option => (
                                    <Select.Option value={option.value}>
                                        {option.label}
                                    </Select.Option>   
                                ))}
                                
                            </Select>
                        </Form.Item>
                    )
                    :
                    null
                }
                
                <Form.Item label='Contrasena'>
                    <Input label='Contrasena' placeholder="Contrasena" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item label='Confirmar Contrasena'>
                    <Input label='Confirmar Contrasena' placeholder="Confirmar Contrasena" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Item>
                {/* <Form.Item>
                    <Upload accept="image/*" beforeUpload={() => false} onChange={handleUpload} maxCount={1}>
                    <Button  icon={<UploadOutlined />}>Subir imagen</Button>
                    </Upload>
                </Form.Item> */}
                </Form>
            </Modal>
    </>)
}

export default AddUser;