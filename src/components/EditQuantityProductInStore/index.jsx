import React, {useState, useEffect} from "react";
import { EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Input, Modal } from "antd";
import { editProductQuantityInStore } from "../../api/store";
export const EditQuantityProductInStore = ({productInStoreID ,quantity = 0, fetchProducts = () => {}}) => {
    const [productqty, setProductqty] = useState(quantity);
    const [edit, setEdit] = useState(false)
    const { confirm } = Modal

    const updateProductInStore = async () => {
        const response = await editProductQuantityInStore({id: productInStoreID, quantity: parseInt(productqty)})
        console.log(response)
        fetchProducts()
    }
    const handleEdit = () => {
        if (!edit) {
            setProductqty(quantity)
            setEdit(true)
        } else {
            confirm({
                title: 'Estas seguro editar la cantidad de este producto?',
                icon: <ExclamationCircleFilled />,
                okText: 'Si',
                okType: 'danger',
                cancelText: 'No',
                onOk() {
                 updateProductInStore()
                 setEdit(false)
                },
                onCancel() {
                 setEdit(false)
                },
              })
              
        }
    }
    useEffect(() => {
        setProductqty(quantity)
    }, [quantity])
    return (
        <>
            <div style={{display: 'flex', gap:'0.75rem'}}>
                {
                    !edit?
                    <span>{quantity}</span>
                    :
                    <Input value={productqty} onChange={(e) => setProductqty(e.target.value)} />
                }
                 <EditOutlined onClick={() => handleEdit()} style={{cursor: 'pointer'}} />
            </div>
        </>
            
    )
}

export default EditQuantityProductInStore;