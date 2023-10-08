import { useState, useEffect } from "react";
import { Menu, Modal, Form, Input , Upload, Button, Select} from "antd";
import { createStore } from "../../api/store";
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

export const AddStoreInMenu = () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [estate, setEstate] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [picture, setPicture] = useState(null)

    const handleSubmitStore = async () => {
        const data = {
            name,
            city,
            estate,
            address
        }
        if (picture) data.picture = picture
        const response = await createStore(data)
        console.log(response)
        handleClose()
    }

    const handleUpload = ({ fileList }) => {
        const file = fileList[0].originFileObj;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const base64Image = reader.result;
          const [prefix, file_string] = base64Image.split(',');
          const [firstPart] = prefix.split(';');
          const [_, file_extension] = firstPart.split('/');
          if (['png', 'jpeg', 'jpg', 'svg'].includes(file_extension)) {
            const file_name = 'image';
            setPicture({ file_string, file_name, file_type: file_extension });
          } else {
            alert('Formato de imagen no válido. Por favor, sube una imagen PNG, JPEG, JPG o SVG.');
          }
        };
      };


    const handleClose = () => {
        setOpen(false)
        setName('')
        setEstate('')
        setCity('')
        setAddress('')
        setPicture(null)
    }
    return (
        <>
            <Menu.Item 
                style={{display: 'flex', gap: '1rem', cursor: 'pointer'}}
                onClick={() => setOpen(true)}
            >
                <PlusOutlined /> Agregar Tienda
            </Menu.Item>
            <Modal
                title='Agregar Tienda'
                open={open}
                onOk={handleSubmitStore}
                onCancel={handleClose}
                destroyOnClose={true}
                confirmLoading={loading}
            >
                <Form
                    onFinish={handleSubmitStore}
                    preserve={false}
                >
                <Form.Item
                    label='Nombre de la Tienda'
                >
                    <Input placeholder="nombre" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item label='Estado'>
                    <Input placeholder="Estado" value={estate} onChange={(e) => setEstate(e.target.value)} />
                </Form.Item>
                <Form.Item label='Ciudad'>
                    <Input placeholder="Ciudad" value={city} onChange={(e) => setCity(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label='Direccion'
                >
                    <Input placeholder="direccion" value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Item>
                <Form.Item>
                    <Upload accept="image/*" beforeUpload={() => false} onChange={handleUpload} maxCount={1}>
                    <Button  icon={<UploadOutlined />}>Subir imagen</Button>
                    </Upload>
                </Form.Item>
                </Form>

            </Modal>
        </>
    )
}

export default AddStoreInMenu;