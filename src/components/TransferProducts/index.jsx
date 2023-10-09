import React from "react";
import { getStoresFromTransfer, createTransferToOtherStore } from "../../api/store";
import { Modal, Select, Form, Input } from "antd";
import { useState, useEffect } from "react";


export const TransferProducts = ({
    openTransfer, 
    setOpenTransfer, 
    fetchProducts = () => {},
    productIDTransfer,
    setProductID = () => {},
    productVariantIDTransfer = null,
    setProductVariantID = () => {},
    }) => {
    const [store, setStore] = useState(null)
    const [storeOptions, setStoreOptions] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [loading, setLoading] = useState(false);
    const selectedStore = localStorage.getItem('selectedStore')? 
        JSON.parse(localStorage.getItem('selectedStore')) 
        : 
        null;
    const handleSubmitStore = async () => {
        setLoading(true)
        const data = {
            origin_storeID : selectedStore.id,
            receiving_storeID: store,
            productID: productIDTransfer,
            quantity: parseInt(quantity),
        }
        if (productVariantIDTransfer) data.productVariantID = productVariantIDTransfer;
        const response = await createTransferToOtherStore(data);
        console.log(response)
        fetchProducts()
        handleClose()
    }; 

    const handleClose = () => {
        setQuantity(0);
        setLoading(false);
        setStore(null)
        setProductID(null)
        setProductVariantID(null)
        setOpenTransfer(false);
        
    }

    const fetchStoresOptions = async () => {
        const response = await getStoresFromTransfer(selectedStore.id);
        console.log(response)
        setStoreOptions(response.data.map(option => ({
            value: option.id,
            label: `${option.name} - ${option.city}`
        })))
    }

    useEffect(() => {
        fetchStoresOptions();
    }, [])

    return (
        <>
            <Modal
                title='Transferir de una tienda a otra'
                open={openTransfer}
                onCancel={handleClose}
                onOk={handleSubmitStore}
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
                    <Select value={store} onChange={setStore}>
                        <Option value={null}>Escoge una tienda...</Option>
                        {
                            storeOptions.map(option => (
                                <Option value={option.value}>{option.label}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item label='cantidad'>
                    <Input  value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                </Form.Item>
                </Form>

                
            </Modal>
        </>
    )
};

export default TransferProducts;