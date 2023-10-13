import { useState, useEffect } from "react";
import { getStores, addProductToStore } from "../../api/store";
import { Form, Input, Select, Button, Spin } from 'antd';

const AddProductToStore = ({ product, setIsModalAddToStore, form }) => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [storeId, setStoreId] = useState('');
    const [quantity, setQuantity] = useState('');
    

    useEffect(() => {
        fetchStores()
    }, [])
    
    const fetchStores = async () => {
        const response = await getStores(1, 20);
        console.log(response)
        localStorage.setItem('storeOptions', JSON.stringify(response.data) )
        setStores(response.data)
    }

    const handleChangeStore = (value) => {
        setStoreId(value);
    }

    const handleChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const handleSubmit = async (e) => {
        setLoading(true); 
       
        try {
            const body = {
                storeID: storeId,
                productID: product.productID,
                quantity: quantity
            };
            console.log("producto agregado a la tienda: ",body)
            await addProductToStore(body);
           
        } catch (error) {
            console.error(error);
          
        }
        
        setStoreId('');
        setQuantity('');
        setLoading(false);
        form.resetFields();
        setIsModalAddToStore(false)
    }
   
  return (
   <>
    
    <div style={{paddingLeft:"1rem"}}>
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginBottom:"1rem" }}>
            <span style={{fontSize:"16px"}}>Nombre del producto:</span>
            <h1 style={{fontSize:"16px", marginTop:"10px", marginLeft:"10px"}} > {product.name}</h1>
        </div>
      
        <Form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit} form={form}>
          <Form.Item
              label="Tienda"
              name="store"
              rules={[{ required: true, message: 'Por favor selecciona una tienda' }]}
          >
              <Select name="store" value={storeId} onChange={handleChangeStore}>
                  {stores.map((store, index) => (
                      <Select.Option key={index} value={store.id}>
                          {store.name}
                      </Select.Option>
                  ))}
              </Select>
          </Form.Item>
      
          <Form.Item
            label="Cantidad"
            name="quantity"
            rules={[{ required: true, message: 'Por favor ingresa una cantidad del producto' }]}
          >
            <Input name="quantity" value={quantity} onChange={handleChangeQuantity} />
          </Form.Item>

          <Button type="primary" htmlType="submit" onClick={handleSubmit} disabled={loading}>
            {loading ? <Spin /> : 'Agregar producto'}
          </Button>
        </Form> 
    </div>
    </>
  );
};

export default AddProductToStore;

