import React, {useEffect, useState } from "react";
import { Form, Button, Input } from "antd";
import { updateStore } from "../../api/store";

export const StoreConfiguration = () => {
    const [form] = Form.useForm()
    const selectedStore = localStorage.getItem('selectedStore')? 
        JSON.parse(localStorage.getItem('selectedStore')) 
        : 
        null;

    const handleSubmit = async (values) => {
        console.log(values)
        const response = await updateStore({
            ...values, id: selectedStore.id
        })
        localStorage.setItem('selectedStore', JSON.stringify(response.data))
    }

    const resetForm = () => {
        window.location.reload();
    }

    return (
        <>
            <Form
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                initialValues={{
                    name: selectedStore? selectedStore.name : '',
                    estate: selectedStore? selectedStore.estate : '',
                    city: selectedStore ? selectedStore. city : '',
                    address: selectedStore? selectedStore.address : '',
                }}
            >
                <Form.Item
                    label='Nombre de la tienda'
                    name='name'
                >   
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Estado'
                    name='estate'
                >   
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Ciudad'
                    name='city'
                >   
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Direccion'
                    name='address'
                >   
                    <Input />
                </Form.Item>
                <div style={{display: 'flex', gap: '1rem'}}>
                    <Button onClick={() => resetForm()}>
                        Resetear
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>

                </div>

            </Form>    
        </>
    )
}

export default StoreConfiguration;